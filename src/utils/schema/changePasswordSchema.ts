import * as Yup from "yup";

export const ChangePassWordSchmea = Yup.object({
    oldPassword: Yup.string().matches(/^(?=.*\d).{6,}$/,'Passowrd must be atlest 6 digit including 1 digit').required("Please provide password"),
    newPassword: Yup.string().matches(/^(?=.*\d).{6,}$/,'Passowrd must be atlest 6 digit including 1 digit').required("Please provide password"),
    confirmNewPassword: Yup.string().matches(/^(?=.*\d).{6,}$/,'Passowrd must be atlest 6 digit including 1 digit').oneOf([Yup.ref("newPassword")],"Password must match").required("Please provide password"),
})
