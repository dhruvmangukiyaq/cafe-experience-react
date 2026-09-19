import { Link, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth';
import SiteLayout from './components/SiteLayout';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CafesPage from './pages/CafesPage';
import AddCafePage from './pages/AddCafePage';
import EditCafePage from './pages/EditCafePage';

// Blocks logged-out visitors from CRUD pages — sends them to /login
// and remembers where they came from so login redirects them back.
function RequireAuth({ children }) {
  const { user, authLoading } = useAuth();
  const location = useLocation();
  if (authLoading) return <p className="auth-loading">Checking session…</p>;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
}

// Website routes:
//   / , /explore , /login , /register  -> public site (navbar/footer)
//   /dashboard , /add , /edit/:id      -> login required (existing CRUD, unchanged)
// Home + Explore + auth pages render inside SiteLayout (navbar/footer).
// CRUD pages render outside it so their UI stays exactly as-is.
export default function App() {
  return (
    <AuthProvider>
      <main className="container">
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route path="/dashboard" element={<RequireAuth><CafesPage /></RequireAuth>} />
          <Route path="/add" element={<RequireAuth><AddCafePage /></RequireAuth>} />
          <Route path="/edit/:id" element={<RequireAuth><EditCafePage /></RequireAuth>} />
          <Route
            path="*"
            element={
              <p>
                Page not found. <Link to="/">Back to home</Link>
              </p>
            }
          />
        </Routes>
      </main>
    </AuthProvider>
  );
}
