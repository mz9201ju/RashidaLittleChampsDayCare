import { PAGE_CONTENT } from '../data/siteContent'

export default function HomePage() {
  const content = PAGE_CONTENT.home

  return (
    <section className="page-panel home-panel">
      <h1 className="sun-title">{content.title}</h1>
      <p className="lead">{content.intro}</p>
      <div className="card-grid">
        {content.cards.map((card) => (
          <article key={card.title} className="info-card">
            <h2>{card.title}</h2>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
