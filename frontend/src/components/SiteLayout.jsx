import { Link, NavLink, Outlet } from 'react-router-dom';
import '../site.css';

// Wrapper ONLY for the new website pages (Home, Explore).
// Dashboard (/dashboard), Add (/add) and Edit (/edit/:id) render
// outside this layout so the existing CRUD UI stays exactly as-is.
export default function SiteLayout() {
  const linkClass = ({ isActive }) => (isActive ? 'site-link active' : 'site-link');
  return (
    <div className="site">
      <nav className="site-nav">
        <Link to="/" className="site-logo">
          ☕ Cafe <span>Experience</span>
        </Link>
        <div className="site-links">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/explore" className={linkClass}>Explore</NavLink>
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        </div>
        <Link to="/add" className="site-cta">+ Add Cafe</Link>
      </nav>

      <Outlet />

      <footer className="site-footer">
        <span>☕ Cafe Experience — find your perfect work & chill spot.</span>
        <span>
          <Link to="/explore">Explore</Link> · <Link to="/dashboard">Manage cafes</Link>
        </span>
      </footer>
    </div>
  );
}
