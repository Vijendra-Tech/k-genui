import { useRoutes } from 'react-router-dom'
import LoginForm from '../components/login-form'
import ChatHome from '../components/chat-home'
import TopicSelection from '../components/process/topic-selection'
import ProblemStatement from '../components/process/problem-statements'
import ViewSummary from '../components/process/view-summary'
import EntryPage from '../components/process/entry-page'
import GenerateStoryLine from '../components/process/generate-storyline'
import Confirmation from '../components/process/confirmation'
import FinalGreeting from '../components/process/final-greeting'
import Dashboard from '../components/process/dashboard'
import AiAssistant from '../components/process/ai-assistant'
import AnimationSuccess from '../components/process/success-animation'

function Router() {
  const routes = useRoutes([
    {
      path: '/process/problem-statement',
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
      path: '/process/generate-storyline',
      element: <ChatHome children={<GenerateStoryLine />} />
    },
    {
      path: '/process/generate-draft',
      element: <ChatHome children={<Confirmation />} />
    },
    {
      path: '/process/final',
      element: <ChatHome children={<FinalGreeting />} />
    },

    {
      path: '/',
      element: <ChatHome children={<EntryPage />} />
    },
    {
      path: '/ai',
      element: <ChatHome children={<AiAssistant />} />
    },
    {
      path: '/login',
      element: <LoginForm handleSSO={() => {}} />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/animation',
      element: <AnimationSuccess />
    }
  ])
  return routes
}

export default Router
