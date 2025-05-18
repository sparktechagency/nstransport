import { BookedList, IStatistics, IVehicles } from "../interface/interface";

import { api } from "../api/baseApi";

const homeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getStatistic: builder.query<IStatistics, any>({
      query: () => ({
        url: `/statistic`,
      }),
      providesTags: ["home", "vehicle"],
    }),
    getSearchVehicle: builder.query<
      IVehicles,
      {
        type?: "total" | "booked" | "available";
        search?: string;
        filter?: string;
        category?: "Sprinter" | "Car Transporter" | "Trailer";
      }
    >({
      query: ({ type = "total", search = "", filter = "", category = "" }) => ({
        url: `/search_by_type?type=${type}&search=${search}&filter=${filter}&category=${category}`,
      }),
      providesTags: ["vehicle"],
    }),
    getBookedList: builder.query<BookedList, any>({
      query: ({ id, boooking_date }) => {
        if (boooking_date) {
          return {
            url: `/vehicle-booking-list/${id}?booking_date=${boooking_date}`,
          };
        } else {
          return {
            url: `/vehicle-booking-list/${id}`,
          };
        }
      },
      providesTags: ["vehicle"],
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
    updateBooking: builder.mutation<any, any>({
      query: ({ data, id }) => ({
        url: `/booking-update/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["vehicle"],
    }),

    cancelBooked: builder.mutation({
      query: (id) => ({
        url: `/booking-cancle/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vehicle"],
    }),
  }),
});

export const {
  useBookingMutation,
  useGetBookedListQuery,
  useGetSearchVehicleQuery,
  useGetStatisticQuery,
  useCancelBookedMutation,
  useLazyGetSearchVehicleQuery,
  useLazyGetStatisticQuery,
  useUpdateBookingMutation,
} = homeSlice;
