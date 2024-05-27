import Cookies from 'js-cookie'

export function EmptyScreen() {
  const loggedInUser = Cookies.get('email')?.split('@')[0].split('.')[0].toUpperCase()
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-2xl bg-muted sm:p-8 p-4 text-sm sm:text-base items-start mt-5">
        <p className="leading-normal text-zinc-900">
          Hello {loggedInUser}, How Can I help you today?
        </p>
      </div>
    </div>
  )
}
