import { Outlet } from 'react-router-dom'
import { nanoid } from '../lib/utils'
import { useMessageStore } from '../stores/useMessageStore'
import Chat from './chat'
import Header from './header'
import LoginForm from './login-form'
// import ProblemStatement from './process/problem-statements'
import ChatLayout from './sidebar-layout'
import Cookies from 'js-cookie'

interface ChatHomeProps {
  children: React.ReactNode
}

function ChatHome({children}: ChatHomeProps) {
  const featureFlag = useMessageStore(state => state.featureFlag)
  const id = nanoid()
  const loggedInUser = Cookies.get('email')
  if (!loggedInUser) {
    return <LoginForm />
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
