import * as Yup from "yup";

const LoginSchema = Yup.object({
    email: Yup.string().email().required("Please provide valid email"),
    password: Yup.string().matches(/^(?=.*\d).{6,}$/, 'Passowrd must be atlest 6 digit including 1 digit').required("Please provide valid password")
});

export {LoginSchema}