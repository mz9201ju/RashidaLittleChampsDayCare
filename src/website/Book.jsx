import { useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { BOOK_PAGES } from './data/storyPages'
import { useBookSize } from './hooks/useBookSize'
import { usePageSound } from './hooks/usePageSound'

const BASE_FLIP_CONFIG = {
    size: 'fixed',
    drawShadow: true,
    flippingTime: 900,
    showCover: false,
    startPage: 0,
    startZIndex: 10,
    mobileScrollSupport: false,
    useMouseEvents: true,
    useTouchEvents: true,
    clickEventForward: false,
    swipeDistance: 15,
    showPageCorners: true,
    disableFlipByClick: true,
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
    const size = useBookSize(bookRef)
    const isMobile = size.isMobile
    const { playFlip } = usePageSound()
    const [currentPage, setCurrentPage] = useState(0)

    const lastPageIndex = BOOK_PAGES.length - 1

    const flipConfig = {
        ...BASE_FLIP_CONFIG,
        minWidth: isMobile ? 180 : 280,
        maxWidth: isMobile ? 360 : 640,
        minHeight: isMobile ? 260 : 360,
        maxHeight: isMobile ? 560 : 860,
        usePortrait: isMobile,
    }

    useEffect(() => {
        // Reset any leftover cinematic vars from prior versions.
        const rootStyle = document.documentElement.style
        rootStyle.setProperty('--camera-zoom', '1')
        rootStyle.setProperty('--camera-y', '0px')
    }, [])

    const nextPage = () => {
        const pageFlip = bookRef.current?.pageFlip()
        if (!pageFlip) return

        const index = pageFlip.getCurrentPageIndex()
        if (index >= lastPageIndex) return

        if (isMobile) {
            pageFlip.turnToPage(index + 1)
            return
        }

        pageFlip.flipNext()
    }

    const previousPage = () => {
        const pageFlip = bookRef.current?.pageFlip()
        if (!pageFlip) return

        const index = pageFlip.getCurrentPageIndex()
        if (index <= 0) return

        if (isMobile) {
            pageFlip.turnToPage(index - 1)
            return
        }

        pageFlip.flipPrev()
    }

    const handleFlip = (event) => {
        const nextIndex = typeof event?.data === 'number' ? event.data : 0
        setCurrentPage(nextIndex)
        playFlip()
        if (navigator.vibrate) navigator.vibrate(30)
    }

    return (
        <div className="book-shell page-mode">
            <HTMLFlipBook
                ref={bookRef}
                width={size.width}
                height={size.height}
                className="daycare-book"
                onFlip={handleFlip}
                {...flipConfig}
            >
                {BOOK_PAGES.map((page) => {
                    const pageVariant = page.variant === 'cover-front' || page.variant === 'cover-back' ? 'inside-page' : page.variant
                    return (
                        <article key={page.id} className={`book-page ${pageVariant}`}>
                            <div className="book-page-content">
                                <h2>{page.title}</h2>
                                {renderPageContent(page)}
                                {page.hint && <p className="book-page-hint">{page.hint}</p>}
                            </div>
                        </article>
                    )
                })}
            </HTMLFlipBook>

            <button
                className="nav-arrow left"
                onClick={previousPage}
                type="button"
                aria-label="Previous page"
                disabled={currentPage <= 0}
            >
                ‹
            </button>
            <button
                className="nav-arrow right"
                onClick={nextPage}
                type="button"
                aria-label="Next page"
                disabled={currentPage >= lastPageIndex}
            >
                ›
            </button>
        </div>
    )
}
