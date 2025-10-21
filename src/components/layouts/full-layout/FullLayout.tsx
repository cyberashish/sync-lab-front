import { Outlet } from "react-router";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { useGetUserByTokenQuery } from "@/store/api/userApi";
import BasicLoader from "@/components/shared/loader/BasicLoader";
import { useAppDispatch } from "@/hooks/hooks";
import { setAuth, setAuthenticatedUser } from "@/store/slices/userModeSlice";
import { Toaster } from "@/components/ui/sonner";



export default function FullLayout(){
    const {data , isLoading} = useGetUserByTokenQuery("");
    // console.log(data?.data,"testing");
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();

    if(isLoading){
      return <BasicLoader/>
    }

    if( !data){
      dispatch(setAuth(false));
    }else{
      const userData = data.data;
      if(userData.image){
        dispatch(setAuthenticatedUser({name:userData.fullname , email: userData.email , img: userData.image}))
      }
      return (
        <>
        <Header/>
         <Sidebar/>
         <div className="page-container lg:ms-[250px] ms-0">
          <div className="container">
          <Outlet/>
          </div>
         </div>
         <Toaster />
        </>
    )
    }
}