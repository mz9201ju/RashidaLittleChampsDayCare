import { PAGE_CONTENT } from '../data/siteContent'

export default function AboutPage() {
  const content = PAGE_CONTENT.about

  return (
    <section className="page-panel">
      <h1 className="sun-title">{content.title}</h1>
      {content.intro.split('\n\n').map((para, idx) => (
        <p className="lead" key={idx}>{para}</p>
      ))}
      <ul className="bullet-list">
        {content.bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
