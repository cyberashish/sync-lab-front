import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { EmployeeRegistrationSchema } from "@/utils/schema/employeeSchema";
import { format } from "date-fns";
import { useFormik } from "formik";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import employeeBg from "@/assets/images/background/employee_registration.png"
import { DialogTitle } from "@radix-ui/react-dialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setEditEmployeeDialog, setTransformedEmployees } from "@/store/slices/employeeTableSlice";



export default function EmployeeRegistration() {
  const [employeeJoiningDate, setEmployeeJoiningDate] = useState<Date>();
  const [isDialogOpen , setIsDialogOpen] = useState(false);
  const selectedEmployee = useAppSelector((state) => state.employee);
  const isEdit = useAppSelector((state) => state.employeeTable.isEditDialogOpen);
  const allEmployees = useAppSelector((state) => state.employeeTable.employees);
  const dispatch = useAppDispatch();

  const initialValues = isEdit ? selectedEmployee : {
    name:"",
    email:"",
    gender:"male",
    mobile_number:"",
    aadhaar_number:"",
    account_number:"",
    department:"",
    designation:"",
    previous_company:"",
    pf_number:"",
    salary:"",
    current_address:"",
    permanent_address:"",
    employeeDOBDate:"",
    employeeJoiningDate:""
  }
 
  const {values , handleChange , handleSubmit , setFieldValue , errors , touched , handleBlur , setFieldTouched} = useFormik({
    initialValues ,
    validationSchema: EmployeeRegistrationSchema,
    onSubmit: (values) => {

      
      if(isEdit){
        console.log(isEdit);
        const transformData = allEmployees.map((employee) => {
           if(employee.email === values.email){
            return {...employee , ...values}
           }else{
            return employee
           }
        })
        dispatch(setTransformedEmployees(transformData));
        console.log("Employee edited successfully" , transformData);
        setIsDialogOpen(true);
      }else{
        setIsDialogOpen(true);
      }
    }
  });

//  console.log(errors)
const [startDate, setStartDate] = useState<null | Date>(null);
  useEffect(() => {
      if(startDate){
        setFieldValue("employeeDOBDate" , startDate);
      }
  },[startDate])

  useEffect(() => {
      if(employeeJoiningDate){
        setFieldValue("employeeJoiningDate" , employeeJoiningDate);
      }
  },[employeeJoiningDate])

  


  return (
    <>
      <Card className="p-0">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-dark leading-none">
            {isEdit ? 'Edit Employee' : 'Employee Registration Form'}
          </h3>
 
        </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6 p-6 pt-0">
            {/* Employee Name */}
            <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
              <Label
                htmlFor="employee_name"
                className="text-dark font-medium text-sm"
              >
                Employee Name
              </Label>
              <div>
                <Input
                  type="text"
                  id="employee_name"
                  value={values.name}
                  onChange={handleChange}
                  name="name"
                  onBlur={handleBlur}
                  className={`${errors.name && touched.name ? 'border-red-500 focus:!border-red-500' : null}`}
                  placeholder="Enter your name"
                
                />
              </div>
              {errors.name && touched.name ? <p className="text-sm text-red-500 font-medium" >{errors.name}</p> : null}
            </div>
            {/* Employee Email */}
            <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
              <Label
                htmlFor="employee_email"
                className="text-dark font-medium text-sm"
              >
                Employee Email
              </Label>
                <Input
                  type="email"
                  id="employee_email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${errors.email && touched.email ? 'border-red-500 focus:!border-red-500' : null}`}
                  name="email"
                  placeholder="Enter your email"
                />
              {errors.email && touched.email ? <p className="text-sm text-red-500 font-medium" >{errors.email}</p> : null}
            </div>
             {/* Gender */}
            <div className="flex flex-col gap-1.5 lg:col-span-4 col-span-12">
              <Label htmlFor="male" className="text-dark font-medium text-sm">
                Gender
              </Label>
              <div>
                <RadioGroup defaultValue="male" name="gender" value={values.gender} onValueChange={(value) => setFieldValue("gender" , value)} className="flex">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            {/* Date of Birth */}
            <div className="flex flex-col gap-1.5 lg:col-span-4 col-span-12">
              <Label
                htmlFor="employee_DOB"
                className="text-dark font-medium text-sm"
              >
                Date of Birth
              </Label>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      onBlur={() => setFieldTouched("employeeDOBDate" , true)}
                      className={cn(
                        `w-full justify-start text-left font-normal ${errors.employeeDOBDate && touched.employeeDOBDate ? 'border-red-500':null}`,
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {values.employeeDOBDate ? (
                        format(values.employeeDOBDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 border-border"
                    align="start"
                  >
                             <div className="flex justify-center border-primary w-full">
                             <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      inline
      dropdownMode="select"
    />
                             </div>
                  </PopoverContent>
                </Popover>
              </div>
              {errors.employeeDOBDate && touched.employeeDOBDate ? <p className="text-sm text-red-500 font-medium" >{errors.employeeDOBDate}</p> : null}
            </div>
            {/* Joining Date */}
            <div className="flex flex-col gap-1.5 lg:col-span-4 col-span-12">
              <Label
                htmlFor="employee_DOB"
                className="text-dark font-medium text-sm"
              >
                Joining Date
              </Label>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      onBlur={() => setFieldTouched("employeeJoiningDate" , true)}
                      className={cn(
                        `w-full justify-start text-left font-normal ${errors.employeeJoiningDate && touched.employeeJoiningDate ? 'border-red-500':null}`,
                        !employeeJoiningDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {values.employeeJoiningDate ? (
                        format(values.employeeJoiningDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 border-border"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={employeeJoiningDate}
                      onSelect={setEmployeeJoiningDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {errors.employeeJoiningDate && touched.employeeJoiningDate ? <p className="text-sm text-red-500 font-medium" >{errors.employeeJoiningDate}</p> : null}
            </div>
            {/* Mobile Number */}
            <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
              <Label
                htmlFor="employee_mobile_number"
                className="text-dark font-medium text-sm"
              >
                Mobile Number
              </Label>
              <div>
                <Input
                  type="text"
                  id="employee_mobile_number"
                  value={values.mobile_number} 
                  
                  onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g,"")
                    setFieldValue("mobile_number" ,onlyDigits )
                  }}
                  onBlur={handleBlur}
                  className={`${errors.mobile_number && touched.mobile_number ? 'border-red-500 focus:!border-red-500' : null}`}
                  name="mobile_number"
                
                  placeholder="Enter your mobile number"
                />
              </div>

              {errors.mobile_number && touched.mobile_number ? <p className="text-sm text-red-500 font-medium" >{errors.mobile_number}</p> : null}
            </div>
            {/* Aadhaar Number */}
            <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
              <Label
                htmlFor="employee_aadhaar_number"
                className="text-dark font-medium text-sm"
              >
                Aadhaar Number
              </Label>
              <div>
                <Input
                  type="text"
                  id="employee_aadhaar_number"
                  onBlur={handleBlur}
                  value={values.aadhaar_number} 
                  onChange={(e) => {
                    const OnlyDigits = e.target.value.replace(/\D/g,"");
                    setFieldValue('aadhaar_number' , OnlyDigits);
                  }}
                  name="aadhaar_number"
                  className={`${errors.aadhaar_number && touched.aadhaar_number ? 'border-red-500 focus:!border-red-500' : null}`}
                  placeholder="Enter your aadhaar number"
                />
              </div>
              {errors.aadhaar_number && touched.aadhaar_number ? <p className="text-sm text-red-500 font-medium" >{errors.aadhaar_number}</p> : null}
            </div>
             {/* Account Number */}
            <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
              <Label
                htmlFor="employee_account_number"
                className="text-dark font-medium text-sm"
              >
                Account Number
              </Label>
              <div>
                <Input
                  type="text"
                  id="employee_account_number"
                  value={values.account_number} 
                  onBlur={handleBlur}
                  onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g , "");
                    setFieldValue("account_number" , onlyDigits)
                  }}
                  name="account_number"
                  className={`${errors.account_number && touched.account_number ? 'border-red-500 focus:!border-red-500' : null}`}
                  placeholder="Enter your account number"
                />
              </div>
              {errors.account_number && touched.account_number ? <p className="text-sm text-red-500 font-medium" >{errors.account_number}</p> : null}
            </div>
              {/* Select Department */}
            <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
              <Label
                htmlFor="employee_department"
                className="text-dark font-medium text-sm"
              >
                Select Department
              </Label>
              <div>
                <Select defaultValue="Engineering" name="department" value={values.department} onValueChange={(value) => setFieldValue("department" , value)} >
                  <SelectTrigger onBlur={() => setFieldTouched("department" , true)} className={`w-full ${errors.department && touched.department ? 'border-red-500 focus:!border-red-500' : null}`}>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Quality Assurance">
                        Quality Assurance (QA)
                      </SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {errors.department && touched.department ? <p className="text-sm text-red-500 font-medium" >{errors.department}</p> : null}
            </div>
            {/* Select Designation */}
            <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
              <Label
                htmlFor="employee_designation"
                className="text-dark font-medium text-sm"
              >
                Select Designation
              </Label>
              <div>
                <Select defaultValue="Frontend Developer" name="designation" value={values.designation} onValueChange={(value) => setFieldValue("designation" , value)}>
                  <SelectTrigger onBlur={() => setFieldTouched("designation" , true)} className={`w-full ${errors.designation && touched.designation ? 'border-red-500 focus:!border-red-500' : null}`}>
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Frontend Developer">
                        Frontend Developer
                      </SelectItem>
                      <SelectItem value="Backend Developer">
                        Backend Developer
                      </SelectItem>
                      <SelectItem value="DevOps Engineer">
                        DevOps Engineer
                      </SelectItem>
                      <SelectItem value="Product Designer">
                        Product Designer
                      </SelectItem>
                      <SelectItem value="UI/UX Designer">
                        UI/UX Designer
                      </SelectItem>
                      <SelectItem value="Visual Designer">
                        Visual Designer
                      </SelectItem>
                      <SelectItem value="QA Tester">QA Tester</SelectItem>
                      <SelectItem value="Marketing Executive">
                        Marketing Executive
                      </SelectItem>
                      <SelectItem value="Sales Manager">
                        Sales Manager
                      </SelectItem>
                      <SelectItem value="Automation QA Engineer">
                        Automation QA Engineer
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {errors.designation && touched.designation ? <p className="text-sm text-red-500 font-medium" >{errors.designation}</p> : null}
            </div>
            {/* Previous Company */}
            <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
              <Label
                htmlFor="employee_previous_company"
                className="text-dark font-medium text-sm"
              >
                Previous Company
              </Label>
              <div>
                <Input
                  type="text"
                  onBlur={handleBlur}
                  id="employee_previous_company"
                  value={values.previous_company} 
                  onChange={handleChange}
                  name="previous_company"
                  className={`${errors.previous_company && touched.previous_company ? 'border-red-500 focus:!border-red-500' : null}`}
                  placeholder="Enter previous company"
                />
              </div>
              {errors.previous_company && touched.previous_company ? <p className="text-sm text-red-500 font-medium" >{errors.previous_company}</p> : null}
            </div>
            {/* PF Number */}
            <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
              <Label
                htmlFor="pf_number"
                className="text-dark font-medium text-sm"
              >
                PF Number
              </Label>
              <div>
                <Input
                  type="text"
                  id="pf_number"
                  onBlur={handleBlur}
                  value={values.pf_number} 
                  onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g , "")
                    setFieldValue("pf_number" , onlyDigits )
                  }}
                  name="pf_number"
                  className={`${errors.pf_number && touched.pf_number ? 'border-red-500 focus:!border-red-500' : null}`}
                  placeholder="Enter PF number"
                />
              </div>
              {errors.pf_number && touched.pf_number ? <p className="text-sm text-red-500 font-medium" >{errors.pf_number}</p> : null}
            </div>
            {/* Salary*/}
            <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
              <Label
                htmlFor="salary"
                className="text-dark font-medium text-sm"
              >
                Salary
              </Label>
              <div>
                <Input
                  type="text"
                  id="salary"
                  onBlur={handleBlur}
                  value={values.salary} 
                  onChange={handleChange}
                  name="salary"
                  className={`${errors.salary && touched.salary ? 'border-red-500 focus:!border-red-500' : null}`}
                  placeholder="Enter salary"
                />
              </div>
              {errors.salary && touched.salary ? <p className="text-sm text-red-500 font-medium" >{errors.salary}</p> : null}
            </div>
            {/* Current Address*/}
            <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
              <Label
                htmlFor="Current Address"
                className="text-dark font-medium text-sm"
              >
                Current Address
              </Label>
              <div>
                <Textarea onBlur={handleBlur} className={`text-sm ${errors.current_address && touched.current_address ? 'border-red-500 focus:!border-red-500' : null}`} id="Current Address"  name="current_address" value={values.current_address} 
                  onChange={handleChange} placeholder="Enter current address..." />
              </div>
              {errors.current_address && touched.current_address ? <p className="text-sm text-red-500 font-medium" >{errors.current_address}</p> : null}
            </div>
            {/* Permanent Address*/}
            <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
              <Label
                htmlFor="Permanent Address"
                className="text-dark font-medium text-sm"
              >
                Permanent Address
              </Label>
              <div>
                <Textarea onBlur={handleBlur} className={` text-sm ${errors.permanent_address && touched.permanent_address ? 'border-red-500 focus:!border-red-500' : null}`} id="Permanent Address" name="permanent_address" value={values.permanent_address} 
                  onChange={handleChange} placeholder="Enter permanent address..." />
              </div>
              {errors.permanent_address && touched.permanent_address ? <p className="text-sm text-red-500 font-medium" >{errors.permanent_address}</p> : null}
            </div>
            <div className="col-span-12">
              <div className="w-full flex justify-center ">
              <Button className="lg:w-2/12 w-full" type="submit" >Submit</Button>
              </div>
            </div>
          </form>
      </Card>
      {/* Successfuly registration model */}
                <Dialog open={isDialogOpen} onOpenChange={(value) => setIsDialogOpen(value)} >
                  <DialogContent className="sm:max-w-[350px]">
                    <DialogTitle className="hidden" ></DialogTitle>
                    <div>
                    <img src={employeeBg} alt="employee" className="w-full" />
                    <h2 className="text-lg font-semibold text-primary text-center" >{isEdit ? 'Employee edited Successfuly !' : 'Employee registered Successfuly !'}</h2>
                    </div>
                     <Button className="w-fit mx-auto" onClick={() => {
                      setIsDialogOpen(false);
                      dispatch(setEditEmployeeDialog(false));
                     }} >Close</Button>
                  </DialogContent>
                </Dialog>
    </>
  );
}
