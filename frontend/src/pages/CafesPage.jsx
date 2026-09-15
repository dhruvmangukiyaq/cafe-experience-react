import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCafes, deleteCafe } from '../api';
import CafeList from '../components/CafeList';

// Page 1 — Listing: shows all cafes + "Add Cafe" button.
// This is the first page that opens (route: /).
export default function CafesPage() {
  // All cafes shown in the list
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState(''); // success/error message
  const navigate = useNavigate();

  // Fetch all cafes from GET /api/cafes
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCafes();
      setCafes(data);
    } catch (err) {
      setBanner(`Failed to load cafes: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load once on mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await deleteCafe(id);
      setBanner('Cafe deleted.');
      refresh();
    } catch (err) {
      setBanner(`Delete failed: ${err.message}`);
    }
  };

  return (
    <>
      {banner && <p className="banner">{banner}</p>}

      <div className="page-head">
        <h2>All Cafes</h2>
        {/* Button -> opens the Add form on its own page (/add) */}
        <Link to="/add">
          <button>+ Add Cafe</button>
        </Link>
      </div>

      <CafeList
        cafes={cafes}
        loading={loading}
        // Edit button -> opens the Edit form on its own page (/edit/:id)
        onEdit={(cafe) => navigate(`/edit/${cafe._id}`)}
        onDelete={handleDelete}
      />
    </>
  );
}
