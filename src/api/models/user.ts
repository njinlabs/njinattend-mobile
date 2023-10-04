import { FileType } from "./file";

export type UserType = {
  id: number;
  registered_number: string;
  password?: string;
  fullname: string;
  gender: "male" | "female";
  birthday: string;
  role: string;
  avatar?: File | FileType;
  department: string;
  created_at: string;
  updated_at: string;
  token?: string;
  face?: boolean;
};
