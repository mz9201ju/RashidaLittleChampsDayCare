import { PAGE_CONTENT } from '../data/siteContent'

export default function ServicesPage() {
  const content = PAGE_CONTENT.services

  return (
    <section className="page-panel">
      <h1 className="sun-title">{content.title}</h1>
      <div className="service-list">
        {content.items && content.items.map((item) => (
          <article key={item.q} className="service-item">
            <h2>{item.q}</h2>
            <p>{item.a.split('\n').map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < item.a.split('\n').length - 1 ? <br /> : null}
              </span>
            ))}</p>
          </article>
        ))}
      </div>
        {content.rates && (
          <div className="rates-panel">
            <section className="rates-section">
              <h2 className="rates-title">Rates & Pricing</h2>
              <ul className="rates-list">
                {content.rates.map((rate) => (
                  <li key={rate.label} className="rate-item">
                    <strong>{rate.label}:</strong> {rate.detail}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
    </section>
  )
}
