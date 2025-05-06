import { Outlet } from "react-router";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

export default function FullLayout(){
    return (
        <>
        <Header/>
         <Sidebar/>
         <div className="page-container lg:ms-[250px] ms-0">
          <div className="container">
          <Outlet/>
          </div>
         </div>
        </>
    )
}