import { useEffect, useMemo, useState } from 'react'

function getBookSize() {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  const spreadWidth = Math.min(1100, Math.floor(viewportWidth * 0.92))
  const maxHeight = Math.min(760, Math.floor(viewportHeight * 0.8))

  let width = Math.floor(spreadWidth / 2)
  let height = maxHeight

  const pageAspect = 0.72
  if (width / height > pageAspect) {
    width = Math.floor(height * pageAspect)
  } else {
    height = Math.floor(width / pageAspect)
  }

  width = Math.max(240, Math.min(520, width))
  height = Math.max(320, Math.min(760, height))

  return { width, height }
}

export function useBookSize(bookRef) {
  const [size, setSize] = useState(getBookSize)

  useEffect(() => {
    const handleResize = () => {
      setSize(getBookSize())
      bookRef.current?.pageFlip().update()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [bookRef])

  return useMemo(() => size, [size])
}
