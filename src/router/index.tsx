import { useRoutes } from 'react-router-dom'
import LoginForm from '../components/login-form'
import ChatHome from '../components/chat-home'

function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <ChatHome />
    },
    {
      path: '/login',
      element: <LoginForm/>
    }
  ])
  return routes
}

export default Router
