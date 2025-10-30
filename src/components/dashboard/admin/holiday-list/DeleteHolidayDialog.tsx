"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAllHolidaysQuery, useDeleteHolidayMutation } from "@/store/api/employeeApi";
import { Loader2 } from "lucide-react";

export default function DeleteHolidayDialog({isDialogOpen , selectedHoliday , setIsDialogOpen}:any) {


  const [deleteHoliday, { isLoading }] = useDeleteHolidayMutation();
  const { refetch } = useAllHolidaysQuery(undefined);

  const handleDeleteHoliday = async () => {
    if (!selectedHoliday?.id) return;

    try {
      const result = await deleteHoliday({ id: selectedHoliday.id });

      if ("error" in result) {
        console.error("Error deleting holiday:", result.error);
      } else {
        await refetch();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error deleting holiday:", error);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(value) => setIsDialogOpen(value)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Are you sure you want to delete this holiday?
          </DialogTitle>
        </DialogHeader>

        {selectedHoliday && (
          <div className="text-sm text-muted-foreground mb-4">
            <p>
              <span className="font-medium text-foreground">
                {selectedHoliday.name}
              </span>{" "}
              ({selectedHoliday.totalDays}{" "}
              {selectedHoliday.totalDays > 1 ? "days" : "day"})
            </p>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            onClick={handleDeleteHoliday}
            disabled={isLoading}
            variant="destructive"
            className="flex items-center gap-1"
          >
            {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
            Delete
          </Button>
          <Button onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
