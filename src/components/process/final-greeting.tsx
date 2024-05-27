import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Button } from '../ui/button'
import React from 'react'
import FeedbackForm from './feedback-form'
import { useMessageStore } from '../../stores/useMessageStore'
import { StepDefinition } from '../step-def'
import { useNavigate } from 'react-router-dom'

function FinalGreeting() {
  const [open, setOpen] = React.useState(false)
  const setMessages = useMessageStore(state => state.setMessages)
  const setHideTextArea = useMessageStore(state => state.setHideTextArea)
  const navigate = useNavigate()
  return (
    <div className="rounded-2xl flex flex-col px-40 py-5 items-center">
      <StepDefinition stepName="Finished" route=''/>
      <div className='mt-10'>
        <CheckCircleIcon className="text-green-500" />
        <span className="text-green-500">
          Congratulation!! Your initiated process is completed.
        </span>
      </div>
      <h2 className="text-xl">I hope, I was able to assisit you.</h2>
      <div className="flex gap-2">
        <p>Do you want to provide feedback?</p>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Yes
        </Button>
      </div>
      {open && <FeedbackForm open={open} onClose={setOpen} />}
      <div className="mt-5">
        <Button
          onClick={() => {
            setMessages([])
            setHideTextArea(false)
            navigate('/')
          }}
        >
          Start new conversation
        </Button>
      </div>
    </div>
  )
}

export default FinalGreeting
