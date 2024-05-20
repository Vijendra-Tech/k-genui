import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { nanoid } from 'nanoid'
import { useEnterSubmit } from '../lib/hooks/use-enter-submit'
import { Button } from './ui/button'
import { IconArrowElbow } from './ui/icons'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { useMessageStore } from '../stores/useMessageStore'
import UserMessage from './user-message'
import BotMessage from './bot-message'
import TopicSelection from './process/topic-selection'

export function PromptForm({
  input,
  setInput,
  placeholder = 'Enter your Problem Statement here..'
}: {
  input: string
  setInput: (value: string) => void
  placeholder?: string
}) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const messages = useMessageStore(state => state.messages)
  const setMessages = useMessageStore(state => state.setMessages)
  const setProblemStatement = useMessageStore(
    state => state.setProblemStatement
  )

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault()

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target['message']?.blur()
        }

        const value = input.trim()
        setInput('')
        if (!value) return

        setMessages([
          ...messages,
          { id: nanoid(), display: <UserMessage>{value}</UserMessage> },
          {
            id: nanoid(),
            display: (
              <BotMessage content={'Please select topics'}>
                <TopicSelection />
              </BotMessage>
            )
          }
        ])
        setProblemStatement(value)
      }}
      
    >
      <div className="relative flex max-h-60 w-full grow flex-col bg-muted px-12 sm:px-12">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="min-h-[60px] w-full bg-transparent placeholder:text-zinc-900 resize-none px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div className="absolute right-4 bottom-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={input === ''}
                className="bg-transparent shadow-none text-zinc-950 rounded-full hover:bg-zinc-200"
              >
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
