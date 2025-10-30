"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

import successImg from "@/assets/images/background/employee_registration.png";
import { useAddHolidayMutation } from "@/store/api/employeeApi";

// ✅ Validation Schema
const HolidaySchema = Yup.object().shape({
  name: Yup.string().required("Please enter holiday name"),
  type: Yup.string().required("Please select holiday type"),
  description: Yup.string().min(3, "Description should be at least 3 characters"),
  holidayDates: Yup.array().min(1, "Please select at least one date"),
});

export default function AddHolidayForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [addHoliday] = useAddHolidayMutation();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      holidayDates: [] as any[],
      totalDays: 0,
      type: "",
    },
    validationSchema: HolidaySchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const payload = {
          name: values.name,
          description: values.description,
          type: values.type,
          totalDays: values.holidayDates.length,
          holidayDates: values.holidayDates.map((d) => d.toISOString()),
        };

        // Example: API call
        try{
          await addHoliday(payload);
          setIsDialogOpen(true);
          resetForm();
        }catch(err:any){
          alert("Failed to add holiday");
          console.log("Failed to add holiday", err)
        }

        // if (!res.ok) throw new Error("Failed to add holiday");


      } catch (error) {
        console.error(error);
        alert("Something went wrong while adding holiday!");
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    setFieldValue("totalDays", values.holidayDates.length);
  }, [values.holidayDates]);

  const handleDateSelect = (selected: Date[]) => {
    setFieldValue("holidayDates", selected);
  };

  return (
    <>
      <Card className="py-6 px-0">
        <h3 className="text-lg font-semibold text-dark border-b border-border pb-3 mb-4 px-6">
          Add New Holiday
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6 px-6">
          {/* Holiday Name */}
          <div className="flex flex-col gap-1.5 lg:col-span-4 col-span-12">
            <Label>Holiday Name</Label>
            <Input
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter holiday name"
              className={cn(errors.name && touched.name && "border-red-500")}
            />
            {errors.name && touched.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Holiday Type */}
          <div className="flex flex-col gap-1.5 lg:col-span-4 col-span-12">
            <Label>Holiday Type</Label>
            <Select
              value={values.type}
              onValueChange={(value) => setFieldValue("type", value)}
            >
              <SelectTrigger
                onBlur={() => setFieldTouched("type", true)}
                className={cn(errors.type && touched.type && "border-red-500")}
              >
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Public">Public Holiday</SelectItem>
                <SelectItem value="Company">Company Holiday</SelectItem>
                <SelectItem value="Optional">Optional Holiday</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && touched.type && (
              <p className="text-sm text-red-500">{errors.type}</p>
            )}
          </div>

          {/* Holiday Dates */}
          <div className="flex flex-col gap-1.5 lg:col-span-4 col-span-12">
            <Label>Select Dates</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    values.holidayDates.length === 0 && "text-muted-foreground",
                    errors.holidayDates && touched.holidayDates
                      ? "border-error"
                      : ""
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {values.holidayDates.length > 0
                    ? values.holidayDates.map((d) => format(d, "do MMM")).join(", ")
                    : "Pick dates"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-border" align="start">
                <Calendar
                  mode="multiple"
                  selected={values.holidayDates}
                  onSelect={(selected) => handleDateSelect(selected || [])}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {touched.holidayDates && typeof errors.holidayDates === "string" && (
  <p className="text-sm text-red-500">{errors.holidayDates}</p>
)}
          </div>

          {/* Total Days */}
          <div className="flex flex-col gap-1.5 lg:col-span-3 col-span-12">
            <Label>Total Days</Label>
            <Input
              name="totalDays"
              type="number"
              readOnly
              value={values.totalDays}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5 lg:col-span-9 col-span-12">
            <Label>Description</Label>
            <Textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Write a short description..."
              className={cn(errors.description && touched.description && "border-red-500")}
            />
            {errors.description && touched.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Submit */}
          <div className="col-span-12 flex justify-center">
            <Button type="submit" disabled={isLoading} className="lg:w-2/12 w-full">
              {isLoading ? (
                <div className="flex items-center gap-1.5">
                  <Loader2 className="animate-spin" /> Saving...
                </div>
              ) : (
                "Add Holiday"
              )}
            </Button>
          </div>
        </form>
      </Card>

      {/* ✅ Success Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[350px]">
          <DialogTitle className="hidden" />
          <div>
            <img src={successImg} alt="success" className="w-full" />
            <h2 className="text-lg font-semibold text-primary text-center">
              Holiday Added Successfully!
            </h2>
          </div>
          <Button className="w-fit mx-auto" onClick={() => setIsDialogOpen(false)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
