import { useRef } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { BOOK_PAGES } from './data/storyPages'
import { useBookSize } from './hooks/useBookSize'

const FLIP_CONFIG = {
    size: 'fixed',
    minWidth: 240,
    maxWidth: 520,
    minHeight: 320,
    maxHeight: 760,
    drawShadow: true,
    flippingTime: 1000,
    showCover: true,
    usePortrait: false,
    startPage: 0,
    startZIndex: 10,
    mobileScrollSupport: false,
    useMouseEvents: true,
    useTouchEvents: true,
    clickEventForward: false,
    swipeDistance: 20,
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
    const size = useBookSize(bookRef)

    const nextPage = () => bookRef.current?.pageFlip().flipNext()
    const previousPage = () => bookRef.current?.pageFlip().flipPrev()

    const handleMouseMove = (event) => {
        const element = event.currentTarget
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const rotateY = ((event.clientX - centerX) / rect.width) * 6
        const rotateX = ((centerY - event.clientY) / rect.height) * 4

        element.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`)
        element.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`)
    }

    const resetTilt = (event) => {
        event.currentTarget.style.setProperty('--tilt-x', '0deg')
        event.currentTarget.style.setProperty('--tilt-y', '0deg')
    }

    return (
        <div className="book-shell" onMouseMove={handleMouseMove} onMouseLeave={resetTilt}>
            <HTMLFlipBook
                ref={bookRef}
                width={size.width}
                height={size.height}
                className="daycare-book"
                {...FLIP_CONFIG}
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

            <div className="book-spine" aria-hidden="true" />

            <button className="nav-arrow left" onClick={previousPage} type="button" aria-label="Previous page">
                ‹
            </button>
            <button className="nav-arrow right" onClick={nextPage} type="button" aria-label="Next page">
                ›
            </button>
        </div>
    )
}
