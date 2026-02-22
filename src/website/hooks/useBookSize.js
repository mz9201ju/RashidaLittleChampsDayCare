import { useEffect, useMemo, useState } from 'react'

function getBookSize() {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const isMobile = viewportWidth <= 768

  if (isMobile) {
    let width = Math.floor(viewportWidth * 0.88)
    let height = Math.floor(viewportHeight * 0.7)

    const pageAspect = 0.72
    if (width / height > pageAspect) {
      width = Math.floor(height * pageAspect)
    } else {
      height = Math.floor(width / pageAspect)
    }

    width = Math.max(180, Math.min(360, width))
    height = Math.max(260, Math.min(560, height))

    return { width, height, isMobile }
  }

  const spreadWidth = Math.min(1320, Math.floor(viewportWidth * 0.96))
  const maxHeight = Math.min(860, Math.floor(viewportHeight * 0.86))

  let width = Math.floor(spreadWidth / 2)
  let height = maxHeight

  const pageAspect = 0.72
  if (width / height > pageAspect) {
    width = Math.floor(height * pageAspect)
  } else {
    height = Math.floor(width / pageAspect)
  }

  width = Math.max(280, Math.min(640, width))
  height = Math.max(360, Math.min(860, height))

  return { width, height, isMobile }
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
