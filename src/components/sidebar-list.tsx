//@ts-nocheck

import { SidebarItems } from './sidebar-items'

interface SidebarListProps {
  userId?: string
  children?: React.ReactNode
}
const chats: any = []
export default function SidebarList({ userId }: SidebarListProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        {chats?.length ? (
          <div className="space-y-2 px-2">
            <SidebarItems chats={chats} />
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No history</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-4">
        {/* <ThemeToggle /> */}
        {/* <ClearHistory clearChats={clearChats} isEnabled={chats?.length > 0} /> */}
      </div>
    </div>
  )
}
