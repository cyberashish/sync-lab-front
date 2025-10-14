import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {useFormik} from "formik";
import { Link, useNavigate } from "react-router";
import { useLoginUserMutation } from "@/store/api/userApi";
import { useAppDispatch } from "@/hooks/hooks";
import { setAuth, setAuthenticatedUser } from "@/store/slices/userModeSlice";
import { Loader2 } from "lucide-react";
import { LoginSchema } from "@/utils/schema/loginSchema";
import { useState } from "react";

export default function AuthLoginForm(){

  const adminInitialValue = {
    email: "admin@gmail.com",
    password: "admin123",
};
  const employeeInitialValue = {
    email: "cyberashish321@gmail.com",
    password: "Cyber789",
};

   const navigate = useNavigate();
   const [login,{isLoading , error}] = useLoginUserMutation();
   const dispatch = useAppDispatch();
   const [currentInitialValue , setCurrentInitialValue] = useState(adminInitialValue)


    // const initialValues = currentInitialValue

    const {values , errors , handleBlur , touched, handleChange , handleSubmit , resetForm} = useFormik({
        initialValues:currentInitialValue,
        validationSchema:LoginSchema,
        onSubmit: async (values) => {
           const result = await login({email:values.email , password:values.password});
           const user = result.data.data;
           if(user){
            dispatch(setAuth(true));
            dispatch(setAuthenticatedUser({name: user.fullname , email:user.email , img:user.image}));
            navigate("/");
           }
           resetForm();
        },
        enableReinitialize: true,
    });

    // function handleGoogleLogin(){
    //   window.open(`http://localhost:8080/auth/google` , '_self')
    // }

    return (
      <>
        <div className="flex flex-col gap-2 items-start">
            <h3 className="text-xl leading-none font-semibold text-dark">Sign in to your account</h3>
            <p className="text-sm text-muted font-medium">Get started with our admin dashboard? <span onClick={() => setCurrentInitialValue(adminInitialValue)} className="cursor-pointer font-semibold text-primary hover:text-primary/90">SignIn as Admin</span> Or <span onClick={() => setCurrentInitialValue(employeeInitialValue)} className="cursor-pointer font-semibold text-primary hover:text-primary/90">SignIn as Employee</span></p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4" >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-dark font-medium text-sm" >Email</Label>
          <div>
          <Input value={values.email} onBlur={handleBlur} onChange={handleChange} type="email" id="email" name="email" placeholder="Email" className={`${errors.email && touched.email ? 'border-red-500 focus:border-red-500' : null}`} />
          <p className={`text-sm mt-0.5 text-red-500 font-normal ${errors.email && touched.email ? 'text-sm text-red-500 font-medium mt-1' :'hidden'}`}>{errors.email}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password" className="text-dark font-medium text-sm" >Password</Label>
          <div>
          <Input value={values.password} onBlur={handleBlur} onChange={handleChange} type="password" className={`${errors.password && touched.password ? 'border-red-500 focus:border-red-500' : null}`} name="password" id="password" placeholder="Password" />
          <p className={`text-sm mt-0.5 text-red-500 font-normal ${errors.password && touched.password ? 'text-sm text-red-500 font-medium mt-1' :'hidden'}`}>{errors.password}</p>
          </div>
        </div>
        <div className={`w-fit py-1 px-3 mx-auto rounded-full bg-red-100 ${error ? 'block' :'hidden'}`}>
            {error && 'data' in error && <p className="text-sm text-red-500 font-medium" >{(error.data as { message?: string }).message || 'Login failed'}</p>}
        </div>
        <Link to="/auth/forgot-password" className="text-sm font-medium text-primary hover:text-primary/80" >Forogt Password?</Link>
        <div className="w-full">
            <Button type="submit" disabled={isLoading} className="w-full mt-3 cursor-pointer">
              {isLoading ?  <Loader2 className="animate-spin" /> : null}
              Sign In
              </Button>
        </div>
        <div className="flex gap-2 text-base text-gray-700 dark:text-white font-medium mt-3 items-center justify-center"><p>New to Wrappixel?</p><Link className="text-primary text-sm font-medium" to="/auth/signup">Create an account</Link></div>
         {/* <div className="relative my-3 mb-2">
         <hr className="border-border" />
          <span className="p-2 rounded-full text-muted absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background">Or</span>
         </div>
         <div className="flex items-center gap-2 w-fit mx-auto">
            <span onClick={handleGoogleLogin} className="size-11 flex justify-center items-center rounded-full hover:bg-gray-200 cursor-pointer">
                <Icon icon="flat-color-icons:google" className="shrink-0" width={28} height={28} />
            </span>
            <span className="size-11 flex justify-center items-center rounded-full hover:bg-gray-200 cursor-pointer">
                <Icon icon="skill-icons:instagram" className="shrink-0" width={28} height={28} />
            </span>
            <span className="size-11 flex justify-center items-center rounded-full hover:bg-gray-200 cursor-pointer">
                <Icon icon="logos:facebook" className="shrink-0" width={28} height={28} />
            </span>
          </div> */}
        </form>
      </>
    );
}