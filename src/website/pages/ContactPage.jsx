import { PAGE_CONTENT } from '../data/siteContent'

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

export default function ContactPage() {
  const content = PAGE_CONTENT.contact
  const entries = getEntryMap(content.info)
  const phone = entries.Phone
  const email = entries.Email
  const hours = entries.Hours
  const address = entries.Address
  const google = entries.Google
  const yelp = entries.Yelp

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
          {renderValue(hours)}
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
                className="contact-platform-icon"
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
                className="contact-platform-icon"
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
