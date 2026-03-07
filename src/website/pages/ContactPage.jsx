import { PAGE_CONTENT } from '../data/siteContent'
import { useEffect, useMemo, useState } from 'react'

const REVIEW_AUTOPLAY_MS = 5500

function isWebLink(href) {
  return href.startsWith('http://') || href.startsWith('https://')
}

function getEntryMap(entries) {
  return entries.reduce((result, entry) => {
    result[entry.label] = entry
    return result
  }, {})
}

function buildMapEmbedUrl(address) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`
}

function normalizeSource(source) {
  return String(source || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function renderValue(entry) {
  if (!entry) {
    return null
  }

  if (!entry.href) {
    return <p>{entry.value}</p>
  }

  return (
    <p>
      <a
        href={entry.href}
        target={isWebLink(entry.href) ? '_blank' : undefined}
        rel={isWebLink(entry.href) ? 'noopener noreferrer' : undefined}
      >
        {entry.value}
      </a>
    </p>
  )
}

function renderHours(entry) {
  if (!entry) {
    return null
  }

  const details = Array.isArray(entry.details) ? entry.details : []

  return (
    <div className="contact-hours" aria-label="Daycare hours">
      {details.length ? (
        <ul className="contact-hours-list">
          {details.map((item) => {
            const isClosed = String(item.time || '').toLowerCase() === 'closed'

            return (
              <li key={`${item.days}-${item.time}`} className="contact-hours-row">
                <span className="contact-hours-days">{item.days}</span>
                <span className={`contact-hours-time${isClosed ? ' is-closed' : ''}`}>{item.time}</span>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default function ContactPage() {
  const content = PAGE_CONTENT.contact
  const entries = getEntryMap(content.info)
  const phone = entries.Phone
  const email = entries.Email
  const hours = entries.Hours
  const address = entries.Address
  const google = entries.Google
  const yelp = entries.Yelp
  const reviews = useMemo(() => content.reviews || [], [content.reviews])
  const [activeReview, setActiveReview] = useState(0)
  const [isInteractionPaused, setIsInteractionPaused] = useState(false)

  useEffect(() => {
    if (reviews.length < 2 || isInteractionPaused) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setActiveReview((index) => (index + 1) % reviews.length)
    }, REVIEW_AUTOPLAY_MS)

    return () => window.clearInterval(intervalId)
  }, [isInteractionPaused, reviews.length])

  useEffect(() => {
    if (!reviews.length) {
      setActiveReview(0)
      return
    }

    if (activeReview >= reviews.length) {
      setActiveReview(0)
    }
  }, [activeReview, reviews.length])

  const canSlideReviews = reviews.length > 1

  function goToReview(index) {
    if (!canSlideReviews) {
      return
    }

    const nextIndex = (index + reviews.length) % reviews.length
    setActiveReview(nextIndex)
  }

  function handleSliderBlur(event) {
    if (event.currentTarget.contains(event.relatedTarget)) {
      return
    }

    setIsInteractionPaused(false)
  }

  return (
    <section className="page-panel">
      <h1>{content.title}</h1>
      <p className="lead">{content.intro}</p>

      <div className="contact-grid">
        <article className="contact-item contact-item-primary">
          <h2>Phone</h2>
          {renderValue(phone)}
          <h2>Email</h2>
          {renderValue(email)}
          <h2>Hours</h2>
          {renderHours(hours)}
        </article>

        <article className="contact-item contact-item-map">
          <h2>Address</h2>
          {renderValue(address)}
        </article>

        <article className="contact-item contact-item-yelp">
          <h2>Reviews & Listings</h2>
          <div className="contact-platform-icons">
            {google ? (
              <a
                className="contact-platform-icon contact-platform-icon-google"
                href={google.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={google.value}
                title={google.value}
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" width="24" height="24" loading="lazy" decoding="async" />
              </a>
            ) : null}
            {yelp ? (
              <a
                className="contact-platform-icon contact-platform-icon-yelp"
                href={yelp.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={yelp.value}
                title={yelp.value}
              >
                <img src="https://www.yelp.com/favicon.ico" alt="Yelp" width="24" height="24" loading="lazy" decoding="async" />
              </a>
            ) : null}
          </div>

          {reviews.length ? (
            <div
              className="contact-review-slider"
              role="region"
              aria-label="Parent reviews"
              onMouseEnter={() => setIsInteractionPaused(true)}
              onMouseLeave={() => setIsInteractionPaused(false)}
              onFocus={() => setIsInteractionPaused(true)}
              onBlur={handleSliderBlur}
              onTouchStart={() => setIsInteractionPaused(true)}
              onTouchEnd={() => setIsInteractionPaused(false)}
              onTouchCancel={() => setIsInteractionPaused(false)}
            >
              <div className="contact-review-viewport">
                <div
                  className="contact-review-track"
                  style={{ transform: `translateX(-${activeReview * 100}%)` }}
                >
                  {reviews.map((review, index) => (
                    <article
                      key={`${review.author}-${index}`}
                      className="contact-review-card"
                      data-source={normalizeSource(review.source)}
                      aria-hidden={index !== activeReview}
                    >
                      <p className="contact-review-quote">"{review.quote}"</p>
                      <p className="contact-review-meta">
                        <strong>{review.author}</strong>
                        <span data-source={normalizeSource(review.source)}>{review.source}</span>
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              {canSlideReviews ? (
                <div className="contact-review-controls">
                  <button
                    type="button"
                    className="contact-review-arrow"
                    aria-label="Previous review"
                    onClick={() => goToReview(activeReview - 1)}
                  >
                    {'<'}
                  </button>

                  <div className="contact-review-dots" role="tablist" aria-label="Review slides">
                    {reviews.map((review, index) => (
                      <button
                        key={`${review.source}-${index}`}
                        type="button"
                        className={`contact-review-dot${index === activeReview ? ' is-active' : ''}`}
                        aria-label={`Show review ${index + 1}`}
                        aria-selected={index === activeReview}
                        role="tab"
                        onClick={() => goToReview(index)}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    className="contact-review-arrow"
                    aria-label="Next review"
                    onClick={() => goToReview(activeReview + 1)}
                  >
                    {'>'}
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </article>
      </div>

      {address ? (
        <div className="contact-map-shell">
          <iframe
            title="Rashida Little Champs Daycare Location"
            src={buildMapEmbedUrl(address.value)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      ) : null}
    </section>
  )
}
