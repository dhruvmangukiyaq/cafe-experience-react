import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createCafe } from '../api';
import CafeForm from '../components/CafeForm';

export default function AddCafePage() {
  const navigate = useNavigate();
  const [banner, setBanner] = useState('');

  const handleSubmit = async (formData) => {
    try {
      await createCafe(formData);
      navigate('/');
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
      <div className="page-center">
        <div className="modal" style={{ boxShadow: '0 2px 10px rgba(0,0,0,.08)' }}>
          <CafeForm
            initialValues={null}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/')}
            title="Add New Cafe"
            submitLabel="Create Cafe"
          />
        </div>
      </div>
    </>
  );
}
