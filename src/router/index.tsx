import { useRoutes } from 'react-router-dom'
import LoginForm from '../components/login-form'
import ChatHome from '../components/chat-home'
import TopicSelection from '../components/process/topic-selection'
import ProblemStatement from '../components/process/problem-statements'
import ViewSummary from '../components/process/view-summary'

function Router() {
  const routes = useRoutes([
    {
      path: '/process',
      element: <ChatHome children={<ProblemStatement />} />
    },
    {
      path: '/process/topic-selection',
      element: <ChatHome children={<TopicSelection />} />
    },
    {
      path: '/process/view-summary',
      element: <ChatHome children={<ViewSummary />} />
    },

    {
      path: '/',
      element: <ChatHome children={<ProblemStatement />} />
    },
    {
      path: '/login',
      element: <LoginForm />
    }
  ])
  return routes
}

export default Router
