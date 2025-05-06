import FullLogo from "@/components/shared/logo/FullLogo";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ChangeEvent, useEffect, useState } from "react";
import ThemeMode from "./ThemeMode";
import { MobileSidebar } from "../sidebar/MobileSidebar";
import MyProfile from "./MyProfile";

export default function Header(){
    const [searchInput , setSearchInput] = useState("");
    const [isSearchFocussed , setIsSearchFocussed] = useState(false);
    const [isFixedHeader , setIsFixedHeader] = useState(false);

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
       setSearchInput(e.target.value);
    }

    const handleSearchFocus = () => {
      setIsSearchFocussed(true);
    }
    const handleSearchBlur = () => {
      setIsSearchFocussed(false);
    }

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
          <div className="lg:me-22 me-0 order-1"><FullLogo/></div>
          <MobileSidebar/>
          <div className="flex lg:flex-1 justify-between items-center order-3">
          <div className={`  lg:flex hidden items-center border rounded-md px-3 flex-1 max-w-80 ${isSearchFocussed ? 'border-primary ' : 'border-border'}`}>
            <Icon icon="si:search-line" width={20} height={20} className="shrink-0 text-dark" />
          <Input onBlur={handleSearchBlur} onFocus={handleSearchFocus} value={searchInput} onChange={handleSearch} type="search" id="email" name="email" placeholder="Search..." className="max-w-80 h-9 bg-transparent dark:bg-transparent dark:text-white shadow-none border-none px-2"  />
          </div>
          <ul className="flex items-center gap-5">
            <ThemeMode/>
            <li className="lg:block hidden relative after:absolute group after:w-10 after:h-10 after:bg-primary/20 after:start-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:rounded-full after:opacity-0 hover:after:opacity-100 after:transition-all cursor-pointer after:z-10">
                <Icon icon="ion:mail-outline" width={24} height={24} className="text-dark relative z-20 group-hover:text-primary" />
            </li>
            <li className="lg:block hidden relative after:absolute group after:w-10 after:h-10 after:bg-primary/20 after:start-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:rounded-full after:opacity-0 hover:after:opacity-100 after:transition-all cursor-pointer after:z-10">
                <Icon icon="solar:bell-bing-linear" width={24} height={24} className="text-dark relative z-20 group-hover:text-primary" />
                <span className="w-2 h-2 rounded-full bg-red-500 absolute top-0 end-0.5 z-20"></span>
            </li>
             <li className="flex items-center gap-4" >
             <div className="sm:block hidden relative after:absolute group after:w-10 after:h-10 after:bg-primary/20 after:start-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:rounded-full after:opacity-0 hover:after:opacity-100 after:transition-all cursor-pointer after:z-10">
                <Icon icon="solar:settings-linear" width={24} height={24} className="text-dark relative z-20 group-hover:text-primary" />
            </div>
              <div className="h-6 border border-border"></div>
              <MyProfile/>
             </li>
          </ul>
          </div>
        </header>
    )
}