import client from "../../client";
import { UserType } from "../../models/user";

export default function checkToken(token: string): Promise<Partial<UserType>> {
  return client
    .get("/api/auth/check-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
}
