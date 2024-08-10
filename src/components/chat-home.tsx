import { Outlet } from 'react-router-dom'
import { nanoid } from '../lib/utils'
import { useMessageStore } from '../stores/useMessageStore'
import Chat from './chat'
import Header from './header'
import LoginForm from './login-form'
// import ProblemStatement from './process/problem-statements'
import ChatLayout from './sidebar-layout'
import Cookies from 'js-cookie'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { loginRequest } from '../auth/auth-config'

interface ChatHomeProps {
  children: React.ReactNode
}

function ChatHome({ children }: ChatHomeProps) {
  const featureFlag = useMessageStore(state => state.featureFlag)
  const { instance } = useMsal()
  const id = nanoid()

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: 'create'
      })
      .catch(e => {
        console.log(e)
      })
  }
  // const loggedInUser = Cookies.get('email')
  const isAuthenticated = useIsAuthenticated()
  if (!isAuthenticated) {
    return <LoginForm handleSSO={handleRedirect} />
  }
  return (
    <>
      <Header isLoggedIn={true} />
      {featureFlag === 'v1' ? (
        <>
          <ChatLayout>
            <Chat id={id} session={''} missingKeys={['']} />
          </ChatLayout>
        </>
      ) : (
        <ChatLayout>{children}</ChatLayout>
      )}
    </>
  )
}

export default ChatHome
