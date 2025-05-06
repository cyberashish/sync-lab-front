import { Card } from "@/components/ui/card";
import workBg from "@/assets/images/background/admin_work.png";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import {v4 as uuidv4} from "uuid";

export default function UserBanner(){
    const tasks = [
        {
          id: uuidv4(),
          title: "12 pending approvals",
          icon: "solar:card-search-linear",
        },
        {
          id: uuidv4(),
          title: "8 high-priority reviews",
          icon: "bi:lightning-charge",
        },
        {
          id: uuidv4(),
          title: "5 interviews scheduled",
          icon: "solar:calendar-broken",
        },
        {
          id: uuidv4(),
          title: "Yesterday: 38 reviewed, 5 rejected",
          icon: "solar:chart-2-broken",
        },
    ]
    return (
        <Card className="p-0" >
            <img src={workBg} alt="bg" className="w-full" />
             <div className="flex flex-col gap-5 p-6 pt-0">
                <div className="flex flex-col gap-0">
                   <h4 className="text-center text-base font-bold uppercase">NAMASTE RUDRA!</h4>
                   <h5 className="text-[15px] justify-center text-muted font-medium flex items-center gap-1">
                   Good Morning!
                   <Icon icon="solar:sun-bold-duotone" width={24} height={24} className="text-secondary" />
                   </h5>
                </div>
                <div className="flex flex-col gap-1.5">
                 {
                    tasks.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                    <Icon icon={item.icon} width={24} height={24} className="text-muted" />
                    <p className="text-sm text-dark/85 dark:text-white/85 font-medium">{item.title}</p>
                 </div>
                    ))
                 }
                </div>
                <Button>Review it</Button>
             </div>
        </Card>
    )
}