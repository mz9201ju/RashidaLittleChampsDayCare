import { PAGE_CONTENT } from '../data/siteContent'

export default function FaqPage() {
  const content = PAGE_CONTENT.faq

  return (
    <section className="page-panel">
      <h1>{content.title}</h1>
      <div className="faq-list">
        {content.items.map((item) => (
          <article key={item.q} className="faq-item">
            <h2>{item.q}</h2>
            <p>{item.a}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
