import { ICategories, IStatistics } from "../interface/interface";

import { api } from "../api/baseApi";

const homeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getStatistic: builder.query<IStatistics, any>({
      query: () => ({
        url: `statistic`,
      }),
      providesTags: ["home", "vehicle"],
    }),
    getSearchVehicle: builder.query<any, any>({
      query: ({ type, search, filter, category }) => ({
        url: `/search_by_type?type=${type}&search=${search}&filter=${filter}&category=${category}`,
      }),
      providesTags: ["vehicle"],
    }),
    getCategories: builder.query<ICategories, any>({
      query: () => ({
        url: `/category`,
      }),
      providesTags: ["category"],
    }),
    // updateAdditional: builder.mutation({
    //     query: data => ({
    //         url: `/additional`,
    //         method: 'POST',
    //         body: data,
    //     }),
    //     invalidatesTags: ['additional'],
    // }),
    booking: builder.mutation<any, { message: string }>({
      query: (data) => ({
        url: `booking`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["vehicle"],
    }),
    addVehicle: builder.mutation<any, { message: string }>({
      query: (data) => ({
        url: `vehicle`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["vehicle"],
    }),
    // deleteAdditional: builder.mutation({
    //     query: id => ({
    //         url: `/additional/${id}`,
    //         method: 'DELETE',
    //     }),
    //     invalidatesTags: ['additional'],
    // }),
  }),
});

export const {
  useAddVehicleMutation,
  useBookingMutation,
  useGetCategoriesQuery,
  useGetSearchVehicleQuery,
  useGetStatisticQuery,
  useLazyGetCategoriesQuery,
  useLazyGetSearchVehicleQuery,
  useLazyGetStatisticQuery,
} = homeSlice;
