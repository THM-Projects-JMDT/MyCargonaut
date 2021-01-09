import { buildApiUrl, fetchTimeOut } from "./util";

export function fetchLogin(username: string, password: string) {
  return fetchTimeOut(buildApiUrl("/auth/login"), {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function fetchLogout() {
  return fetchTimeOut(buildApiUrl("/auth/logout"), { method: "POST" });
}