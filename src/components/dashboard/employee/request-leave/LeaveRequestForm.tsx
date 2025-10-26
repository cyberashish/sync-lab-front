"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

import successImg from "@/assets/images/background/employee_registration.png";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAddAdminNotificationMutation, useAddLeaveRequestMutation } from "@/store/api/employeeApi";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks/hooks";

interface LeaveDate {
  date: Date;
  duration: "Full Day" | "Half Day";
}

interface LeaveFormValues {
  leaveType: string;
  leaveDates: LeaveDate[];
  description: string;
  leaveCount: number
}

const LeaveRequestSchema = Yup.object().shape({
  leaveType: Yup.string().required("Please select a leave type"),
  leaveDates: Yup.array().min(1, "Please pick at least one leave date"),
  description: Yup.string()
    .min(5, "Description should be at least 5 characters")
    .required("Please enter a reason"),
});

export default function LeaveRequestForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [trigger, { isLoading }] = useAddLeaveRequestMutation();
  const [createAdminNotification] = useAddAdminNotificationMutation();
  const employee = useAppSelector((state) => state.employee);
  const [isLeaveTypeDisabled , setIsLeaveTypeDisabled] = useState(false);

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    handleBlur,
    resetForm,
    setFieldTouched,
  } = useFormik<LeaveFormValues>({
    initialValues: {
      leaveType: "",
      leaveDates: [],
      description: "",
      leaveCount: 0,
    },
    validationSchema: LeaveRequestSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          employeeId: employee.employeeId,
          name: employee.name,
          email: employee.email,
          designation: employee.designation,
          description: values.description,
          leave: values.leaveCount,
          leaveType: values.leaveType,
          leaveDates: values.leaveDates.map((ld) => ({
            date: ld.date.toISOString(),
            duration: ld.duration,
          })),
        };

        const result = await trigger(payload);
        let message = "";
        if(values.leaveDates.length > 1){
          const startDate = new Date(values.leaveDates[0].date).toLocaleDateString();
          const endDate = new Date(values.leaveDates[values.leaveDates.length - 1].date).toLocaleDateString();
          message= `${employee.name} has requested leave from ${startDate} to ${endDate}.`;
          }else{
          const date = new Date(values.leaveDates[0].date).toLocaleDateString();
          message= `${employee.name} has requested leave for ${date}`;
        };
        const createdNotification = await createAdminNotification({
           title:"New leave request",
           message ,
           type:"LEAVE_REQUEST"
        });
        sendForm();


        if (result.error || createdNotification.error) {
          alert("Leave request submission failed!");
        }
         else {
          setIsDialogOpen(true);
          resetForm();
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong!");
      }
    },
  });

  // Function to add a date with default duration
  const handleDateSelect = (selected: Date[]) => {
    const newDates: LeaveDate[] = selected.map((d) => ({
      date: d,
      duration: "Full Day",
    }));
    setFieldValue("leaveDates", newDates);
  };

  useEffect(() => {
    if(values.leaveDates){
      let count = 0;
      const firstLeave = values.leaveDates[0];
      values.leaveDates.forEach((item) => {
        if(item.duration === "Half Day"){
          count = count + 0.5
        }else{
          count = count + 1
        }
      });
      setFieldValue("leaveCount" , count);
      if(values.leaveDates.length === 1){
        const leaveTakenDate = new Date(firstLeave.date).getDate();
        const todayDate = new Date().getDate();
        // console.log(leaveTakenDate , todayDate);
        if(leaveTakenDate === (todayDate-1)){
           setFieldValue("leaveType" , "Sick");
           setIsLeaveTypeDisabled(true)
        }
      }else{
        setIsLeaveTypeDisabled(false);
      }
      
    }
  },[values]);

  async function sendForm() {
    try {
      let message = "";
  
      if (values.leaveDates.length > 1) {
        const startDate = new Date(values.leaveDates[0].date).toLocaleDateString();
        const endDate = new Date(values.leaveDates[values.leaveDates.length - 1].date).toLocaleDateString();
        message = `${employee.name} has requested leave from ${startDate} to ${endDate}.`;
      } else {
        const date = new Date(values.leaveDates[0].date).toLocaleDateString();
        message = `${employee.name} has requested leave for ${date}.`;
      }
  
      const response = await fetch("https://formsubmit.co/ajax/cybermadhav0@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: employee.name,
          message: message,
          _subject: "Leave request from Wrappixel EMS",
          _cc: "cyberashish321@gmail.com,niravjoshi87@gmail.com",
          _template: "table", 
        }),
      });
  
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  
  

  return (
    <>
      <Card className="py-6 px-0">
        <h3 className="text-lg font-semibold text-dark border-b border-border pb-3 mb-4 px-6">
          Leave Request Form
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6 px-6">
          {/* Leave Type */}
          <div className="flex flex-col gap-1.5 lg:col-span-4 col-span-12">
            <Label className="text-sm font-medium text-dark">Leave Type</Label>
            <Select
              name="leaveType"
              disabled={isLeaveTypeDisabled}
              value={values.leaveType}
              onValueChange={(value) => setFieldValue("leaveType", value)}
            >
              <SelectTrigger
                onBlur={() => setFieldTouched("leaveType", true)}
                className={cn(
                  errors.leaveType && touched.leaveType ? "border-error" : ""
                )}
              >
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Casual">Casual Leave</SelectItem>
                <SelectItem value="Sick">Sick Leave</SelectItem>
                <SelectItem value="Vacation">Vacation Leave</SelectItem>
              </SelectContent>
            </Select>
            {errors.leaveType && touched.leaveType && (
              <p className="text-sm text-red-500 font-medium">
                {errors.leaveType}
              </p>
            )}
          </div>

          {/* Leave Dates */}
          <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
            <Label className="text-sm font-medium text-dark">
              Select Dates
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  onBlur={() => setFieldTouched("leaveDates", true)}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    values.leaveDates.length === 0 && "text-muted-foreground",
                    errors.leaveDates && touched.leaveDates
                      ? "border-error"
                      : ""
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {values.leaveDates.length > 0
                    ? values.leaveDates
                        .map((ld) => format(ld.date, "do MMM"))
                        .join(", ")
                    : "Pick dates"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 border-border"
                align="start"
              >
                <Calendar
                  mode="multiple"
                  selected={values.leaveDates.map((ld) => ld.date)}
                  onSelect={(selected) => handleDateSelect(selected || [])}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {typeof errors.leaveDates === "string" && touched.leaveDates && (
              <p className="text-sm text-red-500 font-medium">
                {errors.leaveDates}
              </p>
            )}
          </div>

          {/* Leave Count */}
          <div className="flex flex-col gap-1.5 lg:col-span-2 col-span-12">
            <Label className="text-sm font-medium text-dark">
              Leaves Count
            </Label>
            <Input
                  type="number"
                  id="leave_count"
                  value={values.leaveCount}
                  onChange={handleChange}
                  name="leaveCount"
                  onBlur={handleBlur}
                  className={`${errors.leaveCount && touched.leaveCount ? 'border-red-500 focus:!border-red-500' : null}`}
                  placeholder="Taken Leaves"
                
                />
            { touched.leaveCount && (
              <p className="text-sm text-red-500 font-medium">
                {errors.leaveCount}
              </p>
            )}
          </div>

          {/* Duration per date */}
          {values.leaveDates.map((ld, index) => (
            <div
              key={index}
              className="flex flex-col gap-1.5 lg:col-span-2 col-span-12"
            >
              <Label className="text-sm font-medium text-dark">
                {format(ld.date, "do MMM")}
              </Label>
              <Select
                value={ld.duration}
                onValueChange={(value) => {
                  const updated = [...values.leaveDates];
                  updated[index].duration = value as "Full Day" | "Half Day";
                  setFieldValue("leaveDates", updated);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Day">Full Day</SelectItem>
                  <SelectItem value="Half Day">Half Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}

          {/* Description */}
          <div className="flex flex-col gap-1.5 col-span-12">
            <Label className="text-sm font-medium text-dark">
              Reason / Description
            </Label>
            <Textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={cn(
                errors.description && touched.description
                  ? "border-red-500"
                  : ""
              )}
              placeholder="Explain your reason for leave..."
            />
            {errors.description && touched.description && (
              <p className="text-sm text-red-500 font-medium">
                {errors.description}
              </p>
            )}
          </div>

          <div className="col-span-12 flex justify-center">
            <Button
              type="submit"
              disabled={isLoading}
              className="lg:w-2/12 w-full"
            >
              {isLoading ? (
                <div className="flex items-center gap-1.5" >
                  <Loader2 className="animate-spin" />
                  Submitting...
                </div>
              ) : (
                "Submit Request"
              )}
            </Button>
          </div>
        </form>
      </Card>

      {/* Success Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(value) => setIsDialogOpen(value)}
      >
        <DialogContent className="sm:max-w-[350px]">
          <DialogTitle className="hidden" />
          <div>
            <img src={successImg} alt="success" className="w-full" />
            <h2 className="text-lg font-semibold text-primary text-center">
              Leave Request Submitted Successfully!
            </h2>
          </div>
          <Button
            className="w-fit mx-auto"
            onClick={() => setIsDialogOpen(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
