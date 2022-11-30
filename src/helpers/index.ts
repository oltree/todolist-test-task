import { ITodos } from "../types";

export const fnParse = (string: string): ITodos => {
  return JSON.parse(string);
};

export const fnStringify = (array: ITodos): string => {
  return JSON.stringify(array);
};
