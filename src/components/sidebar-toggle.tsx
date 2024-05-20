import { useSidebar } from '../lib/hooks/use-sidebar'
import { Button } from './ui/button'
import { IconSidebar } from './ui/icons'

function SideBarToggle() {
  const { toggleSidebar } = useSidebar()
  return (
    <Button
      variant="ghost"
      className="-ml-2 hidden size-9 p-0 lg:flex"
      onClick={() => {
        toggleSidebar()
      }}
    >
      <IconSidebar className="size-6" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

export default SideBarToggle
