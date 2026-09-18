import { Link, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import CafesPage from './pages/CafesPage';
import AddCafePage from './pages/AddCafePage';
import EditCafePage from './pages/EditCafePage';

// Website routes:
//   /            -> Home (hero, stats, top picks)
//   /explore     -> Explore (search, filters, vibe finder, detail view)
//   /dashboard   -> CRUD dashboard (existing table + modal, unchanged)
//   /add         -> add-cafe form page (unchanged)
//   /edit/:id    -> edit-cafe form page (unchanged)
// Home + Explore render inside SiteLayout (navbar/footer).
// CRUD pages render outside it so their UI stays exactly as-is.
export default function App() {
  return (
    <main className="container">
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
        </Route>
        <Route path="/dashboard" element={<CafesPage />} />
        <Route path="/add" element={<AddCafePage />} />
        <Route path="/edit/:id" element={<EditCafePage />} />
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
  );
}
