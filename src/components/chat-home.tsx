import { nanoid } from '../lib/utils'
import { useMessageStore } from '../stores/useMessageStore'
import Chat from './chat'
import Header from './header'
import LoginForm from './login-form'
import ChatLayout from './sidebar-layout'
import Cookies from 'js-cookie'

function ChatHome() {
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
        <ChatLayout>
          {/* <VerticalLinearStepper /> */}
          <Chat id={id} session={''} missingKeys={['']} />
        </ChatLayout>
      )}
    </>
  )
}

export default ChatHome
