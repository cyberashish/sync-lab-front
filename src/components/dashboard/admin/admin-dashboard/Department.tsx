import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Department({employess,icon,department , bgColor , color}:{employess:number , icon:string , department:string , bgColor:string , color:string}) {
  return (
    <>
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-dark">{department}</h3>
              <span className={`size-12 rounded-full ${bgColor} ${color} flex items-center justify-center`}>
                    <Icon icon={icon} width={28} height={28} className="shrink-0" />
                </span>
            </div>
            <div className="flex flex-col items-start mt-2">
                    <h6 className="text-2xl text-dark dark:text-white font-semibold">{employess}</h6>
                    <p className="text-[13px] text-muted font-medium">Active employess</p>
                </div>
          </CardContent>
        </Card>
    </>
  );
}
