import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://sync-lab-backend-cwqc.onrender.com' , credentials: 'include'}),
    // baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080' , credentials: 'include'}),
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
       }),
       updateUserPassword: builder.mutation({
         query: ({email,password}) => ({
          url: "/user/update-password",
          method: "PUT",
          body:{email,password}
         }),
         invalidatesTags: ['User']
       }),
       getUserByEmail: builder.mutation({
        query: ({email}) => ({
            url: '/get-user/email',
            method: 'POST',
            body: {email}
        }),
        invalidatesTags: ['User'],
       }),
    })
})

export const {useGetUserByTokenQuery , useLazyLogoutUserQuery , useRegisterUserMutation,useLoginUserMutation , useUpdateUserPasswordMutation , useGetUserByEmailMutation} = userApi