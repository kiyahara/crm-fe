import { UserInterface } from "../login";

export interface ResponseLeadInterface {
  message: string;
  statusCode: number;
  data: {
    data: LeadInterface[];
    meta: PaginationLeadInterface;
  };
}

export interface LeadInterface {
  id: string;
  companyName: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  leadSource: string;
  estimatedValue: string;
  status: string;
  idSales: string;
  isSpk: boolean;
  nameSales: string;
  notes: string;
}

export interface ResponseLeadDetailInterface {
  message: string;
  statusCode: number;
  data: UserInterface;
}

export interface PaginationLeadInterface {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface InputLeadInterface {
  companyName: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  leadSource: string;
  estimatedValue: number;
  status: string;
  idSales: string;
  nameSales: string;
  notes: string;
}
