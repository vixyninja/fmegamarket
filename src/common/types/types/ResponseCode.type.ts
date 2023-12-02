import { API_ERROR_ENUM } from "../enums";

type APIErrorType = keyof typeof API_ERROR_ENUM;

export type ResponseStatusCodeType = APIErrorType | "SUCCESS";
