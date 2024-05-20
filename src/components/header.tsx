import React from 'react'
import { IconUser } from './ui/icons'
import UserMenu from './user-menu'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import SidebarMobileView from './sidebar-mobile'
import ChatHistory from './chat-history'
import SideBarToggle from './sidebar-toggle'
import Logo from '../assets/Kearney_logo_slate.svg'
import { useMessageStore } from '../stores/useMessageStore'

function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useNavigate()
  const setMessages = useMessageStore(state => state.setMessages)
  const [anchorEl, setAnchorEl] = React.useState<null | SVGSVGElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    Cookies.remove('email')
    router('/login')
    setMessages([])
  }
  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl border-b-2 bg-muted">
        <div className="flex justify-start gap-2">
          {isLoggedIn && (
            <>
              <SidebarMobileView>
                <ChatHistory userId={''} />
              </SidebarMobileView>
              <SideBarToggle />
            </>
          )}
          <img alt="Logo" src={Logo} width={150} />
          {/* {isLoggedIn && <FeatureFlag />} */}
        </div>
        {isLoggedIn && <IconUser onClick={handleClick} className="mx-10" />}
      </header>
      <UserMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleLogout={handleLogout}
      />
    </>
  )
}

export default Header
