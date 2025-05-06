import * as Yup from "yup";

export const EmployeeRegistrationSchema = Yup.object({
    name: Yup.string().min(3).max(24).required("Please provide valid name"),
    email: Yup.string().email().required("Please provide valid email"),
    gender: Yup.string().required("Please provide gender"),
    mobile_number: Yup.string().required("Please provide valid number").matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
    aadhaar_number:Yup.string().matches(/^\d{12}$/ , "Aadhaar numbe must exactly be 10 digits").required("Please provide valid aadhaar number"),
    account_number:Yup.string().matches(/^\d{10}$/,"Account number must exactly be 12 digits").required("Please provide valid account number"),
    department:Yup.string().required("Please provide valid department"),
    designation:Yup.string().required("Please provide valid designation"),
    previous_company:Yup.string().min(2).required("Please provide valid comapny"),
    pf_number:Yup.string().matches(/^\d{10}$/,"PF number must exactly be 10 digits").required("Please provide pf number"),
    salary:Yup.string().required("Please provide salary number"),
    current_address:Yup.string().min(5).required("Please provide current address"),
    permanent_address:Yup.string().min(5).required("Please provide permanent address"),
    employeeDOBDate:Yup.string().required("Please provide valid DOB"),
    employeeJoiningDate:Yup.string().required("Please provide valid joining date")
})