import client from "../../client";
import { UserType } from "../../models/user";

export default function signIn({
  registered_number,
  password,
}: Partial<UserType>): Promise<Partial<UserType>> {
  return client
    .get("/api/auth/sign", {
      params: {
        registered_number,
        password,
      },
    })
    .then((response) => response.data);
}
