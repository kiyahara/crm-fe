import { apiGA } from "@/api";
import { Params } from "@/types";
import { generateSearchParams } from "@/utils";

async function Login(Param: Params) {
  const url = "/auth/login?" + generateSearchParams(Param);
  const response = await apiGA.get(url);
  return response.result;
}

export const GaService = {
  Login,
};
