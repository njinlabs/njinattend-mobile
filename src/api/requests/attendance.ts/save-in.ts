import client from "../../client";
import { AttendanceType } from "../../models/attendance";
import { AttendanceParams } from "./attendance-params";

export default function saveIn({
  face,
  latitude,
  longitude,
}: AttendanceParams): Promise<Partial<AttendanceType>> {
  const formData = new FormData();
  formData.append("face", face);
  formData.append("latitude", `${latitude}`);
  formData.append("longitude", `${longitude}`);

  return client
    .put("/api/attendance/in", formData)
    .then((response) => response.data);
}
