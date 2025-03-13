import { api } from "../api/baseApi";

const mangeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query<any, any>({
      query: ({ page, limit }) => ({
        url: `vehicle?per_page=${page}&limit=${limit}`,
      }),
      providesTags: ["vehicle"],
    }),

    getCategories: builder.query<any, any>({
      query: () => ({
        url: `/category`,
      }),
      providesTags: ["category"],
    }),

    editVehicle: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `vehicle/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["vehicle"],
    }),
    addVehicle: builder.mutation<any, { data: any }>({
      query: (data) => ({
        url: `vehicle`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["vehicle"],
    }),
    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: `/vehicle/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vehicle"],
    }),
  }),
});

export const {
  useAddVehicleMutation,
  useEditVehicleMutation,
  useGetCategoriesQuery,
  useGetVehiclesQuery,
  useLazyGetCategoriesQuery,
  useLazyGetVehiclesQuery,
  useDeleteVehicleMutation,
} = mangeSlice;
