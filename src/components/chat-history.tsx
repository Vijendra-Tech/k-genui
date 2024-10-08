import * as React from 'react'
import { cn } from '../lib/utils'
import { buttonVariants } from './ui/button'
import { IconPlus } from './ui/icons'
import SidebarList from './sidebar-list'
import { Link } from 'react-router-dom'

interface ChatHistoryProps {
  userId?: string
}

export default function ChatHistory({ userId="" }: ChatHistoryProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4">
        <h4 className="text-sm font-medium">History {userId}</h4>
      </div>
      <div className="mb-2 px-2">
        <Link
          to={'/'}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'h-10 w-full justify-start bg-zinc-50 px-4 shadow-none transition-colors hover:bg-zinc-200/40'
          )}
        >
          <IconPlus className="-translate-x-2 stroke-2" />
          New Conversation
        </Link>
      </div>
      <React.Suspense
        fallback={
          <div className="flex flex-col flex-1 px-4 space-y-4 overflow-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-6 rounded-lg shrink-0 animate-pulse bg-zinc-200"
              />
            ))}
          </div>
        }
      >
        <SidebarList userId={''} />
      </React.Suspense>
    </div>
  )
}
