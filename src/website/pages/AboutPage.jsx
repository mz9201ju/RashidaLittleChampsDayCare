import { PAGE_CONTENT } from '../data/siteContent'

export default function AboutPage() {
  const content = PAGE_CONTENT.about

  return (
    <section className="page-panel">
      <h1>{content.title}</h1>
      <p className="lead">{content.intro}</p>
      <ul className="bullet-list">
        {content.bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
