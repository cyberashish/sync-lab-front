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
import { Icon } from "@iconify/react/dist/iconify.js";

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
   const [loading , setLoading] = useState(false);
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

    function handleGoogleLogin(){
      setLoading(true);
      // window.open(`https://sync-lab-backend-cwqc.onrender.com/auth/google` , '_self')
      window.open(`https://sync-lab-express-backend.vercel.app/user/auth/google` , '_self')
      // window.open(`http://localhost:8080/auth/google` , '_self')
    }

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
        <div className="w-full">
            <Button type="submit" disabled={isLoading} className="w-full mt-3 cursor-pointer">
              {isLoading ?  <Loader2 className="animate-spin" /> : null}
              Sign In
              </Button>
        </div>
    
         <div className="relative my-6">
         <hr className="border-border" />
          <span className="p-2 rounded-full text-muted absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background">signup or login with</span>
         </div>
         <div className="flex items-center gap-2 w-fit mx-auto">
         <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex items-center gap-3 bg-white hover:text-white shadow-md px-6 py-3 rounded-full transition-all duration-200 text-gray-800 font-medium text-base w-full cursor-pointer border border-primary hover:bg-primary"
      >
        {loading && <Loader2 className="animate-spin h-5 w-5" />}
        <Icon icon="flat-color-icons:google" className="shrink-0" width={24} height={24} />
        <span>{loading ? "Redirecting..." : "Sign in with Google"}</span>
      </button>
          </div>
          <div className="flex gap-2 text-base text-gray-700 dark:text-white font-medium mt-3 items-center justify-center"><p>New to Wrappixel?</p><Link className="text-primary text-sm font-medium" to="/auth/signup">Create an account</Link></div>
        </form>
      </>
    );
}