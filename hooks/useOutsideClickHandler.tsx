import { RefObject, useEffect } from 'react'

const useOutsideClickHandler = (
  ref: RefObject<HTMLElement>,
  callBack?: (event?: Event) => void,
): void => {
  useEffect(() => {
    const handleClickOutside = (event: Event): void => {
      // console.log("Handle Click", ref.current);
      if (ref.current === null || ref.current.contains(event.target as Node)) {
        return
      }
      callBack?.(event)
    }
    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callBack])
}

export default useOutsideClickHandler
