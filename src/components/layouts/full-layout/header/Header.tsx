import FullLogo from "@/components/shared/logo/FullLogo";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import ThemeMode from "./ThemeMode";
import { MobileSidebar } from "../sidebar/MobileSidebar";
import MyProfile from "./MyProfile";
import { Link} from "react-router";
import Notification from "./Notification";
import { useGetUserByTokenQuery } from "@/store/api/userApi";

export default function Header(){
    const [isFixedHeader , setIsFixedHeader] = useState(false);
    const {data} = useGetUserByTokenQuery(undefined);

    useEffect(() => {
      const handleScroll = () => {
        if(window.scrollY > 10){
           setIsFixedHeader(true);
        }else{
          setIsFixedHeader(false);
        }
      }
     window.addEventListener("scroll" , handleScroll);
     return () => window.removeEventListener("scroll" , handleScroll)
    },[])

    return (
        <header className={`p-4 flex items-center lg:justify-start justify-between border-b border-border bg-white dark:bg-black sticky top-0 z-50 ${isFixedHeader ? 'dark:shadow-3xl shadow-md' : 'shadow-none dark:shadow-none'}`} >
          <div className="lg:me-27 me-0 order-1"><FullLogo/></div>
          <MobileSidebar/>
          <div className="flex lg:flex-1 justify-between items-center order-3">
          <div className="lg:flex hidden flex-col items-start">
            <h6 className="text-lg font-semibold text-black dark:text-white">{data?.data?.role=="admin" ? "Admin" : "Employee"} Dashboard</h6>
             <div className="flex items-center gap-1">
              <Icon icon="proicons:home" width={18} height={18} className="!text-gray-800 dark:!text-white/80" />
              <div className="flex items-center gap-1">
              <Icon icon="heroicons:slash-16-solid" width={16} height={16} className="!text-gray-800 dark:!text-white/80" />
               <span className="text-sm font-medium !text-gray-800 dark:!text-white/80">Dashboard</span>
              </div>
              <div className="flex items-center gap-1">
              <Icon icon="heroicons:slash-16-solid" width={16} height={16} className="!text-gray-800 dark:!text-white/80" />
               <Link to={`${data?.data?.role !== "admin" ? '/employee-dashboard' : '/dashboard'}`} className="text-sm font-medium text-primary hover:text-primary/70">{data?.data?.role=="admin" ? "Admin" : "Employee"}</Link>
              </div>
             </div>
          </div>
          <ul className="flex items-center lg:gap-5 gap-2">
            <ThemeMode/>
            <Notification/>
             <li>
              <MyProfile/>
             </li>
          </ul>
          </div>
        </header>
    )
}