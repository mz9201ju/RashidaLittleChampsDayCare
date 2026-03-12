import { PAGE_CONTENT } from '../data/siteContent'

export default function ServicesPage() {
  const content = PAGE_CONTENT.services

  return (
    <section className="page-panel">
      <h1 className="sun-title">{content.title}</h1>
      <p className="lead">{content.intro}</p>
      <ul className="bullet-list">
        {content.bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
