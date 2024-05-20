import { cn } from '../lib/utils'

function BotMessage({
  content,
  className,
  children
}: {
  content: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <>
      <div
        className={cn('group relative flex items-start md:-ml-12', className)}
      >
        <div className="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-lg border shadow-sm">
          <img
            className="size-6"
            src="https://www.kearney.com/o/atk-dot-com-theme/images/favicon-kearney.ico"
            alt="gemini logo"
          />
        </div>
        <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
          {content}
        </div>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden  block">{children}</div>
    </>
  )
}

export default BotMessage
