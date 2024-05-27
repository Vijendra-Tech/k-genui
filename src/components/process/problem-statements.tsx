import { useState } from 'react'
import { useMessageStore } from '../../stores/useMessageStore'
import { StepDefinition } from '../step-def'
import { ChatPanel } from '../chat-panel'
import { useScrollAnchor } from '../../lib/hooks/use-scroll-anchor'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const ProblemStatement = () => {
  const problemStatement = useMessageStore(state => state.problemStatement)
  const [input, setInput] = useState('')
  const { isAtBottom, scrollToBottom } = useScrollAnchor()
  const route = useNavigate()
  return (
    <div className="flex justify-center items-center px-40 w-full">
      <div className="flex flex-col w-[100%]">
        <StepDefinition stepName="Problem Statement" />

        {problemStatement && (
          <>
            <p className="text-lg bg-zinc-50 rounded-md mt-5 px-5 py-5 overflow-y-auto max-h-[500px]">
              {problemStatement}
            </p>
            <hr />
            <div className="flex  justify-end mt-5">
              <Button
                onClick={() => {
                  route('/process/topic-selection')
                }}
              >
                Next
              </Button>
            </div>
          </>
        )}
        <ChatPanel
          id={'chat-areaid'}
          input={input}
          setInput={setInput}
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        />
      </div>
    </div>
  )
}

export default ProblemStatement
