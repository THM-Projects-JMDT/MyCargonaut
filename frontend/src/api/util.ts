// inspired by https://github.com/SWTP-SS20-Kammer-2/Data-Analytics/blob/master/src/frontend/src/util/fetchUtils.ts

import { FetchError } from "../util/FetchError";

export function fetchTimeOut(url: RequestInfo, parms?: RequestInit) {
  const abort = new AbortController();
  parms = { ...parms, signal: abort.signal };

  const timer = setTimeout(() => abort.abort(), 5000);

  return fetch(url, parms)
    .finally(() => clearTimeout(timer))
    .then((res) => {
      if (!res.ok) throw new FetchError(res);
      return res;
    });
}

export function buildApiUrl(url: string) {
  return `/api/v1${url}`;
}
