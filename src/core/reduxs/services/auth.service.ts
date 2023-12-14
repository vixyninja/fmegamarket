import { HttpResponse } from "@/common";
import {
  ISignInGoogleCredential,
  ISignInNormalCredential,
  ISignUpNormalCredential,
  IUserResponse,
} from "@/core/models";
import { apiService } from "./api.service";
import { EndpointEnum } from "./endpoint";

export const authService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    signInNormal: builder.mutation<
      HttpResponse<IUserResponse>,
      ISignInNormalCredential
    >({
      query: (credential: ISignInNormalCredential) => ({
        url: EndpointEnum.SIGN_IN,
        method: "POST",
        body: credential,
      }),
      transformResponse: (response: HttpResponse<IUserResponse>) => response,
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
    }),
    signInGoogle: builder.mutation<
      HttpResponse<IUserResponse>,
      ISignInGoogleCredential
    >({
      query: (credential: ISignInGoogleCredential) => ({
        url: EndpointEnum.SIGN_IN_GOOGLE,
        method: "POST",
        body: credential,
      }),
      transformResponse: (response: HttpResponse<IUserResponse>) => response,
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
    }),
    signUpNormal: builder.mutation<
      HttpResponse<Omit<IUserResponse, "user">>,
      ISignUpNormalCredential
    >({
      query: (credential: ISignUpNormalCredential) => ({
        url: EndpointEnum.SIGN_UP,
        method: "POST",
        body: credential,
      }),
      transformResponse: (
        response: HttpResponse<Omit<IUserResponse, "user">>,
      ) => response,
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
    }),
  }),
});

export const {
  useSignInNormalMutation,
  useSignInGoogleMutation,
  useSignUpNormalMutation,
} = authService;
