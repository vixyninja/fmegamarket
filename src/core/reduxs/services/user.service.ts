import { apiService } from "./api.service";
import { EndpointEnum } from "./endpoint";

export const userService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query({
      query: () => EndpointEnum.ME,
    }),
  }),
  overrideExisting: true,
});
