import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://sync-lab-backend-a9ik.onrender.com' , credentials: 'include'}),
    tagTypes:["employees" , "requests"],
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
      addEmployee: builder.mutation({
         query: ({...data}) => ({
           url: "/employee/add-employee",
           method: "POST",
           body: {...data}
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
            console.log(data,"moist");
            return ({
               url: "/employee/update-request",
               method: "PUT",
               body:{...data}
            })
         },
         invalidatesTags:["requests"]
      })
    })
})

export const {useGetEmployeeProfileQuery , useAllEmployeesQuery , useAddEmployeeMutation , useEditEmployeeMutation , useDeleteEmployeeMutation , useGetAllEmployeesRequestQuery , useUpdateEmployeeRequestMutation} = employeeApi