import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Button } from '../ui/button'
import React from 'react'
import FeedbackForm from './feedback-form'
import { useMessageStore } from '../../stores/useMessageStore'

function FinalGreeting() {
  const [open, setOpen] = React.useState(false)
  const setMessages = useMessageStore(state => state.setMessages)
  const setHideTextArea = useMessageStore(state => state.setHideTextArea)
  return (
    <div className="rounded-2xl bg-muted flex flex-col px-4 py-5 items-center">
      <div>
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
        {/* <Button variant="outline">No</Button> */}
      </div>
      {open && <FeedbackForm open={open} onClose={setOpen} />}
      <div className="mt-5">
        <Button
          onClick={() => {
            setMessages([])
            setHideTextArea(false)
          }}
        >
          Start new conversation
        </Button>
      </div>
    </div>
  )
}

export default FinalGreeting
