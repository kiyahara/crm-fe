import { apiCRM } from "@/api";
async function Login(email: string, password: string) {
  const body = {
    email: email,
    password: password,
  };
  const url = "/auth/login";
  const response = await apiCRM.post(url, body);
  return response.result;
}

async function RefreshToken(refreshToken: string) {
  const body = {
    refreshToken: refreshToken,
  };
  const url = "/auth/refresh";
  const response = await apiCRM.post(url, body);
  return response.result;
}

export const LoginService = {
  Login,
  RefreshToken,
};
