import client from "../../client";
import { UserType } from "../../models/user";

export default function signOut(): Promise<Partial<UserType>> {
  return client.delete("/api/auth/sign").then((response) => response.data);
}
