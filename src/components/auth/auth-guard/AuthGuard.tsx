import BasicLoader from "@/components/shared/loader/BasicLoader";
import { useGetUserByTokenQuery } from "@/store/api/userApi";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { data, isLoading , error } = useGetUserByTokenQuery(undefined);

  console.log(data,"dekha");

  useEffect(() => {
     if(data){
        if(data?.data?.fullname !== "admin"){
          alert("Unauthorised Acces to the dashboard !");
          navigate("/auth/login");
        }
     }else{
      if(error){
        navigate("/auth/login")
      }
     }
  }, [error,data]);

  return <>{!isLoading ? children : <BasicLoader />}</>;
}
