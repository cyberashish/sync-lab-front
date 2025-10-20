import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAllAdminNotificationsQuery, useLazyAllEmployeeNotificationsQuery, useUpdateAdminNotificationMutation,  useUpdateEmployeeNotificationMutation } from "@/store/api/employeeApi";
import { useGetUserByTokenQuery } from "@/store/api/userApi";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

function getColorByAlphabet(letter:string) {
  const colors = [
    "bg-primary/10 text-primary",
    "bg-secondary/10 text-secondary",
    "bg-warning/10 text-warning",
    "bg-success/10 text-success",
    "bg-orange-500/10 text-orange-500",
    "bg-blue-500/10 text-blue-500"
  ];

  const index = (letter.toUpperCase().charCodeAt(0) - 65) % colors.length;

  const color = colors[index];
  return color;
}

export default function Notification() {

  const {data:adminNotifications} = useAllAdminNotificationsQuery(undefined);
  const [allEmployeeNotification] = useLazyAllEmployeeNotificationsQuery();
  const [updateNotification] = useUpdateAdminNotificationMutation();
  const [updateEmployeeNotification] = useUpdateEmployeeNotificationMutation();
  const {data:user} = useGetUserByTokenQuery(undefined);
  const [allNotifications , setAllNotifications] = useState<any[]>([]);

  const navigate = useNavigate();

  async function handleNotification(notificationId:string , notificationType:string){
      try{
        if(user.data.role === "admin"){
          await updateNotification({notificationId});
          if(notificationType === "LEAVE_REQUEST"){
            navigate("/request-status");
          }else{
            navigate("/overtime-status");
          }
        }else{
          await updateEmployeeNotification({notificationId});
          handleEmployeeNotification(user.data.email);
          if(notificationType === "LEAVE_REQUEST"){
            navigate("/request-status/employee");
          }else{
            navigate("/request-overtime-status/employee");
          }
          
        }
        
      }catch(error){
        console.log("Failed to update notification" , error)
      }
  }

  async function handleEmployeeNotification(email:string){
    try{
      const employeeNotification = await allEmployeeNotification(email);
      if(employeeNotification.data.data.length > 0){
        const notifications = employeeNotification.data.data.filter((item:any) => item.isRead === false);
        setAllNotifications(notifications);
     }
    }catch(error){
      console.log("Failed to get employee notification" , error)
    }
  }

  useEffect(() => {
     if(user){
       if(user.data.role === "admin"){
          if(adminNotifications?.data?.length > 0){
             const notifications = adminNotifications.data.filter((item:any) => item.isRead === false);
             setAllNotifications(notifications);
          }
       }else{
         handleEmployeeNotification(user.data.email)
     }
     } 
  },[user , adminNotifications])
  
  if(allNotifications?.length > 0){
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 cursor-pointer rounded-full focus-visible:ring-0 focus-visible:outline-0 notification-btn bg-subtlebg group hover:bg-primary/20 dark:hover:bg-primary/10 dark:hover:text-primary relative dark:text-white hover:text-primary">
              <Icon icon="solar:bell-linear" width={24} height={24} />
              <span className="size-3.5 text-[10px] font-medium text-white bg-secondary absolute rounded-full -top-0">
                 {allNotifications.length}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={4}
            className="w-90 border-border shadow-lg p-0 z-[999]"
          >
            <DropdownMenuLabel className="text-lg p-3 font-medium flex items-center justify-between">
              Notifications
              <Badge className="text-white" >5 New</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {
              allNotifications.map((item:any) => (
                <DropdownMenuItem onClick={() => handleNotification(item.id , item.type)} key={item.id} className="px-4 py-2 cursor-pointer hover:!bg-gray-100 flex items-start justify-between gap-4 hover group/item" >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`size-9 rounded-full shrink-0 flex items-center justify-center ${user.data.role === "admin" ? getColorByAlphabet(item.message.split(" ")[0].split("")[0].toUpperCase()) : item.type === "LEAVE_REQUEST" ?'bg-primary/10 text-primary' : 'bg-success/10 text-success'}`}>
                    {user.data.role === "admin" ? item.message.split(" ")[0].split("")[0].toUpperCase() : item.type === "LEAVE_REQUEST" ? <Icon icon="tdesign:undertake-delivery" width={20} height={20} /> : <Icon icon="lsicon:overtime-outline" width={20} height={20} />}
                  </span>
                   <div className="flex flex-col gap-0 min-w-0">
                    <h6 className="text-base text-dark leading-tight max-w-48 truncate group-hover/item:text-primary">{item.title}</h6>
                    <p className="text-sm text-muted leading-none truncate max-w-60">{item.message}</p>
                   </div>
                </div>
                <span className="text-xs text-lightgray whitespace-nowrap">{new Date(item.createdAt).toLocaleTimeString('en-US' ,{
                  hour: 'numeric' ,
                  minute: '2-digit',
                  hour12: true
                })}</span>
              </DropdownMenuItem>
              ))
            }
            <DropdownMenuSeparator />
             <Link to={user ? user.data.role === "admin" ? '/request-status' : '/request-status/employee' :'/request-status'} className="p-4 pt-2 block">
             <Button className="w-full cursor-pointer" >See all requests!</Button>
             </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
}
