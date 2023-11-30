import { CredentialSignIn, CredentialToken } from "@/core/models";
import { AlertAction, LoadingAction } from "../reducers";
import { apiService } from "./api.service";
import { EndpointEnum } from "./endpoint";
import { HttpResponse } from "./type.services";
import { t } from "i18next";

export const authService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    signInNormal: builder.mutation({
      query: (credential: CredentialSignIn) => ({
        url: EndpointEnum.SIGN_IN,
        method: "POST",
        body: credential,
      }),
      transformResponse: (response: HttpResponse<CredentialToken>) => response,
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry },
      ) {
        try {
          dispatch(LoadingAction.showLoading());

          if ((await queryFulfilled).data) {
            dispatch(LoadingAction.hideLoading());
            if ((await queryFulfilled).data.status === 200) {
            } else {
              // error when status code is not 200
              dispatch(
                AlertAction.showAlert({
                  message: (await queryFulfilled).data.message,
                  type: "error",
                  title: t("alert.sign_in_failed.title"),
                }),
              );
            }
          } else {
            dispatch(LoadingAction.hideLoading());
            // error soft code
          }
        } catch (e) {
          // error hard code
          dispatch(LoadingAction.hideLoading());
        }
      },
    }),
  }),
});

export const { useSignInNormalMutation } = authService;
