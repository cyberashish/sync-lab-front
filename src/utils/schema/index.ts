import * as Yup from "yup"

const signupSchema = Yup.object({
    fullname: Yup.string().min(2).max(20).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
    confirmPassword: Yup.string().required("Please enter the confirm password").oneOf([Yup.ref('password')], "Password must match")
})

export {signupSchema}