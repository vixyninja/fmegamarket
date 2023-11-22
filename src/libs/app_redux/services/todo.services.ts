import { apiService } from "./api.service";

export const todoService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getTodo: builder.query<any, any>({
      query: (body) => `/todos?page=${body.page}&limit=${body.limit}`,
      transformResponse: (response: any) => response,
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetTodoQuery } = todoService;
