import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import user from "@/assets/images/users/employee_2.jpg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function MyProfile() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="focus-visible:border-0 focus-visible:outline-0 focus:ring-0" >
        <button className="cursor-pointer" ><img src={user} alt="user" width={36} height={36} className="rounded-full" /></button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border-border min-w-[200px]" >
          <DropdownMenuLabel className="text-base" >My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 hover:text-white cursor-pointer focus-visible:border-0 focus-visible:outline-0" asChild  >
            <Link to="/my-profile" >
            <Icon icon="solar:user-circle-broken" width={28} height={28} className="shrink-0 size-5.5" />
            <p className="text-[15px] font-medium">My Profile</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 hover:text-white cursor-pointer focus-visible:border-0 focus-visible:outline-0 mt-1" asChild  >
            <Link to="/request-status" >
            <Icon icon="solar:file-text-linear" width={28} height={28} className="shrink-0 size-5.5" />
            <p className="text-[15px] font-medium">Status</p>
            </Link>
          </DropdownMenuItem>
          <Button asChild className="w-full my-3" >
           <Link to="/auth/login" >
           Log Out!
           </Link>
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
