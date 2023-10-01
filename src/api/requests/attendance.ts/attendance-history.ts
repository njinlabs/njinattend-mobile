import client from "../../client";
import { IndexData } from "../../index-data";
import { AttendanceType } from "../../models/attendance";

type AttendanceHistoryParams = {
  page?: number;
};

export default function attendanceHistory({
  page = 1,
}: AttendanceHistoryParams): Promise<IndexData<AttendanceType>> {
  return client
    .get("/api/attendance/history")
    .then((response) => response.data);
}
