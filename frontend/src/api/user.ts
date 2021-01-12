import { User } from "../model/User";
import { buildApiUrl, fetchTimeOut } from "./util";

export function postAddMoney(moneyAmount: string) {
  return fetchTimeOut(buildApiUrl(`/user/addMoney/${moneyAmount}`), {
    method: "POST",
  }).then((res) => res.json()) as Promise<User>;
}

export function updateUser(user: {
  firstName: string;
  lastName: string;
  email: string;
}) {
  return fetchTimeOut(buildApiUrl(`/user`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json()) as Promise<User>;
}

export function uploadAvatar(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return fetchTimeOut(buildApiUrl(`/user/profile/upload`), {
    method: "POST",
    body: formData,
  });
}
