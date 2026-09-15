import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCafe, updateCafe } from '../api';
import CafeForm from '../components/CafeForm';

// Page 3 — Edit: loads one cafe by id and shows the form (route: /edit/:id).
// After saving, goes back to the listing page (/).
export default function EditCafePage() {
  const { id } = useParams(); // id from the URL, e.g. /edit/abc123
  const navigate = useNavigate();
  const [cafe, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState('');

  // Load the cafe to edit when the page opens
  useEffect(() => {
    getCafe(id)
      .then((data) => setCafe(data))
      .catch((err) => setBanner(`Could not load cafe: ${err.message}`))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateCafe(id, formData);
      navigate('/'); // back to listing — the updated cafe shows there
    } catch (err) {
      setBanner(`Save failed: ${err.message}`);
    }
  };

  if (loading) return <p>Loading cafe…</p>;

  if (!cafe) {
    return (
      <>
        {banner && <p className="banner">{banner}</p>}
        <p>
          Cafe not found. <Link to="/">Back to list</Link>
        </p>
      </>
    );
  }

  return (
    <>
      {banner && <p className="banner">{banner}</p>}
      <Link to="/" className="back-link">
        ← Back to list
      </Link>
      {/* key={...} resets the form with this cafe's data */}
      <CafeForm key={cafe._id} initialValues={cafe} onSubmit={handleSubmit} onCancel={() => navigate('/')} />
    </>
  );
}
