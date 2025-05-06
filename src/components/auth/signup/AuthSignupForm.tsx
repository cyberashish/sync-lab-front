import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {useFormik} from "formik";
import { Icon } from "@iconify/react";
import { signupSchema } from "@/utils/schema";
import { Link } from "react-router";

export default function AuthSignupForm(){

    const initialValues = {
        fullname : "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const {values , errors , handleBlur , touched, handleChange , handleSubmit} = useFormik({
        initialValues,
        validationSchema:signupSchema,
        onSubmit: (values) => {
           console.log(values);
        }
    });

    console.log(errors);
    console.log(touched.fullname)

    return (
      <>
        <div className="flex flex-col gap-2 items-start">
            <h3 className="text-xl leading-none font-semibold text-dark">Get started absolutely free</h3>
            <p className="text-sm text-muted font-medium">Already have an account? <Link to="/auth/login" className="font-semibold text-primary hover:text-primary/90">Get started</Link></p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4" >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullname" className="text-dark font-medium text-sm" >Fullname</Label>
          <div>
          <Input value={values.fullname} onBlur={handleBlur} onChange={handleChange} type="text" id="fullname" name="fullname" placeholder="Fullname" className={`${errors.fullname && touched.fullname ? 'border-red-500 focus:border-red-500' : null}`} />
          <p className={`text-sm mt-0.5 text-red-500 font-normal ${errors.fullname && touched.fullname ? 'text-sm text-red-500 font-medium mt-1' :'hidden'}`}>{errors.fullname}</p>
          </div>
        </div>
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
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirm_password" className="text-dark font-medium text-sm" >Confirm Password</Label>
          <div>
          <Input value={values.confirmPassword} onBlur={handleBlur} className={`${errors.confirmPassword && touched.confirmPassword ? 'border-red-500 focus:border-red-500' : null}`} onChange={handleChange} type="password" id="confirm_password" name="confirmPassword" placeholder="Confirm Password" />
          <p className={`text-sm mt-0.5 text-red-500 font-normal ${errors.confirmPassword && touched.confirmPassword ? 'text-sm text-red-500 font-medium mt-1' :'hidden'}`}>{errors.confirmPassword}</p>
          </div>
        </div>
        <div className="w-full">
            <Button type="submit" className="w-full mt-3" >Sign Up</Button>
        </div>
         <div className="relative my-3 mb-2">
         <hr className="border-border" />
          <span className="p-2 text-sm font-semibold rounded-full text-muted absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background">Or</span>
         </div>
         <div className="flex items-center gap-2 w-fit mx-auto">
            <span className="size-11 flex justify-center items-center rounded-full hover:bg-gray-200 cursor-pointer">
                <Icon icon="flat-color-icons:google" className="shrink-0" width={28} height={28} />
            </span>
            <span className="size-11 flex justify-center items-center rounded-full hover:bg-gray-200 cursor-pointer">
                <Icon icon="skill-icons:instagram" className="shrink-0" width={28} height={28} />
            </span>
            <span className="size-11 flex justify-center items-center rounded-full hover:bg-gray-200 cursor-pointer">
                <Icon icon="logos:facebook" className="shrink-0" width={28} height={28} />
            </span>
          </div>
        </form>
      </>
    );
}