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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAddAdminNotificationMutation, useAddOvertimeRequestMutation } from "@/store/api/employeeApi";
import { useAppSelector } from "@/hooks/hooks";
import { Input } from "@/components/ui/input";

interface LeaveDate {
  date: Date;
  duration: "Full Day" | "Half Day";
}

interface LeaveFormValues {
  overtimeDates: LeaveDate[];
  description: string;
  overtimeDays: number
}

const OvertimeRequestSchema = Yup.object().shape({
  overtimeDates: Yup.array().min(1, "Please pick at least one overtime date"),
  description: Yup.string()
    .min(5, "Description should be at least 5 characters")
    .required("Please enter work description"),
});

export default function OvertimeRequestForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [trigger, { isLoading }] = useAddOvertimeRequestMutation();
  const [createAdminNotification] = useAddAdminNotificationMutation();
  const employee = useAppSelector((state) => state.employee);


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
      overtimeDates: [],
      description: "",
      overtimeDays: 0,
    },
    validationSchema: OvertimeRequestSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          employeeId: employee.employeeId,
          name: employee.name,
          email: employee.email,
          designation: employee.designation,
          description: values.description,
          overtimeDays: values.overtimeDays,
          overtimeDates: values.overtimeDates.map((ld) => ({
            date: ld.date.toISOString(),
            duration: ld.duration,
          })),
        };

        const result = await trigger(payload);
        let message = "";
        if(values.overtimeDates.length > 1){
          const startDate = new Date(values.overtimeDates[0].date).toLocaleDateString();
          const endDate = new Date(values.overtimeDates[values.overtimeDates.length - 1].date).toLocaleDateString();
          message= `${employee.name} has requested overtime from ${startDate} to ${endDate}.`;
          }else{
          const date = new Date(values.overtimeDates[0].date).toLocaleDateString();
          message= `${employee.name} has requested overtime for ${date}`;
        };
        const createdNotification = await createAdminNotification({
           title:"New overtime request",
           message ,
           type:"OVERTIME_REQUEST"
        });

        sendForm();


        if (result.error || createdNotification.error) {
          alert("Overtime request submission failed!");
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
    setFieldValue("overtimeDates", newDates);
  };

  useEffect(() => {
    if(values.overtimeDates){
      let count = 0;
      const firstLeave = values.overtimeDates[0];
      values.overtimeDates.forEach((item) => {
        if(item.duration === "Half Day"){
          count = count + 0.5
        }else{
          count = count + 1
        }
      });
      setFieldValue("overtimeDays" , count);
      if(values.overtimeDates.length === 1){
        const leaveTakenDate = new Date(firstLeave.date).getDate();
        const todayDate = new Date().getDate();
        // console.log(leaveTakenDate , todayDate);
        if(leaveTakenDate === (todayDate-1)){
           setFieldValue("leaveType" , "Sick");
        }
      }
      
    }
  },[values])

  async function sendForm() {
    try {
      let message = "";
  
      if (values.overtimeDates.length > 1) {
        const startDate = new Date(values.overtimeDates[0].date).toLocaleDateString();
        const endDate = new Date(values.overtimeDates[values.overtimeDates.length - 1].date).toLocaleDateString();
        message = `${employee.name} has requested overtime from ${startDate} to ${endDate}.`;
      } else {
        const date = new Date(values.overtimeDates[0].date).toLocaleDateString();
        message = `${employee.name} has requested overtime for ${date}.`;
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
          _subject: "Overtime request from Wrappixel EMS",
          _cc: "cyberashish321@gmail.com,niravjoshi87@gmail.com", // ✅ no spaces
          _template: "table", // ✅ optional but improves email format
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("✅ Overtime request sent successfully:", data);
      } else {
        console.error("❌ Failed to send overtime request:", data);
      }
  
    } catch (error) {
      console.error("🚨 Error sending overtime request:", error);
    }
  }
  

  return (
    <>
      <Card className="py-6 px-0">
        <h3 className="text-lg font-semibold text-dark border-b border-border pb-3 mb-4 px-6">
          Overtime Request Form
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6 px-6">


          {/* Leave Dates */}
          <div className="flex flex-col gap-1.5 lg:col-span-8 col-span-12">
            <Label className="text-sm font-medium text-dark">
              Select Dates
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  onBlur={() => setFieldTouched("overtimeDates", true)}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    values.overtimeDates.length === 0 && "text-muted-foreground",
                    errors.overtimeDates && touched.overtimeDates
                      ? "border-error"
                      : ""
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {values.overtimeDates.length > 0
                    ? values.overtimeDates
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
                  selected={values.overtimeDates.map((ld) => ld.date)}
                  onSelect={(selected) => handleDateSelect(selected || [])}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {typeof errors.overtimeDates === "string" && touched.overtimeDates && (
              <p className="text-sm text-red-500 font-medium">
                {errors.overtimeDates}
              </p>
            )}
          </div>

          {/* Leave Count */}
          <div className="flex flex-col gap-1.5 lg:col-span-4 col-span-12">
            <Label className="text-sm font-medium text-dark">
              Overtime Days
            </Label>
            <Input
                  type="number"
                  id="overtime_count"
                  value={values.overtimeDays}
                  onChange={handleChange}
                  name="overtimeDays"
                  onBlur={handleBlur}
                  className={`${errors.overtimeDays && touched.overtimeDays ? 'border-red-500 focus:!border-red-500' : null}`}
                  placeholder="Taken Leaves"
                
                />
            { touched.overtimeDays && (
              <p className="text-sm text-red-500 font-medium">
                {errors.overtimeDays}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5 col-span-12">
            <Label className="text-sm font-medium text-dark">
              Work Description
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
              placeholder="Please describe your work..."
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
              Overtime Request Submitted Successfully!
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
