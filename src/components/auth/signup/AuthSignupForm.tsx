import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/hooks";
import { useRegisterUserMutation } from "@/store/api/userApi";
import { setAuth, setAuthenticatedUser } from "@/store/slices/userModeSlice";
import { signupSchema } from "@/utils/schema";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function AuthSignupForm() {
  const [register, { isLoading, error }] = useRegisterUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const result = await register({
          fullname: values.fullname,
          email: values.email,
          password: values.password,
        });

        // Safely access returned user data
        const user = result?.data?.data;

        if (!result?.error && user) {
          dispatch(setAuth(true));
          dispatch(
            setAuthenticatedUser({
              name: user.fullname,
              email: user.email,
              img: user.image,
            })
          );
          navigate("/");
          resetForm();
        }
      } catch (err) {
        console.error("Signup error:", err);
      }
    },
  });

  const handleGoogleSignIn = () => {
    setLoading(true);
    // Redirect to your backend Google OAuth endpoint
    window.open(`https://sync-lab-backend-cwqc.onrender.com/auth/google`, "_self");
    // window.open(
    //   `https://sync-lab-express-backend.vercel.app/auth/google`,
    //   "_self"
    // );
    // window.open(`http://localhost:8080/auth/google`, "_self");
  };

  return (
    <>
      <div className="flex flex-col gap-2 items-start">
        <h3 className="text-xl leading-none font-semibold text-dark">
          Get started absolutely free
        </h3>
        <p className="text-sm text-muted font-medium">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-semibold text-primary hover:text-primary/90"
          >
            Get started
          </Link>
        </p>
      </div>

      {/* ✅ FIXED: Connected Formik's handleSubmit */}
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        {/* Fullname */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="fullname"
            className="text-dark font-medium text-sm"
          >
            Fullname
          </Label>
          <div>
            <Input
              value={values.fullname}
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Fullname"
              className={`${
                errors.fullname && touched.fullname
                  ? "border-red-500 focus:border-red-500"
                  : ""
              }`}
            />
            <p
              className={`text-sm mt-0.5 font-medium ${
                errors.fullname && touched.fullname
                  ? "text-red-500"
                  : "hidden"
              }`}
            >
              {errors.fullname}
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-dark font-medium text-sm">
            Email
          </Label>
          <div>
            <Input
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={`${
                errors.email && touched.email
                  ? "border-red-500 focus:border-red-500"
                  : ""
              }`}
            />
            <p
              className={`text-sm mt-0.5 font-medium ${
                errors.email && touched.email ? "text-red-500" : "hidden"
              }`}
            >
              {errors.email}
            </p>
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="password"
            className="text-dark font-medium text-sm"
          >
            Password
          </Label>
          <div>
            <Input
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className={`${
                errors.password && touched.password
                  ? "border-red-500 focus:border-red-500"
                  : ""
              }`}
            />
            <p
              className={`text-sm mt-0.5 font-medium ${
                errors.password && touched.password
                  ? "text-red-500"
                  : "hidden"
              }`}
            >
              {errors.password}
            </p>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="confirm_password"
            className="text-dark font-medium text-sm"
          >
            Confirm Password
          </Label>
          <div>
            <Input
              value={values.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              id="confirm_password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className={`${
                errors.confirmPassword && touched.confirmPassword
                  ? "border-red-500 focus:border-red-500"
                  : ""
              }`}
            />
            <p
              className={`text-sm mt-0.5 font-medium ${
                errors.confirmPassword && touched.confirmPassword
                  ? "text-red-500"
                  : "hidden"
              }`}
            >
              {errors.confirmPassword}
            </p>
          </div>
        </div>

        {/* API Error */}
        <div
          className={`w-fit py-1 px-3 mx-auto rounded-full bg-red-100 ${
            error ? "block" : "hidden"
          }`}
        >
          {error && "data" in error && (
            <p className="text-sm text-red-500 font-medium">
              {(error.data as { message?: string }).message || "Signup failed"}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full">
          <Button disabled={isLoading} type="submit" className="w-full mt-3">
            {isLoading ? <Loader2 className="animate-spin" /> : null}
            Sign Up
          </Button>
        </div>

        {/* Google Sign-In */}
        <div className="flex items-center gap-2 w-fit">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            type="button"
            className="flex items-center gap-3 bg-white hover:text-white shadow-md px-6 py-3 rounded-full transition-all duration-200 text-gray-800 font-medium text-base w-full cursor-pointer border border-primary hover:bg-primary"
          >
            {loading && <Loader2 className="animate-spin h-5 w-5" />}
            <Icon
              icon="flat-color-icons:google"
              className="shrink-0"
              width={24}
              height={24}
            />
            <span>{loading ? "Redirecting..." : "Sign in with Google"}</span>
          </button>
        </div>
      </form>
    </>
  );
}
