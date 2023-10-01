import client from "../../client";
import { UserType } from "../../models/user";

type SetPasswordParams = {
  oldPassword: string;
  newPassword: string;
};

export default function setPassword({
  oldPassword,
  newPassword,
}: SetPasswordParams): Promise<Partial<UserType>> {
  return client
    .put("/api/user/change-password", {
      old_password: oldPassword,
      new_password: newPassword,
    })
    .then((response) => response.data);
}
