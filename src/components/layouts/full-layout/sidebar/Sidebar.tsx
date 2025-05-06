
import InnerSidebarItems from "./InnerSidebarItems";

export default function Sidebar(){
    return (
        <aside className="h-screen bg-white dark:bg-black border-e border-border fixed -translate-x-[250px] lg:-translate-x-0  w-[250px] top-[70px] p-6 px-4 pt-0" >
            <InnerSidebarItems/>
        </aside>
    )
}