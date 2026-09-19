import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
import '../site.css';

// Wrapper ONLY for the new website pages (Home, Explore, Login, Register).
// Dashboard (/dashboard), Add (/add) and Edit (/edit/:id) render
// outside this layout so the existing CRUD UI stays exactly as-is.
export default function SiteLayout() {
  const linkClass = ({ isActive }) => (isActive ? 'site-link active' : 'site-link');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
        {user ? (
          <>
            <span className="site-user">Hi, {user.name}</span>
            <button type="button" className="site-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <div className="site-nav-actions">
            <Link to="/add" className="site-cta">+ Add Cafe</Link>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'site-link active' : 'site-link')}>Login</NavLink>
          </div>
        )}
      </nav>

      <Outlet />

      <footer className="site-footer">
        <div className="site-foot-grid">
          <div className="site-foot-col">
            <p className="site-foot-brand">☕ Cafe <span>Experience</span></p>
            <p>Find your perfect work &amp; chill spot. Every visit rated, every vibe captured — your personal cafe journal.</p>
          </div>
          <div className="site-foot-col">
            <b>Discover</b>
            <Link to="/">Home</Link>
            <Link to="/explore">Explore cafes</Link>
            <Link to="/add">+ Add a cafe</Link>
          </div>
          <div className="site-foot-col">
            <b>Manage</b>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/explore">Find my vibe</Link>
          </div>
        </div>
        <div className="site-foot-bottom">
          <span>Made with ☕ for cafe lovers.</span>
          <span><Link to="/dashboard">Manage cafes</Link></span>
        </div>
      </footer>
    </div>
  );
}
