import { api } from "../api/baseApi";
import { IMVehicles } from "../interface/interface";

const mangeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query<IMVehicles, any>({
      query: ({ page, limit, search }) => ({
        url: `vehicle?page=${page}&limit=${limit}&search=${search}`,
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
        url: `vehicle/${id}`,
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
