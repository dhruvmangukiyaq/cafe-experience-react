import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createCafe } from '../api';
import CafeForm from '../components/CafeForm';

// Page 2 — Add: empty form on its own page (route: /add).
// After saving, goes back to the listing page (/).
export default function AddCafePage() {
  const navigate = useNavigate();
  const [banner, setBanner] = useState('');

  const handleSubmit = async (formData) => {
    try {
      await createCafe(formData);
      navigate('/'); // back to listing — the new cafe shows there
    } catch (err) {
      setBanner(`Save failed: ${err.message}`);
    }
  };

  return (
    <>
      {banner && <p className="banner">{banner}</p>}
      <Link to="/" className="back-link">
        ← Back to list
      </Link>
      <CafeForm initialValues={null} onSubmit={handleSubmit} onCancel={() => navigate('/')} />
    </>
  );
}
