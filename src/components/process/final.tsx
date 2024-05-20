import { nanoid } from 'nanoid'
import { useMessageStore } from '../../stores/useMessageStore'
import { Button } from '../ui/button'
import BotMessage from '../bot-message'
import FinalGreeting from './final-greeting'

function Final() {
  const messages = useMessageStore(state => state.messages)
  const setMessages = useMessageStore(state => state.setMessages)
  return (
    <div className="rounded-2xl bg-muted  flex flex-col px-4 py-5 gap-2">
      <div className="">Here is your final document.</div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setMessages([
              ...messages,
              {
                id: nanoid,
                display: (
                  <BotMessage content="">
                    <FinalGreeting />
                  </BotMessage>
                )
              }
            ])
          }}
        >
          Download
        </Button>
      </div>
    </div>
  )
}

export default Final
