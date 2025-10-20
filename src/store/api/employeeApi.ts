import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://sync-lab-backend-cwqc.onrender.com' , credentials: 'include'}),
   //  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080' , credentials: 'include'}),
    tagTypes:["employees" , "requests" , "adminNotifications" , "employeeNotifications" , "overtime"],
    endpoints: (builder) => ({
       getEmployeeProfile: builder.query({
         query: ({id}) => ({
            url: `employee/profile/${id}`,
            method:"GET"
         })
       }),
      allEmployees: builder.query({
         query: () => ({
            url:"/employee/all",
            method: "GET"
         }),
         providesTags:["employees"]
      }),
      allAdminNotifications: builder.query({
         query: () => ({
            url:"/employee/all-notifications/admin",
            method: "GET"
         }),
         providesTags:["adminNotifications"]
      }),
      allEmployeeNotifications: builder.query({
         query: (email) => ({
            url:`/employee/all-notifications?email=${encodeURIComponent(email)}`,
            method: "GET"
         }),
         providesTags:["employeeNotifications"]
      }),
      addEmployee: builder.mutation({
         query: ({...data}) => ({
           url: "/employee/add-employee",
           method: "POST",
           body: {...data}
         }),
         invalidatesTags:["employees"]
      }),
      addLeaveRequest: builder.mutation({
         query: ({...data}) => {
            return ({
               url: "/employee/add-request",
               method: "POST",
               body: {...data}
             })
         },
         invalidatesTags:["employees"]
      }),
      addAdminNotification: builder.mutation({
         query: ({...data}) => {
            return ({
               url: "/employee/add-notification/admin",
               method: "POST",
               body: {...data}
             })
         },
         invalidatesTags:["adminNotifications"]
      }),
      addEmployeeNotification: builder.mutation({
         query: ({...data}) => {
            return ({
               url: "/employee/add-notification",
               method: "POST",
               body: {...data}
             })
         },
         invalidatesTags:["employeeNotifications"]
      }),
      getEmployee: builder.mutation({
         query: ({email}) => ({
           url: "/employee/get-employee",
           method: "POST",
           body: {email}
         }),
         invalidatesTags:["employees"]
      }),
      getEmployeeRequests: builder.mutation({
         query: ({email}) => ({
           url: "/employee/get-employee/requests",
           method: "POST",
           body: {email}
         }),
         invalidatesTags:["employees"]
      }),
      editEmployee: builder.mutation({
         query: ({...data}) => ({
            url:"/employee/edit-employee",
            method: "PUT",
            body:{...data}
         }),
         invalidatesTags:["employees"]
      }),
      updateEmployeeLeave: builder.mutation({
         query: ({...data}) => ({
            url:"/employee/update-employee-leave",
            method: "PUT",
            body:{...data}
         }),
         invalidatesTags:["employees"]
      }),
      updateEmployeeOvertime: builder.mutation({
         query: ({...data}) => ({
            url:"/employee/update-employee-overtime",
            method: "PUT",
            body:{...data}
         }),
         invalidatesTags:["employees","overtime"]
      }),
      updateAdminNotification: builder.mutation({
         query: ({...data}) => ({
            url:"/employee/update-notification/admin",
            method: "PUT",
            body:{...data}
         }),
         invalidatesTags:["adminNotifications"]
      }),
      updateEmployeeNotification: builder.mutation({
         query: ({...data}) => ({
            url:"/employee/update-notification",
            method: "PUT",
            body:{...data}
         }),
         invalidatesTags:["employeeNotifications"]
      }),
      deleteEmployee : builder.mutation({
         query: ({id}) => ({
            url: `/employee/delete-employee/${id}`,
            method: "DELETE"
         }),
         invalidatesTags:["employees"]
      }),
      getAllEmployeesRequest: builder.query({
         query: () => ({
            url:"/employee/all-requests",
            method: "GET"
         }),
         providesTags: ["requests"]
      }),
      updateEmployeeRequest: builder.mutation({
         query: ({...data}) => {
            return ({
               url: "/employee/update-request",
               method: "PUT",
               body:{...data}
            })
         },
         invalidatesTags:["requests"]
      }),
      updateEmployeeOvertimeRequest: builder.mutation({
         query: ({...data}) => {
            return ({
               url: "/employee/update-overtime-request",
               method: "PUT",
               body:{...data}
            })
         },
         invalidatesTags:["overtime"]
      }),
      getAllEmployeesOvertimeRequest: builder.query({
         query: () => ({
            url:"/employee/all-overtime-requests",
            method: "GET"
         }),
         providesTags: ["overtime"]
      }),
      addOvertimeRequest: builder.mutation({
         query: ({...data}) => {
            return ({
               url: "/employee/add-overtime-request",
               method: "POST",
               body: {...data}
             })
         },
         invalidatesTags:["overtime"]
      }),
      getEmployeeOvertimeRequests: builder.mutation({
         query: ({email}) => ({
           url: "/employee/get-employee/overtime-requests",
           method: "POST",
           body: {email}
         }),
         invalidatesTags:["employees"]
      }),
    })
})

export const {useGetEmployeeProfileQuery , useAllEmployeesQuery , useAddEmployeeMutation , useEditEmployeeMutation , useDeleteEmployeeMutation , useGetAllEmployeesRequestQuery , useUpdateEmployeeRequestMutation , useGetEmployeeMutation , useAddLeaveRequestMutation , useUpdateEmployeeLeaveMutation , useGetEmployeeRequestsMutation , useAddAdminNotificationMutation , useUpdateAdminNotificationMutation , useAllAdminNotificationsQuery , useAddEmployeeNotificationMutation , useUpdateEmployeeNotificationMutation , useLazyAllEmployeeNotificationsQuery, useGetAllEmployeesOvertimeRequestQuery , useAddOvertimeRequestMutation , useUpdateEmployeeOvertimeRequestMutation , useGetEmployeeOvertimeRequestsMutation , useUpdateEmployeeOvertimeMutation } = employeeApi