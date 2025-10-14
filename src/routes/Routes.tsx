import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import Loadable from "../utils/Loadable";
import BlankLayout from "../components/layouts/blank-layout/BlankLayout";
import AuthGuard from "@/components/auth/auth-guard/AuthGuard";
import AuthResetPassword from "@/views/auth/reset-password/ResetPassword";



// Layouts
const FullLayout = Loadable(lazy(() => import("../components/layouts/full-layout/FullLayout")))

// Admin 
const AdminDashboard = Loadable(lazy(() => import("../views/dashboard/admin/admin-dashboard/AdminDashboard")));
const EmployeeDashboard = Loadable(lazy(() => import("../views/dashboard/employee/employee-dashboard/EmployeeDashboard")));
const AddEmployee = Loadable(lazy(() => import("../views/dashboard/admin/add-employee/AddEmployee")));
const AllEmployees = Loadable(lazy(() => import("../views/dashboard/admin/all-employees/AllEmployees")));
const CreatePost = Loadable(lazy(() => import("../views/dashboard/admin/create-post/CreatePost")));
const MyProfile = Loadable(lazy(() => import("../views/dashboard/admin/profile/MyProfile")));
const RequestStatus = Loadable(lazy(() => import("../views/dashboard/admin/request-approval/ApprovalStatus")));
const EmployeeRequestStatus = Loadable(lazy(() => import("../views/dashboard/employee/request-status/RequestStatus")));
const Settings = Loadable(lazy(() => import("../views/dashboard/admin/setting/Setting"))); 
const Leaves = Loadable(lazy(() => import("../views/dashboard/employee/leave/Leaves"))); 
const AuthForgotPassword = Loadable(lazy(() => import("../views/auth/forgot-password/ForgotPassword"))); 

// Authentication
const Login = Loadable(lazy(() => import("../views/auth/login/AuthLogin")));
const Signup = Loadable(lazy(() => import("../views/auth/signup/AuthSignup")));


export const router = createBrowserRouter([
    {
      path:"/",
      element: <AuthGuard><FullLayout/></AuthGuard>,
      
      children: [
        {
         index: true,
         element: <Navigate to="/dashboard" replace />
        },
        {
          path:"/dashboard",
          element: <AdminDashboard/>
        },
        {
          path:"/employee-dashboard",
          element: <EmployeeDashboard/>
        },
        {
          path:"/add-employee",
          element: <AddEmployee/>
        },
        {
          path: "/all-employees",
          element: <AllEmployees/>
        },
        {
          path: "/create-post",
          element: <CreatePost/>
        },
        {
          path: "/my-profile",
          element: <MyProfile/>
        },
        {
          path: "/request-status",
          element: <RequestStatus/>
        },
        {
          path: "/request-status/employee",
          element: <EmployeeRequestStatus/>
        },
        {
          path: "/request-leave",
          element: <Leaves/>
        },
        {
          path: "/settings",
          element: <Settings/>
        },
      ]
    },
    {
      path: "/",
      element: <BlankLayout/>,
      children:[
        {
          path: "/auth/login",
          element: <Login/>
        },
        {
          path:"/auth/signup",
          element: <Signup/>
        },
        {
          path:"/auth/forgot-password",
          element: <AuthForgotPassword/>
        },
        {
          path:"/auth/reset-password/:token",
          element: <AuthResetPassword/>
        },
      ]
    }
])