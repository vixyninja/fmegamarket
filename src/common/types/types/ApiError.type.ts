import { API_ERROR_ENUM } from "../enums";

export type TError = (typeof API_ERROR_ENUM)[keyof typeof API_ERROR_ENUM];

export type TApiError<E> = {
  [Key in keyof E]: {
    code: number;
    message: string;
  };
};
