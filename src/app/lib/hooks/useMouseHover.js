import { useState } from 'react'

export default function useMouseHover() {
  const [isUserHovered, setIsUserHovered] = useState(false)
  let onHoverTimeout
  let onHoverOutTimeout

  function handleMouseEnter() {
    onHoverOutTimeout = setTimeout(() => {
      setIsUserHovered(true)
    }, 400)
    clearTimeout(onHoverTimeout)
  }

  function handleMouseLeave() {
    clearTimeout(onHoverOutTimeout)
    onHoverTimeout = setTimeout(() => {
      setIsUserHovered(false)
    }, 400)
  }

  return {
    isUserHovered,
    handleMouseEnter,
    handleMouseLeave,
  }
}
