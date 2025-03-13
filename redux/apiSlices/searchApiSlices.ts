import { api } from "../api/baseApi";

const searchSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    searchVehicle: builder.query<any, any>({
      query: ({ page = 10, search, limit }) => ({
        url: `search?per_page=${page}&search=${search}&limit=${limit}`,
      }),
      providesTags: ["vehicle"],
    }),
  }),
});

export const { useLazySearchVehicleQuery, useSearchVehicleQuery } = searchSlice;
