import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCafe, uploadFiles } from '../api';
import CafeForm from '../components/CafeForm';
import BackButton from '../components/BackButton';

export default function AddCafePage() {
  const navigate = useNavigate();
  const [banner, setBanner] = useState('');

  const handleSubmit = async (formData, pendingFiles = []) => {
    try {
      const cafe = await createCafe(formData);
      if (pendingFiles.length) {
        try {
          await uploadFiles(cafe._id, pendingFiles);
        } catch {
          // Cafe is saved; jump to its Edit page where files upload live,
          // so retrying never creates a duplicate cafe.
          navigate(`/edit/${cafe._id}`);
          return;
        }
      }
      navigate('/'); // back to listing — the new cafe shows there
    } catch (err) {
      setBanner(`Save failed: ${err.message}`);
    }
  };

  return (
    <>
      {banner && <p className="banner">{banner}</p>}
      <div className="back-btn-row">
        <BackButton to="/" />
      </div>
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
