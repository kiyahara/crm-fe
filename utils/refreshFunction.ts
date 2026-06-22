import { LoginService } from "@/api/services";
import { ResponseLoginInterface } from "@/types/login/login";

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

export async function refreshToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return null;
  }

  // 🔥 prevent multiple refresh calls
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;

  refreshPromise = new Promise(async (resolve, reject) => {
    try {
      const response = await LoginService.RefreshToken(refreshToken);

      const dataResponse = response as ResponseLoginInterface;

      const newAccessToken = dataResponse?.data?.data?.accessToken;

      if (!newAccessToken) {
        throw new Error("No access token returned");
      }

      localStorage.setItem("token", newAccessToken);

      resolve(newAccessToken);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");

      reject(null);
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  });

  return refreshPromise;
}
