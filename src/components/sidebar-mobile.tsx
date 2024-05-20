import SideBar from './sidebar'
import { Button } from './ui/button'
import { IconSidebar } from './ui/icons'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

interface SidebarMobileProps {
  children: React.ReactNode
}

function SidebarMobileView({ children }: SidebarMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="-ml-2 flex size-9 p-0 lg:hidden">
          <IconSidebar className="size-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="inset-y-0 flex h-auto w-[300px] flex-col p-0"
      >
        <SideBar className="flex">{children}</SideBar>
      </SheetContent>
    </Sheet>
  )
}

export default SidebarMobileView
