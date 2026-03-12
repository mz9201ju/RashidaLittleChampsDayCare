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
        {content.bullets.map((item) => {
          if (typeof item === 'string') {
            return <li key={item}>{item}</li>;
          }
          // Handle bullet object with label and points
          return (
            <li key={item.label}>
              {item.label}
              {Array.isArray(item.points) && (
                <ul className="bullet-list" style={{ marginTop: '8px', marginBottom: '8px' }}>
                  {item.points.map((point, pidx) => {
                    // Split name and description by the first dash
                    const dashIdx = point.indexOf('–');
                    let name = '', desc = point;
                    if (dashIdx > -1) {
                      name = point.slice(0, dashIdx + 1).trim();
                      desc = point.slice(dashIdx + 1).trim();
                    }
                    return (
                      <li key={pidx} style={{ fontSize: '1rem', color: '#76573b' }}>
                        {name && <span style={{ color: '#de9311', fontWeight: 700 }}>{name} </span>}
                        {desc}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  )
}
