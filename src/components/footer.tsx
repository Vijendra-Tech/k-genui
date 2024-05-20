import React from 'react'
import { ExternalLink } from './external-link'
import { cn } from '../lib/utils'



export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-zinc-500',
        className
      )}
      {...props}
    >
      Open source AI chatbot built with{' '}
      <ExternalLink href="https://cloud.google.com/vertex-ai">
        Google Gemini
      </ExternalLink>
      , <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and{' '}
      <ExternalLink href="https://github.com/vercel/ai">
        Vercel AI SDK
      </ExternalLink>
      .
    </p>
  )
}
