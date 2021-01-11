import { User } from "../model/User";
import { buildApiUrl, fetchTimeOut } from "./util";

export function postAddMony(moneyAmount: string) {
  return fetchTimeOut(buildApiUrl(`/user/addMoney/${moneyAmount}`), {
    method: "POST",
  }).then((res) => res.json()) as Promise<User>;
}
