import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { useEnterSubmit } from '../lib/hooks/use-enter-submit'
import { Button } from './ui/button'
import { IconArrowElbow } from './ui/icons'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { useMessageStore } from '../stores/useMessageStore'
import { useNavigate } from 'react-router-dom'

export function PromptForm({
  input,
  setInput,
  placeholder = 'Enter your Problem Statement here..',
  handleSubmit
}: {
  input: string
  setInput: (value: string) => void
  placeholder?: string
  handleSubmit?: () => void
}) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const messages = useMessageStore(state => state.messages)
  const [isDragging, setIsDragging] = React.useState(false)
  const setMessages = useMessageStore(state => state.setMessages)
  const setProblemStatement = useMessageStore(
    state => state.setProblemStatement
  )
  const navigate = useNavigate()

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleDragEnter = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setIsDragging(false)
    // const data = e.dataTransfer.getData('text')
    // setInput(data)
    console.log('Dropped')
  }

  const handleDragLeave = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  return (
    <div>
      {isDragging && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="text-2xl font-semibold text-gray-800">
              Drag and Drop file
            </p>
            <p className="text-gray-600 mt-2">Drop your file here to upload</p>
          </div>
        </div>
      )}
      <form ref={formRef} onSubmit={handleSubmit}>
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
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
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
    </div>
  )
}
