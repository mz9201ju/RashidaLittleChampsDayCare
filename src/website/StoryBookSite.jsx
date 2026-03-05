import { useCallback, useRef } from 'react'
import Book from './Book'
import ToyLayer from './ToyLayer'

export default function StoryBookSite() {
    const rafRef = useRef(null)

    const handleParallax = useCallback((e) => {
        if (rafRef.current) return
        rafRef.current = requestAnimationFrame(() => {
            const px = (e.clientX / window.innerWidth - 0.5) * 2
            const py = (e.clientY / window.innerHeight - 0.5) * 2
            document.documentElement.style.setProperty('--parallax-x', `${(px * 10).toFixed(2)}px`)
            document.documentElement.style.setProperty('--parallax-y', `${(py * 5).toFixed(2)}px`)
            rafRef.current = null
        })
    }, [])

    return (
        <main className="storybook-scene" onMouseMove={handleParallax}>
            <ToyLayer />
            <section className="storybook-content">
                <Book />
            </section>
        </main>
    )
}
