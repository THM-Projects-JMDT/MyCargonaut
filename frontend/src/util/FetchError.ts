export class FetchError extends Error {
  public res: Response;

  constructor(res: Response) {
    super(`Request Faild with status code ${res.status}`);

    this.res = res;

    Object.setPrototypeOf(this, FetchError.prototype);
  }
}
