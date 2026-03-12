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
                {content.rates.map((rate, idx) => (
                  <li key={rate.label} className="rate-item" style={{ display: 'flex', alignItems: 'center', gap: '0.7em', padding: '1em 1.2em', borderLeft: '4px solid #ffb32f', background: '#fffbe9', borderRadius: '8px', marginBottom: '0.5em', boxShadow: '0 1px 4px rgba(255, 179, 47, 0.07)' }}>
                    <span style={{ fontSize: '1.3em', color: '#de9311', marginRight: '0.4em', fontWeight: 700 }}>
                      {idx === 0 && '🌞'}
                      {idx === 1 && '⏰'}
                      {idx === 2 && '🕒'}
                      {idx === 3 && '💸'}
                    </span>
                    <span style={{ color: '#ffb32f', fontWeight: 700, fontSize: '1.08em', minWidth: '120px', display: 'inline-block' }}>{rate.label}:</span>
                    <span style={{ color: '#76573b', fontSize: '1em' }}>{rate.detail}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
    </section>
  )
}
