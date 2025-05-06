import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useLocation } from "react-router";

export default function NavItem({icon , title , url}:{icon:string , title:string , url:string}){
    const location = useLocation();
    const pathname = location.pathname;
    return (
        <Link to={url} className={`py-2.5 px-3.5 rounded-md text-dark  flex items-center gap-2 mb-0.5 text-base font-medium relative before:absolute before:start-0 before:h-[calc(100%_-_18px)] hover:bg-lightprimary hover:text-primary hover:before:bg-primary before:-translate-y-1/2 before:top-1/2 before:w-0.5  before:rounded-full ${pathname === url ? 'text-primary  bg-lightprimary before:bg-primary' : 'before:bg-transparent dark:text-muted'} `}>
        <Icon icon={icon} width={24} height={24} className="shrink-0" />
         <span className="leading-none top-[1px] relative block shrink-0">{title}</span>
        </Link>
    )
}