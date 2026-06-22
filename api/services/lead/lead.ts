import { apiCRM } from "@/api";
import { Params } from "@/types";
import { generateSearchParams } from "@/utils";

// async function PutExistingUser(id: string, body: InputUserInterface) {
//   const url = `/users/${id}`;
//   const response = await apiCRM.put(url, body);
//   return response.result;
// }

// async function PostNewUser(body: InputUserInterface) {
//   const url = `/users`;
//   const response = await apiCRM.post(url, body);
//   return response.result;
// }

async function getListLead(Param: Params) {
  const url = `/lead?` + generateSearchParams(Param);
  const response = await apiCRM.get(url);
  return response.result;
}

// async function getUserDetail(id: string) {
//   const url = "/users/" + id;
//   const response = await apiCRM.get(url);
//   return response.result;
// }

export const LeadService = {
  getListLead,
  // getUserDetail,
  // PostNewUser,
  // PutExistingUser,
};
