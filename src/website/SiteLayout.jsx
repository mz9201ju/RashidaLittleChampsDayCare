import { NavLink, Outlet } from 'react-router-dom'
import { NAV_LINKS } from './data/siteContent'

export default function SiteLayout() {
  return (
    <div className="site-shell">
      <div className="site-background" aria-hidden="true">
        <div className="scene-motion">
          <div className="bg-gradient" />
          <div className="bg-rainbow">
            <span className="rainbow-band band-1" />
            <span className="rainbow-band band-2" />
            <span className="rainbow-band band-3" />
            <span className="rainbow-band band-4" />
            <span className="rainbow-band band-5" />
            <span className="rainbow-band band-6" />
          </div>
          <div className="bg-sun">
            <span className="sun-ring sun-ring-1" />
            <span className="sun-ring sun-ring-2" />
            <span className="sun-ring sun-ring-3" />
          </div>
          <div className="bg-cloud cloud-one" />
          <div className="bg-cloud cloud-two" />
          <div className="bg-cloud cloud-three" />
          <span className="bg-bird bird-1" />
          <span className="bg-bird bird-2" />
          <span className="bg-bird bird-3" />
          <span className="bg-bird bird-4" />
          <div className="bg-balloon balloon-1" />
          <div className="bg-balloon balloon-2" />
          <div className="bg-balloon balloon-3" />
          <div className="bg-animal bunny-left">
            <span className="animal-ear ear-left" />
            <span className="animal-ear ear-right" />
            <span className="animal-tail" />
          </div>
          <div className="bg-animal fox-right">
            <span className="animal-ear ear-left" />
            <span className="animal-ear ear-right" />
            <span className="animal-tail" />
          </div>
          <div className="bg-animal turtle-mid">
            <span className="animal-shell" />
            <span className="animal-head" />
          </div>
        </div>
        <div className="bg-wave" />
        <div className="bg-tree tree-left">
          <span className="tree-trunk" />
          <span className="tree-canopy" />
        </div>
        <div className="bg-tree tree-mid">
          <span className="tree-trunk" />
          <span className="tree-canopy" />
        </div>
        <div className="bg-tree tree-right">
          <span className="tree-trunk" />
          <span className="tree-canopy" />
        </div>
      </div>

      <header className="site-header">
        <div className="brand">Little Champs</div>
        <nav className="site-nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">Rashida Little Champs Daycare</footer>
    </div>
  )
}
