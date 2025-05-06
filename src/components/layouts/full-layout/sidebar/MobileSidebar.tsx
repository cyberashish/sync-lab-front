import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Icon } from "@iconify/react/dist/iconify.js"
import InnerSidebarItems from "./InnerSidebarItems"
import FullLogo from "@/components/shared/logo/FullLogo"

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
      <Icon icon="tabler:menu-3" width={28} height={28} className="text-dark lg:hidden order-0" />
      </SheetTrigger>
      <SheetContent className="p-4" side="left" >
        <SheetHeader className="hidden" >
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex justify-start">
        <FullLogo/>
        </div>
         <InnerSidebarItems/>
        <SheetFooter className="hidden" >
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
