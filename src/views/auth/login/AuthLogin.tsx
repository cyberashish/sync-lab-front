import loginBg from "@/assets/images/authentication/authLoginBg.svg";
import AuthLoginForm from "@/components/auth/login/AuthLoginForm";

export default function AuthLogin(){
    return ( 
       <div className="w-full h-screen flex px-6">
         <div className="lg:w-7/12 bg-background w-full flex justify-center items-center">
           <div className="lg:w-6/12 w-full">
           <img src={loginBg} alt="logo" />
           </div>
         </div>
          <div className="lg:w-5/12 flex bg-white justify-center w-full items-center">
             <div className="lg:w-8/12 w-full">
             <AuthLoginForm/>
             </div>
          </div>
       </div>
    )
}