import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetUserByTokenQuery, useUpdateUserPasswordMutation } from "@/store/api/userApi";
import { ChangePassWordSchmea } from "@/utils/schema/changePasswordSchema";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";

export default function ChangePassword() {

    const initialValues = {
        newPassword: "",
        confirmNewPassword: ""
    }

    const {data:User} = useGetUserByTokenQuery(undefined);
    const [updatePassword,{isLoading}] = useUpdateUserPasswordMutation();
    
    async function handlePassword(email:string,password:string){
      try{
       const updatedUser =  await updatePassword({email , password});
       if(updatedUser.error){
         alert("Failed to update password!")
       }else{
         alert("Password updated successfully!")
       }
        
      }catch(error){
        console.log("Failed to update password" , error)
      }
    }

    const {values , handleChange , handleSubmit , handleBlur , errors , touched} = useFormik({
        initialValues,
        validationSchema: ChangePassWordSchmea,
        onSubmit: (values) => {
           if(User?.data?.email){
            
              handlePassword(User?.data?.email , values.confirmNewPassword)
           }
        }
    })
  return (
    <>
     <h1 className="text-lg text-center mb-5 font-semibold" >Change Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2" >
        {/* Enter New Password */}
        <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
          <Label
            htmlFor="newPassword"
            className="text-dark font-medium text-sm"
          >
            New Password
          </Label>
          <div>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="✱✱✱✱✱✱✱✱"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`placeholder:text-muted/40 placeholder:text-sm !text-xl ${errors.newPassword && touched.newPassword ? 'focus:border-red-500 border-red-500' : null}`}
            />
          </div>
          {
            errors.newPassword && touched.newPassword ? <p className="text-sm font-medium text-red-500" >{errors.newPassword}</p> : null
          }
        </div>
        {/* Confirm New Password */}
        <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
          <Label
            htmlFor="confirm_new_password"
            className="text-dark font-medium text-sm"
          >
            Confirm Password
          </Label>
          <div>
            <Input
              type="password"
              id="confirm_new_password"
              name="confirmNewPassword"
              value={values.confirmNewPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="✱✱✱✱✱✱✱✱"
              className={`placeholder:text-muted/40 placeholder:text-sm !text-xl ${errors.confirmNewPassword && touched.confirmNewPassword ? 'focus:border-red-500 border-red-500' : null}`}
            />
          </div>
          {
            errors.confirmNewPassword && touched.confirmNewPassword ? <p className="text-sm font-medium text-red-500" >{errors.confirmNewPassword}</p> : null
          }
        </div>
        <div className="col-span-12 mt-4">
              <div className="w-full flex justify-center ">
              <Button disabled={isLoading} className="lg:w-2/12 w-full px-4" type="submit" > {isLoading && <Loader2 className="animate-spin" />} Submit</Button>
              </div>
            </div>
      </form>
    </>
  );
}
