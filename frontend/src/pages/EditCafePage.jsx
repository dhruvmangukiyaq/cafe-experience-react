import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCafe, updateCafe } from '../api';
import CafeForm from '../components/CafeForm';

export default function EditCafePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cafe, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState('');

  useEffect(() => {
    getCafe(id)
      .then((data) => setCafe(data))
      .catch((err) => setBanner(`Could not load cafe: ${err.message}`))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateCafe(id, formData);
      navigate('/');
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
      <div className="page-center">
        <div className="modal" style={{ boxShadow: '0 2px 10px rgba(0,0,0,.08)' }}>
          <CafeForm
            key={cafe._id}
            initialValues={cafe}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/')}
            title="Edit Cafe"
            submitLabel="Save changes"
          />
        </div>
      </div>
    </>
  );
}
