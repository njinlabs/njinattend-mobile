import client from "../../client";
import { AttendanceType } from "../../models/attendance";

export default function attendanceToday(): Promise<Partial<AttendanceType>> {
  return client.get("/api/attendance/today").then((response) => response.data);
}
