import { nanoid } from 'nanoid'
import { useMessageStore } from '../../stores/useMessageStore'
import { Button } from '../ui/button'
import BotMessage from '../bot-message'
import FileDrop from './file-drop'
import { useState } from 'react'

function SummaryStep() {
  const messages = useMessageStore(state => state.messages)
  const setMessages = useMessageStore(state => state.setMessages)
  const [showDF, setShowDF] = useState(false)
  const featureFlag = useMessageStore(state => state.featureFlag)
  return (
    <div>
      <div className="flex flex-col gap-2 rounded-2xl bg-muted sm:p-8 p-4 text-sm sm:text-base items-start mt-5">
        <h2 className="text-sm sm:text-xl tracking-tight  max-w-fit inline-block">
          Storyline is ready,do you want to attach any any further information? Show the generated storyline
        </h2>
        <div className="flex justify-start gap-6">
          <Button
            variant={'default'}
            onClick={() => {
              if (featureFlag === 'v1') {
                setMessages([
                  ...messages,
                  {
                    id: nanoid(),
                    display: (
                      <BotMessage content={''}>
                        <FileDrop />
                      </BotMessage>
                    )
                  }
                ])
              } else {
                setShowDF(true)
              }
            }}
          >
            Yes
          </Button>
          <Button variant={'outline'} onClick={() => setShowDF(!setShowDF)}>
            No
          </Button>
        </div>
        {showDF && (
          <div className='flex gap-3 items-center'>
            <h6 className='text-sm'>Attach Paperclip</h6>
            <FileDrop />
          </div>
        )}
      </div>
    </div>
  )
}

export default SummaryStep
