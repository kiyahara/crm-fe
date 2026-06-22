import { refreshToken } from "@/utils";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";

const baseURLCRM = process.env.NEXT_PUBLIC_BACKEND_URL_DEV;

export const APICRMAxiosInstance: AxiosInstance = axios.create({
  baseURL: baseURLCRM,
  timeout: 2000 * 60,
});

/** array format query-string */
type ArrayFormat =
  | "comma"
  | "bracket"
  | "index"
  | "separator"
  | "bracket-separator"
  | "colon-list-separator"
  | "none";

type ApiResponse<T> = {
  result: T;
  status: number;
  statusText: string;
  headers: unknown;
};

const createAuthorizationHeaders = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

const createApi = (axiosInstance: AxiosInstance) => {
  return {
    get: async <T = unknown>(
      url: string,
      params?: Record<string, unknown>,
      arrayFormat?: ArrayFormat,
      config: AxiosRequestConfig = {}
    ): Promise<ApiResponse<T>> => {
      const accessToken = localStorage.getItem("token");
      const headers = createAuthorizationHeaders(accessToken ?? "");

      const response: AxiosResponse<T> = await axiosInstance.get(url, {
        ...config,
        headers,
        params,
        paramsSerializer: {
          serialize: (params) =>
            queryString.stringify(params, {
              arrayFormat: arrayFormat ?? "comma",
              encode: false,
            }),
        },
      });

      return {
        result: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    },

    post: async <T = unknown>(
      url: string,
      data?: unknown,
      config: AxiosRequestConfig = {}
    ): Promise<ApiResponse<T>> => {
      const accessToken = localStorage.getItem("token");
      const headers = createAuthorizationHeaders(accessToken ?? "");

      const response: AxiosResponse<T> = await axiosInstance.post(url, data, {
        ...config,
        headers,
      });

      return {
        result: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    },

    put: async <T = unknown>(
      url: string,
      data?: unknown,
      config: AxiosRequestConfig = {}
    ): Promise<ApiResponse<T>> => {
      const accessToken = localStorage.getItem("token");
      const headers = createAuthorizationHeaders(accessToken ?? "");

      const response: AxiosResponse<T> = await axiosInstance.put(url, data, {
        ...config,
        headers,
      });

      return {
        result: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    },

    delete: async <T = unknown>(
      url: string,
      params?: Record<string, unknown>,
      config: AxiosRequestConfig = {}
    ): Promise<ApiResponse<T>> => {
      const accessToken = localStorage.getItem("token");
      const headers = createAuthorizationHeaders(accessToken ?? "");

      const response: AxiosResponse<T> = await axiosInstance.delete(url, {
        ...config,
        headers,
        params,
      });

      return {
        result: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    },

    deleteById: async <T = unknown>(
      url: string,
      id: string,
      config: AxiosRequestConfig = {}
    ): Promise<ApiResponse<T>> => {
      const accessToken = localStorage.getItem("token");
      const headers = createAuthorizationHeaders(accessToken ?? "");

      const response: AxiosResponse<T> = await axiosInstance.delete(url, {
        ...config,
        headers,
        data: id,
      });

      return {
        result: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    },
  };
};

export const apiCRM = createApi(APICRMAxiosInstance);

let isRefreshing = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: any[] = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

APICRMAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return APICRMAxiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshToken();

        if (!newAccessToken) {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userId");
          window.location.href = "/login";
          return Promise.reject(error);
        }

        localStorage.setItem("token", newAccessToken);

        APICRMAxiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return APICRMAxiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");

        window.location.href = "/login";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
