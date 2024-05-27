import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Suspense } from 'react'

interface SummaryContainerProps {
  open: boolean
  setOpen: (bool: boolean) => void
  children: React.ReactNode
  dackLink?: string
  title: string,
  className?: string,
}

function SummaryContainer({
  open,
  setOpen,
  children,
  dackLink,
  title,
  className
}: SummaryContainerProps) {
  return (
    <div className="flex gap-2 flex-col w-full">
      <div className="flex gap-2  justify-between items-center h-10 rounded-md px-4 py-5">
        <h4>
          <a href={dackLink} target="_blank">
            {title}
          </a>
        </h4>
        <button onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </button>
      </div>
      {open && (
        <Suspense fallback={<>Loading...</>}>
          {children ? <div className={className}>{children}</div> : 'Loading...'}
        </Suspense>
      )}
    </div>
  )
}

export default SummaryContainer
