import { UserInterface } from "../login";

export interface ResponseUserInterface {
  message: string;
  statusCode: number;
  data: {
    data: UserInterface[];
    meta: PaginationAdminInterface;
  };
}

export interface ResponseUserSalesInterface {
  message: string;
  statusCode: number;
  data: UserInterface[];
}

export interface ResponseUserDetailInterface {
  message: string;
  statusCode: number;
  data: UserInterface;
}

export interface PaginationAdminInterface {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface InputUserInterface {
  name: string;
  email: string;
  password: string;
  type: string;
}
