import { CredentialSignIn, CredentialToken } from "@/core/models";
import { apiService } from "./api.service";
import { EndpointEnum } from "./endpoint";
import { HttpResponse } from "./type.services";

export const authService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    signInNormal: builder.mutation({
      query: (credential: CredentialSignIn) => ({
        url: EndpointEnum.SIGN_IN,
        method: "POST",
        body: credential,
      }),
      transformResponse: (response: HttpResponse<CredentialToken>) =>
        response.data,
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
      //   async onQueryStarted(
      //     arg,
      //     { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry },
      //   ) {},
      //   async onCacheEntryAdded(
      //     arg,
      //     {
      //       dispatch,
      //       getState,
      //       extra,
      //       requestId,
      //       cacheEntryRemoved,
      //       cacheDataLoaded,
      //       getCacheEntry,
      //     },
      //   ) {},
    }),
  }),
});

export const { useSignInNormalMutation } = authService;
