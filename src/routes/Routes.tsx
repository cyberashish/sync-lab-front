import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import Loadable from "../utils/Loadable";
import BlankLayout from "../components/layouts/blank-layout/BlankLayout";

// Layouts
const FullLayout = Loadable(lazy(() => import("../components/layouts/full-layout/FullLayout")))

// Admin 
const AdminDashboard = Loadable(lazy(() => import("../views/dashboard/admin/admin-dashboard/AdminDashboard")));
const AddEmployee = Loadable(lazy(() => import("../views/dashboard/admin/add-employee/AddEmployee")));
const AllEmployees = Loadable(lazy(() => import("../views/dashboard/admin/all-employees/AllEmployees")));
const CreatePost = Loadable(lazy(() => import("../views/dashboard/admin/create-post/CreatePost")));
const MyProfile = Loadable(lazy(() => import("../views/dashboard/admin/profile/MyProfile")));
const RequestStatus = Loadable(lazy(() => import("../views/dashboard/admin/request-approval/ApprovalStatus")));
const Settings = Loadable(lazy(() => import("../views/dashboard/admin/setting/Setting")));

// Authentication
const Login = Loadable(lazy(() => import("../views/auth/login/AuthLogin")));
const Signup = Loadable(lazy(() => import("../views/auth/signup/AuthSignup")));


export const router = createBrowserRouter([
    {
      path:"/",
      element: <FullLayout/>,
      
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
        }
      ]
    }
])