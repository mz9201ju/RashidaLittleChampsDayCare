import { PAGE_CONTENT } from '../data/siteContent'

export default function ContactPage() {
  const content = PAGE_CONTENT.contact

  return (
    <section className="page-panel">
      <h1>{content.title}</h1>
      <p className="lead">{content.intro}</p>
      <div className="contact-grid">
        {content.info.map((entry) => (
          <div key={entry.label} className="contact-item">
            <h2>{entry.label}</h2>
            <p>{entry.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
