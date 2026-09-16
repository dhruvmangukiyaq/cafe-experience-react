import { Link, Route, Routes } from 'react-router-dom';
import CafesPage from './pages/CafesPage';
import AddCafePage from './pages/AddCafePage';
import EditCafePage from './pages/EditCafePage';

// App shell: page routing.
//   /          -> listing + stats + table + Add/Edit modal
//   /add       -> add-cafe form page (same form, centered)
//   /edit/:id  -> edit-cafe form page (same form, centered)
export default function App() {
  return (
    <main className="container">
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
