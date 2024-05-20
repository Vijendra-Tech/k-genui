//@ts-nocheck
import React, { useEffect, useState } from 'react'
import ChatList from './chat-list'
import { EmptyScreen } from './empty-screen'
import { ChatPanel } from './chat-panel'
import { useLocalStorage } from '../lib/hooks/use-local-storage'
import { useScrollAnchor } from '../lib/hooks/use-scroll-anchor'
import { cn } from '../lib/utils'
import { useMessageStore } from '../stores/useMessageStore'
import VerticalLinearStepper from './vertical-stepper'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: any[]
  id?: string
  session?: any
  missingKeys?: string[]
}

function Chat({ id, className, session, missingKeys = [''] }: ChatProps) {
  const messages = useMessageStore(state => state.messages)
  const featureFlag = useMessageStore(state => state.featureFlag)
  const hideTextArea = useMessageStore(state => state.hideTextArea)
  const [input, setInput] = useState('')
  const [_, setNewChatId] = useLocalStorage('newChatId', id)
  useEffect(() => {
    setNewChatId(id)
  })

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()
  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div className={cn('pb-[200px] pt-4', className)} ref={messagesRef}>
        {featureFlag === 'v1' && messages.length > 2 ? (
          <ChatList msg={''} isShared={false} session={session} />
        ) : featureFlag === 'v2' && messages.length ? (
          <VerticalLinearStepper />
        ) : (
          <EmptyScreen />
        )}
        <div className="h-px w-full" ref={visibilityRef} />
      </div>
      {!hideTextArea && (
        <ChatPanel
          id={id}
          input={input}
          setInput={setInput}
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        />
      )}
    </div>
  )
}

export default Chat
