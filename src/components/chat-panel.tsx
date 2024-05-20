import { PromptForm } from './prompt-form'
import { ButtonScrollToBottom } from './button-scroll-to-bottom'
import { cn } from '../lib/utils'
import { useMessageStore } from '../stores/useMessageStore'

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ChatPanel({
  // id,
  // title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom
}: ChatPanelProps) {

   const messages = useMessageStore(state => state.messages)
  // const [shareDialogOpen, setShareDialogOpen] = React.useState(false)

const exampleMessages:any = [
  // {
  //   heading: 'Please choose topics',
  //   subheading: '',
  //   message: `Please suggestion babsed on topic`
  // },
]

  return (
    <div className="fixed inset-x-0 bg-white/90 bottom-0 w-full duration-300 ease-in-out peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px] dark:from-10%">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid sm:grid-cols-2 gap-2 sm:gap-4 px-4 sm:px-0">
          {messages.length === 0 &&
            exampleMessages?.map((example:any, index:number) => (
              <div
                key={example.heading}
                className={cn(
                  'cursor-pointer bg-zinc-50 text-zinc-950 rounded-2xl p-4 sm:p-6 hover:bg-zinc-100 transition-colors',
                  index > 1 && 'hidden md:block'
                )}
                // onClick={async () => {
                //   setMessages(currentMessages => [
                //     ...currentMessages,
                //     {
                //       id: nanoid(),
                //       display: <UserMessage>{example.message}</UserMessage>
                //     }
                //   ])

                //   try {
                //     const responseMessage = await submitUserMessage(
                //       example.message
                //     )

                //     setMessages(currentMessages => [
                //       ...currentMessages,
                //       responseMessage
                //     ])
                //   } catch {
                //        console.log('something went wrong');
                       
                //   }
                // }}
              >
                <div className="font-medium">{example.heading}</div>
                <div className="text-sm text-zinc-800">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div>
        <div className="grid gap-4 sm:pb-4">
          <PromptForm input={input} setInput={setInput} />
        </div>
      </div>
    </div>
  )
}
