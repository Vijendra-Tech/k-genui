import SidebarDesktop from './sidebar-desktop'

interface ChatLayoutProps {
  children?: React.ReactNode
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <>
      <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden flex-col">
        <SidebarDesktop />
        {children}
      </div>
    </>
  )
}
