import { UserType } from "./user";

export type AttendanceType = {
  id: number;
  user_id: number;
  user?: Partial<UserType>;
  period: string;
  in_record?: string | null;
  out_record?: string | null;
};
