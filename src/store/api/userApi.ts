import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://sync-lab-backend-a9ik.onrender.com' , credentials: 'include'}),
    tagTypes: ['User'],
    endpoints: (builder) => ({
       getUserByToken: builder.query({
        query: () => '/token/get-user',
        providesTags: ['User'],
       }),
       logoutUser: builder.query({
        query: () => '/logout'
       }),
       registerUser: builder.mutation({
        query: ({fullname , email , password}) => ({
            url: '/register',
            method: 'POST',
            body: {fullname,email,password}
        }),
        invalidatesTags: ['User'],
       }),
       loginUser: builder.mutation({
         query: ({email,password}) => ({
          url: "/login",
          method: "POST",
          body: {email,password}
         }),
         invalidatesTags: ['User'],
       })
    })
})

export const {useGetUserByTokenQuery , useLazyLogoutUserQuery , useRegisterUserMutation,useLoginUserMutation} = userApi