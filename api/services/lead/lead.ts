import { apiCRM } from "@/api";
import { InputLeadInterface, Params } from "@/types";
import { InputLeadToSpkInterface } from "@/types/spk";
import { generateSearchParams } from "@/utils";

async function PutExistingLead(id: string, body: InputLeadInterface) {
  const url = `/lead/${id}`;
  const response = await apiCRM.put(url, body);
  return response.result;
}

async function PostNewLead(body: InputLeadInterface) {
  const url = `/lead`;
  const response = await apiCRM.post(url, body);
  return response.result;
}

async function PostNewSpk(body: InputLeadToSpkInterface) {
  const url = `/spk`;
  const response = await apiCRM.post(url, body);
  return response.result;
}

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
  PostNewLead,
  PostNewSpk,
  PutExistingLead,
  // getUserDetail,
  // PostNewUser,
  // PutExistingUser,
};
