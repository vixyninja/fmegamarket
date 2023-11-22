import { RootState } from "@hooks/useRedux";
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
import { systemConstant } from "@constants/system.constant";

const mutex = new Mutex();

const baseApiQuery = retry(
  fetchBaseQuery({
    baseUrl: systemConstant.BASE_URL,
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
        const refreshResult = await baseApiQuery(
          EndpointEnum.REFRESH_TOKEN,
          api,
          extraOptions,
        );
        if (refreshResult.data) {
          //   api.dispatch(
          //     AuthAction.setCredentials({
          //       ...(api.getState() as RootState).auth,
          //       ...refreshResult,
          //     }),
          //   );
          result = await baseApiQuery(args, api, extraOptions);
        } else {
          api.dispatch(
            AlertAction.setAlert({
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
          AlertAction.setAlert({
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
  } else if (result.error.status === 403) {
    // handle error
  } else if (result.error.status === 500) {
    // handle error
  }
  api.dispatch(LoadingAction.hideLoading());
  return result;
};

export const apiService = createApi({
  baseQuery: baseApiQueryWithMutex,
  endpoints: (_) => ({}),
  tagTypes: ["USER"],
  refetchOnReconnect: true,
  reducerPath: "apiService",
});
