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
            return (
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src="/gallery/bullet-icon.png" alt="Bullet" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                <span>{item}</span>
              </li>
            );
          }
          // Handle bullet object with label and points
          return (
            <li key={item.label}>
              {item.label}
              {Array.isArray(item.points) && (
                <ul className="bullet-list" style={{ marginTop: '8px', marginBottom: '8px' }}>
                  {item.points.map((point, pidx) => {
                    // Support point as object or string
                    let pointText = point;
                    let pointImage = '/gallery/bullet-icon.png';
                    if (typeof point === 'object' && point !== null) {
                      pointText = point.text || '';
                      pointImage = point.image || '/gallery/bullet-icon.png';
                    }
                    // Split name and description by the first dash
                    const dashIdx = typeof pointText === 'string' ? pointText.indexOf('–') : -1;
                    let name = '', desc = pointText;
                    if (dashIdx > -1) {
                      name = pointText.slice(0, dashIdx + 1).trim();
                      desc = pointText.slice(dashIdx + 1).trim();
                    }
                    return (
                      <li key={pidx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1rem', color: '#76573b' }}>
                        <img src={pointImage} alt="Bullet" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                        <span>
                          {name && <span style={{ color: '#de9311', fontWeight: 700 }}>{name} </span>}
                          {desc}
                        </span>
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
