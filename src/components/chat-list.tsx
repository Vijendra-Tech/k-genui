
//@ts-nocheck
import { useMessageStore } from '../stores/useMessageStore'

export interface ChatList {
  msg?: any
  session?: any
  isShared?: boolean
}

function ChatList({ msg, session, isShared }: ChatList) {
  const messages = useMessageStore(state => state.messages)
  return messages.length ? (
    <div className="relative mx-auto max-w-2xl grid auto-rows-max gap-8 px-4">
      {messages?.map((message: any) => (
        <div key={message.id}>
          {/* {message.spinner} */}
          {message.display}
          {/* {message.attachments} */}
        </div>
      ))}
    </div>
  ) : null
}

export default ChatList
