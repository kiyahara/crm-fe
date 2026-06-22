import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";

const baseURLGA = process.env.NEXT_PUBLIC_BACKEND_URL_DEV;

export const APIGAAxiosInstance: AxiosInstance = axios.create({
  baseURL: baseURLGA,
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

const createApi = (axiosInstance: AxiosInstance) => {
  return {
    get: async <T = unknown>(
      url: string,
      params?: Record<string, unknown>,
      arrayFormat?: ArrayFormat,
      config: AxiosRequestConfig = {}
    ): Promise<ApiResponse<T>> => {
      const response: AxiosResponse<T> = await axiosInstance.get(url, {
        ...config,
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
      const response: AxiosResponse<T> = await axiosInstance.post(
        url,
        data,
        config
      );

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
      const response: AxiosResponse<T> = await axiosInstance.put(
        url,
        data,
        config
      );

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
      const response: AxiosResponse<T> = await axiosInstance.delete(url, {
        ...config,
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
      const response: AxiosResponse<T> = await axiosInstance.delete(url, {
        ...config,
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

export const apiGA = createApi(APIGAAxiosInstance);
