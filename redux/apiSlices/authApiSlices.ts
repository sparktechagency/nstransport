import { api } from "../api/baseApi";
import { IUsers } from "../interface/interface";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    userList: builder.query<IUsers, any>({
      query: ({ page, limit = 100 }) => ({
        url: `/admin/user?per_page=${limit}&page=${page}`,
      }),
      providesTags: ["user"],
    }),

    addUser: builder.mutation<any, any>({
      query: (data) => ({
        url: `/admin/user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/admin/user/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useAddUserMutation,
  useDeleteUserMutation,
  useLazyUserListQuery,
  useLoginMutation,
  useUpdateUserMutation,
  useUserListQuery,
} = authSlice;
