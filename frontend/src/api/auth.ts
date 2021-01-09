import { buildApiUrl, fetchTimeOut } from "./util";

export function fetchLogin(username: string, password: string) {
  return fetchTimeOut(buildApiUrl("/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
}

export function fetchLogout() {
  return fetchTimeOut(buildApiUrl("/auth/logout"), { method: "POST" });
}
