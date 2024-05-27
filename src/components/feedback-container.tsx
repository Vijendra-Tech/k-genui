import { useRef } from 'react'
import { IconClose } from './ui/icons'
import { useOutsideClick } from '../lib/hooks/use-outside-hook'

interface FeedabackConatainerProps {
  show: boolean
  setShow: (show: boolean) => void
  heading?: string
  children: React.ReactNode
  className?: string
}

function FeedabackConatainer({
  show,
  setShow,
  heading,
  children,
  className
}: FeedabackConatainerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, () => setShow(false), show)
  return (
    <>
      {show && (
        <>
          {/* {createPortal( */}
          <div
            className="absolute bg-white flex flex-col gap-2 py-5 px-5 z-[1000] w-72 h-72 top-0 left-2"
            ref={ref}
          >
            <div className="flex gap-2 justify-between">
              <h2>{heading}</h2>
              <IconClose
                onClick={() => setShow(false)}
                className="cursor-pointer"
              />
            </div>
            <div className={className}>{children}</div>
          </div>
          {/* document.body
          )} */}
        </>
      )}
    </>
  )
}

export default FeedabackConatainer
