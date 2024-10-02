//@ts-nocheck
import { useNavigate } from 'react-router-dom'
import Header from './header'
import { IconSpinner } from './ui/icons'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Button } from './ui/button'
import { KeyRound } from 'lucide-react'

export default function LoginForm({handleSSO}:{handleSSO:()=>void}) {
  const router = useNavigate()
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = new FormData(e.currentTarget).get('email')
    if (email) {
      // @ts-ignore
      Cookies.set('email', email, { expires: 7 })
      router('/')
    }
  }

  useEffect(() => {
    if (Cookies.get('email')) {
      router('/')
    }
  }, [router])
  
  return (
    <>
      <Header isLoggedIn={false} />
      <div className="flex flex-col items-center gap-4 space-y-3 mt-20">
        <form onSubmit={onSubmit}>
          <div className="w-full flex-1 rounded-xl border bg-white px-6 pb-4 pt-8 shadow-md  md:w-96 dark:bg-zinc-950">
            <div className="flex gap-2">
              <img
                alt="logo"
                src="https://www.kearney.com/o/atk-dot-com-theme/images/favicon-kearney.ico"
              />
              <h2 className="mt-8 text-xl font-semibold">Kearney GEN AI</h2>
            </div>

            <h1 className="mb-3 text-2xl font-bold mt-6">
              Please log in to continue.
            </h1>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-lg border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>
            </div>
            <LoginButton />
          </div>
        </form>
         <div className='h-10 shadow-md rounded-md'>
             <Button
               variant="ghost"
               className="text-xl font-semibold text-primary dark:text-zinc-100 dark:hover:text-zinc-200"
               onClick={handleSSO}
              >
                <KeyRound/>Signin with Microsoft
              </Button>
         </div>
      </div>
    </>
  )
}

function LoginButton() {
  const [pending, setPending] = useState<boolean>(false)
  return (
    <Button
      className="my-4 flex h-10 w-full flex-row items-center justify-center rounded-lg p-2 text-sm font-semibold text-zinc-100 hover:bg-primary dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      aria-disabled={pending}
    >
      {pending ? <IconSpinner /> : 'Log in'}
    </Button>
  )
}
