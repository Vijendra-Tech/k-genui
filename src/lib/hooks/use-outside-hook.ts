import { useEffect, MutableRefObject } from 'react'

export function useOutsideClick(
  ref: MutableRefObject<HTMLElement | null>,
  callback: () => void,
  bool:boolean
): void {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node) && !bool) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref, callback, bool])
}
