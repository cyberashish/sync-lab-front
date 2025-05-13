import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {useFormik} from "formik";
// import { useNavigate } from "react-router";
import { useLoginUserMutation } from "@/store/api/userApi";
// import { useAppDispatch } from "@/hooks/hooks";
// import { setAuth, setAuthenticatedUser } from "@/store/slices/userModeSlice";
import { Loader2 } from "lucide-react";
import { LoginSchema } from "@/utils/schema/loginSchema";

export default function AuthLoginForm(){

  //  const navigate = useNavigate();
   const [login,{isLoading , error}] = useLoginUserMutation();
  //  const dispatch = useAppDispatch();

    const initialValues = {
        email: "admin@gmail.com",
        password: "admin123",
    }

    const {values , errors , handleBlur , touched, handleChange , handleSubmit } = useFormik({
        initialValues,
        validationSchema:LoginSchema,
        onSubmit: async (values) => {
           const result = await login({email:values.email , password:values.password});
          //  const user = result.data.data;
          console.log(result)
          //  if(user){
          //   dispatch(setAuth(true));
          //   dispatch(setAuthenticatedUser({name: user.fullname , email:user.email , img:user.image}));
          //   navigate("/");
          //  }
          //  resetForm();
        }
    });

    // function handleGoogleLogin(){
    //   window.open(`http://localhost:8080/auth/google` , '_self')
    // }

    return (
      <>
        <div className="flex flex-col gap-2 items-start">
            <h3 className="text-xl leading-none font-semibold text-dark">Sign in to your account</h3>
            {/* <p className="text-sm text-muted font-medium">Don't have an account? <Link to="/auth/signup" className="font-semibold text-primary hover:text-primary/90">Get started</Link></p> */}
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