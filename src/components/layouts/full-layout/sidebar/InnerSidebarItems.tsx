
import NavItem from "./navitem/NavItem";
import { sidebarItem, sidebarItems } from "./sidebarItems";

export default function InnerSidebarItems(){
    return (
        <>
            {
                sidebarItems.map((sidebarItem: sidebarItem) => {
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