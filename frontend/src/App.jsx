import { Link, Route, Routes } from 'react-router-dom';
import CafesPage from './pages/CafesPage';
import AddCafePage from './pages/AddCafePage';
import EditCafePage from './pages/EditCafePage';

// App shell: title + page routing.
//   /          -> listing page (opens first, has "+ Add Cafe" button)
//   /add       -> add-cafe form page
//   /edit/:id  -> edit-cafe form page
export default function App() {
  return (
    <main className="container">
      <h1>
        <Link to="/" className="title-link">
          Cafe Experience Tracker
        </Link>
      </h1>

      <Routes>
        <Route path="/" element={<CafesPage />} />
        <Route path="/add" element={<AddCafePage />} />
        <Route path="/edit/:id" element={<EditCafePage />} />
        <Route
          path="*"
          element={
            <p>
              Page not found. <Link to="/">Back to list</Link>
            </p>
          }
        />
      </Routes>
    </main>
  );
}
