
import { useGetUserByTokenQuery } from "@/store/api/userApi";
import NavItem from "./navitem/NavItem";
import { employeeSidebarItems, sidebarItem, sidebarItems } from "./sidebarItems";
import { useEffect, useState } from "react";
 
export default function InnerSidebarItems(){
      const { data } = useGetUserByTokenQuery(undefined);
      const [modifiedSidebarItems , setModifiedSidebarItems] = useState<any[]>([]);

      useEffect(() => {
        if(data){
            if(data?.data?.role === "admin"){
               setModifiedSidebarItems(sidebarItems)
            }else{
                setModifiedSidebarItems(employeeSidebarItems)
            }
         }
      },[data]);

    return (
        <>
            {
               modifiedSidebarItems && modifiedSidebarItems.map((sidebarItem: sidebarItem) => {
                   return (
                      <div key={sidebarItem.id}>
                       <h6 className="text-xs tracking-wider text-muted uppercase font-medium mb-2 mt-4">{sidebarItem.block}</h6>
                       {
                        sidebarItem.children && sidebarItem.children.map((item) => {
                            return (
                                <NavItem key={item.id} icon={item.icon} title={item.title} url={item.url} />
                            )
                        })
                       }
                      </div>
                
                   )
                })
            }
        </>
    )
}