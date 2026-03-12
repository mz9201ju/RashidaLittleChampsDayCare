import { useEffect, useState } from 'react'
import { PAGE_CONTENT } from '../data/siteContent'

const GALLERY_WIDTHS = [480, 900, 1280]

function buildPublicPath(fileName) {
  return `${import.meta.env.BASE_URL}${fileName}`
}

function buildSrcSet(id, extension) {
  return GALLERY_WIDTHS.map((width) => `${buildPublicPath(`gallery/${id}-${width}.${extension}`)} ${width}w`).join(', ')
}

function getNextIndex(currentIndex, delta, count) {
  return (currentIndex + delta + count) % count
}

export default function GalleryPage() {
  const content = PAGE_CONTENT.gallery
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    if (activeIndex === null) {
      return undefined
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setActiveIndex(null)
        return
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => getNextIndex(current, 1, content.items.length))
        return
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => getNextIndex(current, -1, content.items.length))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, content.items.length])

  const activeItem = activeIndex === null ? null : content.items[activeIndex]

  return (
    <section className="page-panel">
      <h1 className="sun-title">{content.title}</h1>
      <p className="lead">{content.intro}</p>
      <div className="gallery-grid">
        {content.items.map((item, index) => (
          <article className="gallery-item" key={item.id}>
            <button
              type="button"
              className="gallery-thumb"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open image ${index + 1}`}
            >
              <picture>
                <source type="image/webp" srcSet={buildSrcSet(item.id, 'webp')} sizes="(max-width: 768px) 90vw, (max-width: 1200px) 44vw, 360px" />
                <img
                  src={buildPublicPath(`gallery/${item.id}-900.jpg`)}
                  srcSet={buildSrcSet(item.id, 'jpg')}
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 44vw, 360px"
                  alt={item.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  decoding="async"
                  width="900"
                  height="676"
                />
              </picture>
            </button>
          </article>
        ))}
      </div>

      {activeItem ? (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={() => setActiveIndex(null)}>
          <div className="gallery-lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="gallery-arrow gallery-arrow-left"
              onClick={() => setActiveIndex((current) => getNextIndex(current, -1, content.items.length))}
              aria-label="Previous image"
            >
              &#8592;
            </button>
            <picture>
              <source type="image/webp" srcSet={buildSrcSet(activeItem.id, 'webp')} sizes="90vw" />
              <img
                className="gallery-lightbox-image"
                src={buildPublicPath(`gallery/${activeItem.id}-1280.jpg`)}
                srcSet={buildSrcSet(activeItem.id, 'jpg')}
                sizes="90vw"
                alt={activeItem.alt}
                decoding="async"
                width="1280"
                height="960"
              />
            </picture>
            <button
              type="button"
              className="gallery-arrow gallery-arrow-right"
              onClick={() => setActiveIndex((current) => getNextIndex(current, 1, content.items.length))}
              aria-label="Next image"
            >
              &#8594;
            </button>
            <button
              type="button"
              className="gallery-close"
              onClick={() => setActiveIndex(null)}
              aria-label="Close image viewer"
            >
              x
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
