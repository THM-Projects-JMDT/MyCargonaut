import { RefObject } from "react";

export const getRefValue = (ref: RefObject<HTMLInputElement>) =>
  ref.current?.value ?? "";
