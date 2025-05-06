import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangePassWordSchmea } from "@/utils/schema/changePasswordSchema";
import { useFormik } from "formik";

export default function ChangePassword() {

    const initialValues = {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    }

    const {values , handleChange , handleSubmit , handleBlur , errors , touched} = useFormik({
        initialValues,
        validationSchema: ChangePassWordSchmea,
        onSubmit: (values) => {
           console.log(values);
        }
    })
  return (
    <>
     <h1 className="text-lg text-center mb-5 font-semibold" >Change Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2" >
        {/* Enter Old Password */}
        <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
          <Label
            htmlFor="oldPassword"
            className="text-dark font-medium text-sm"
          >
            Old Password
          </Label>
          <div>
            <Input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={values.oldPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`placeholder:text-muted/40 placeholder:text-sm !text-xl ${errors.oldPassword && touched.oldPassword ? 'focus:border-red-500 border-red-500' : null}`}
              placeholder="✱✱✱✱✱✱✱✱"
            />
          </div>
          {
            errors.oldPassword && touched.oldPassword ? <p className="text-sm font-medium text-red-500" >{errors.oldPassword}</p> : null
          }
        </div>
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
              <Button className="lg:w-2/12 w-full" type="submit" >Submit</Button>
              </div>
            </div>
      </form>
    </>
  );
}
