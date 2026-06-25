import { apiCRM } from "@/api";
import { InputUserInterface, Params } from "@/types";
import { generateSearchParams } from "@/utils";

async function PutExistingUser(id: string, body: InputUserInterface) {
  const url = `/users/${id}`;
  const response = await apiCRM.put(url, body);
  return response.result;
}

async function PostNewUser(body: InputUserInterface) {
  const url = `/users`;
  const response = await apiCRM.post(url, body);
  return response.result;
}

async function getListUser(Param: Params) {
  const url = `/users?` + generateSearchParams(Param);
  const response = await apiCRM.get(url);
  return response.result;
}

async function getListUserType(type: string) {
  const url = `/users/userType?type=${type}`;
  const response = await apiCRM.get(url);
  return response.result;
}

async function getUserDetail(id: string) {
  const url = "/users/" + id;
  const response = await apiCRM.get(url);
  return response.result;
}

export const UserService = {
  getListUser,
  getListUserType,
  getUserDetail,
  PostNewUser,
  PutExistingUser,
};
