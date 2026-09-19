import { useNavigate } from 'react-router-dom';

// Round ← icon button shown on every page except Home.
// Always goes to the home page (`to`), never anywhere else.
export default function BackButton({ to = '/', label = 'Back to home' }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="back-btn"
      onClick={() => navigate(to)}
      title={label}
      aria-label={label}
    >
      <span aria-hidden="true">←</span>
    </button>
  );
}
