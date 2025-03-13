import { api } from "../api/baseApi";
import { IVehicles } from "../interface/interface";

const searchSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    searchVehicle: builder.query<IVehicles, any>({
      query: ({ page, search, limit }) => ({
        url: `search?search=${search}`,
      }),
      providesTags: ["vehicle"],
    }),
  }),
});

export const { useLazySearchVehicleQuery, useSearchVehicleQuery } = searchSlice;
