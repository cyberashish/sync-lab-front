import { Card } from "@/components/ui/card";
import authBg from "@/assets/images/authentication/password_bg.png";
import ChangePassword from "./ChangePassword";

export default function ProfileSetting(){
    return (
        <>
          <Card className="max-w-lg pt-0 mx-auto gap-0"  >
             <div className="w-full flex flex-col items-center justify-center">
               <div className="lg:w-4/12">
               <img src={authBg} alt="authnetication" />
               </div>
             </div>
             <ChangePassword/>
          </Card>
        </>
    )
}