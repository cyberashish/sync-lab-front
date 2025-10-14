import loginBg from "@/assets/images/authentication/authLoginBg.svg";
import AuthResetPasswordForm from "@/components/auth/reset-password/AuthResetPasswordForm";


export default function AuthResetPassword(){
    return ( 
       <div className="w-full h-screen flex lg:flex-nowrap lg:bg-transparent bg-white flex-wrap px-6">
         <div className="lg:w-7/12 bg-background w-full lg:flex hidden justify-center items-center">
           <div className="lg:w-6/12 w-full">
           <img src={loginBg} alt="logo" />
           </div>
         </div>
          <div className="lg:w-5/12 flex bg-white justify-center w-full items-center">
             <div className="lg:w-8/12 w-full">
                <AuthResetPasswordForm/>
             </div>
          </div>
       </div>
    )
}