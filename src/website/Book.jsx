import { useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { gsap } from 'gsap'
import { BOOK_PAGES } from './data/storyPages'
import { useBookSize } from './hooks/useBookSize'
import { usePageSound } from './hooks/usePageSound'

const BASE_FLIP_CONFIG = {
    size: 'fixed',
    drawShadow: true,
    flippingTime: 900,
    showCover: true,
    startPage: 0,
    startZIndex: 10,
    mobileScrollSupport: false,
    useMouseEvents: true,
    useTouchEvents: true,
    clickEventForward: false,
    swipeDistance: 15,
    showPageCorners: true,
    disableFlipByClick: false,
}

function renderPageContent(page) {
    if (page.listItems) {
        return (
            <ul className="storybook-list">
                {page.listItems.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        )
    }

    if (page.paragraphs) {
        return page.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
    }

    return null
}

export default function Book() {
    const bookRef = useRef(null)
    const shellRef = useRef(null)
    const touchRafRef = useRef(null)
    const shellRectRef = useRef(null)
    const [currentPage, setCurrentPage] = useState(0)
    const size = useBookSize(bookRef)
    const isMobile = size.isMobile
    const { playFlip } = usePageSound()

    const flipConfig = {
        ...BASE_FLIP_CONFIG,
        minWidth: isMobile ? 180 : 280,
        maxWidth: isMobile ? 360 : 640,
        minHeight: isMobile ? 260 : 360,
        maxHeight: isMobile ? 560 : 860,
        usePortrait: isMobile,
    }

    // GSAP entrance animation
    useEffect(() => {
        if (!shellRef.current) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        gsap.fromTo(
            shellRef.current,
            { opacity: 0, y: 50, scale: 0.92, rotateX: 8 },
            { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.85, ease: 'back.out(1.4)', delay: 0.1 }
        )
    }, [])

    const nextPage = () => bookRef.current?.pageFlip().flipNext()
    const previousPage = () => bookRef.current?.pageFlip().flipPrev()

    const handleMouseMove = (event) => {
        const element = event.currentTarget
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const rotateY = ((event.clientX - centerX) / rect.width) * 8
        const rotateX = ((centerY - event.clientY) / rect.height) * 5

        element.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`)
        element.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`)
    }

    const resetTilt = (event) => {
        event.currentTarget.style.setProperty('--tilt-x', '0deg')
        event.currentTarget.style.setProperty('--tilt-y', '0deg')
    }

    const handleTouchMove = (event) => {
        if (touchRafRef.current) return
        const touch = event.touches[0]
        if (!touch || !shellRef.current) return
        touchRafRef.current = requestAnimationFrame(() => {
            const rect = shellRectRef.current || shellRef.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const rotateY = ((touch.clientX - centerX) / rect.width) * 6
            const rotateX = ((centerY - touch.clientY) / rect.height) * 4
            shellRef.current.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`)
            shellRef.current.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`)
            touchRafRef.current = null
        })
    }

    const resetTouchTilt = () => {
        if (!shellRef.current) return
        shellRectRef.current = null
        shellRef.current.style.setProperty('--tilt-x', '0deg')
        shellRef.current.style.setProperty('--tilt-y', '0deg')
    }

    const handleFlip = (event) => {
        const pageIndex = typeof event?.data === 'number' ? event.data : 0
        setCurrentPage(pageIndex)
        playFlip()
        if (navigator.vibrate) navigator.vibrate(30)
    }

    const handleTouchStart = () => {
        if (shellRef.current) {
            shellRectRef.current = shellRef.current.getBoundingClientRect()
        }
    }

    const shellClasses = [
        'book-shell',
        currentPage === 0 ? 'at-start' : '',
        currentPage === BOOK_PAGES.length - 1 ? 'at-end' : '',
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <div
            ref={shellRef}
            className={shellClasses}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={resetTouchTilt}
        >
            <HTMLFlipBook
                ref={bookRef}
                width={size.width}
                height={size.height}
                className="daycare-book"
                onInit={handleFlip}
                onFlip={handleFlip}
                {...flipConfig}
            >
                {BOOK_PAGES.map((page) => (
                    <article key={page.id} className={`book-page ${page.variant}`}>
                        <div className="book-page-content">
                            <h2>{page.title}</h2>
                            {renderPageContent(page)}
                            {page.hint && <p className="book-page-hint">{page.hint}</p>}
                        </div>
                    </article>
                ))}
            </HTMLFlipBook>

            <button className="nav-arrow left" onClick={previousPage} type="button" aria-label="Previous page">
                ‹
            </button>
            <button className="nav-arrow right" onClick={nextPage} type="button" aria-label="Next page">
                ›
            </button>
        </div>
    )
}
