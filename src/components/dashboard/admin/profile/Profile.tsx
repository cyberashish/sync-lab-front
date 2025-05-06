import { Card } from "@/components/ui/card";
import user from "@/assets/images/users/employee_2.jpg";
export default function Profile(){
    return (
        <Card className="max-w-md mx-auto" >
          <div className="flex items-center flex-col gap-3.5">
             <div className="w-36 h-36 rounded-full outline-3 outline-primary outline-offset-3">
             <img src={user} alt="profile_image"  className="rounded-full w-full" />
             </div>
             <div className="flex flex-col gap-0.5 items-center">
               <h3 className="text-lg font-semibold text-dark leading-none">Jane Smith</h3>
               <p className="text-sm font-medium text-muted leading-none">cyberjane@gmail.com</p>
             </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-12 col-span-12 rounded-xl">
                <h2 className="font-semibold mb-1 text-lg text-primary" >Professional Info</h2>
                 <div className="flex flex-col gap-1.5">
                 <div className="flex items-center gap-2">
                <h5 className="text-base font-semibold">Designation:</h5>
                <p className="text-sm font-medium text-muted">Frontend Developer</p>
              </div>
              <div className="flex items-center gap-2">
                <h5 className="text-base font-semibold">Joining Date:</h5>
                <p className="text-sm font-medium text-muted">20/9/2021</p>
              </div>
              <div className="flex items-center gap-2">
                <h5 className="text-base font-semibold">Department:</h5>
                <p className="text-sm font-medium text-muted">Engineering</p>
              </div>
                 </div>
            </div>
            <div className="lg:col-span-12 col-span-12 rounded-xl">
                <h2 className="font-semibold mb-1 text-lg text-primary" >Personal Info</h2>
                 <div className="flex flex-col gap-1.5">
                 <div className="flex items-center gap-2">
                <h5 className="text-base font-semibold">Gender:</h5>
                <p className="text-sm font-medium text-muted">Male</p>
              </div>
              <div className="flex items-center gap-2">
                <h5 className="text-base font-semibold">DOB:</h5>
                <p className="text-sm font-medium text-muted">20/9/2000</p>
              </div>
              <div className="flex items-center gap-2">
                <h5 className="text-base font-semibold whitespace-nowrap">Permanent Address:</h5>
                <p className="text-sm font-medium text-muted">Hitech City , Hyderabad , Telangana</p>
              </div>
                 </div>
            </div>
          </div>
        </Card>
    )
}