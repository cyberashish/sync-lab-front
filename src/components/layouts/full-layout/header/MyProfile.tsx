import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import user from "@/assets/images/users/employee_2.jpg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useGetUserByTokenQuery, useLazyLogoutUserQuery } from "@/store/api/userApi";
import { useEffect, useState } from "react";

export default function MyProfile() {
  const [trigger] = useLazyLogoutUserQuery();
  const [authenticatedUser , setAuthenticatedUser] = useState<any>();
  const {data} = useGetUserByTokenQuery(undefined);

  async function handleLogout(){
    await trigger(undefined); // Optional: can await for data
    window.location.href="https://synclabems.netlify.app/"
  }
  useEffect(() => {
    if(data.data){
      setAuthenticatedUser(data.data)
    }
  },[data])
  return (
    <>
      <DropdownMenu  >
        <DropdownMenuTrigger asChild className="focus-visible:border-0 focus-visible:outline-0 focus:ring-0" >
        <button className="cursor-pointer" >
          {
            authenticatedUser?.img ? <img src={authenticatedUser.img} alt="user" width={36} height={36} className="rounded-full" /> :
            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex justify-center items-center">
             <span className="shrink-0">
             {
              authenticatedUser?.fullname.split("")[0]?.toLocaleUpperCase()
             }
             </span>
            </div>
          }
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white dark:bg-black border-border min-w-[200px] px-4" >
          <DropdownMenuLabel className="text-base dark:!text-white" >My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 hover:text-white dark:text-white cursor-pointer focus-visible:border-0 focus-visible:outline-0" asChild  >
            <Link to="/my-profile" >
            <Icon icon="solar:user-circle-broken" width={28} height={28} className="shrink-0 size-5.5 dark:!text-white" />
            <p className="text-[15px] font-medium dark:!text-white">My Profile</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 hover:text-white dark:text-white cursor-pointer focus-visible:border-0 focus-visible:outline-0 mt-1" asChild  >
            <Link to="/request-status" >
            <Icon icon="solar:file-text-linear" width={28} height={28} className="shrink-0 size-5.5 dark:text-white" />
            <p className="text-[15px] font-medium dark:text-white">Status</p>
            </Link>
          </DropdownMenuItem>
          <div className=" mt-2">
          <Button onClick={handleLogout} className="w-full my-3 !h-[38px]" >
           Log Out!
          </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
