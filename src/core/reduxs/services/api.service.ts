import { RootState } from "@/common";
import { ENVIRONMENT_MANAGER } from "@/configuration";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { AlertAction, AuthAction, LoadingAction } from "../reducers";
import { EndpointEnum } from "./endpoint";

const mutex = new Mutex();

const baseApiQuery = retry(
  fetchBaseQuery({
    baseUrl: ENVIRONMENT_MANAGER.BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { endpoint, getState }) => {
      const token = (getState() as RootState).persisted.auth.accessToken;
      if (token && endpoint !== EndpointEnum.REFRESH_TOKEN) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    },
    paramsSerializer: (params) => JSON.stringify(params),
    timeout: 30000,
  }),
  {
    maxRetries: 3,
  },
);

const baseApiQueryWithMutex: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseApiQuery(args, api, extraOptions);

  if (!result.error) {
    api.dispatch(LoadingAction.hideLoading());
    return result;
  }

  if (result.error.status === 401) {
    api.dispatch(LoadingAction.showLoading());

    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        let endpointName = `EndpointEnum.REFRESH_TOKEN?token=${
          (api.getState() as RootState).persisted.auth.refreshToken
        }`;

        const refreshResult = await baseApiQuery(
          endpointName,
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const { refreshToken, accessToken } = refreshResult.data as any;

          api.dispatch(
            AuthAction.setCredentials({
              ...(api.getState() as RootState).persisted.auth,
              accessToken: accessToken,
              refreshToken: refreshToken,
            }),
          );

          result = await baseApiQuery(args, api, extraOptions);
        } else {
          api.dispatch(
            AlertAction.showAlert({
              type: "error",
              message: "Your session has expired. Please login again.",
              title: "Session Expired",
              isShow: true,
              callback: () => api.dispatch(AlertAction.disposeAlert()),
              cancel: () => api.dispatch(AlertAction.disposeAlert()),
            }),
          );

          api.dispatch(AuthAction.clearCredentials());
        }
      } catch (e) {
        api.dispatch(
          AlertAction.showAlert({
            type: "error",
            message: "Your session has expired. Please login again.",
            title: "Session Expired",
            isShow: true,
            callback: () => api.dispatch(AlertAction.disposeAlert()),
            cancel: () => api.dispatch(AlertAction.disposeAlert()),
          }),
        );

        api.dispatch(AuthAction.clearCredentials());
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseApiQuery(args, api, extraOptions);
    }
  }
  api.dispatch(LoadingAction.hideLoading());
  return result;
};

export const apiService = createApi({
  baseQuery: baseApiQueryWithMutex,
  endpoints: (_) => ({}),
  tagTypes: ["USER"],
  reducerPath: "apiService",
  serializeQueryArgs: (args) => {
    if (typeof args === "string") {
      return args;
    }
    const { endpointName, ...rest } = args;
    return JSON.stringify(rest);
  },
});
