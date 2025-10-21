import BasicLoader from "@/components/shared/loader/BasicLoader";
import { useGetUserByTokenQuery } from "@/store/api/userApi";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { data, isLoading , error } = useGetUserByTokenQuery(undefined);

  useEffect(() => {
     if(data){
        if(data?.data?.role !== "admin"){
          navigate("/employee-dashboard");
        }
     }else{
      if(error){
        navigate("/auth/login")
      }
     }

  }, [error,data]);

  return <>{!isLoading ? children : <BasicLoader />}</>;
}
