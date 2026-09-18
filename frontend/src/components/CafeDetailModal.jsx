import { Link } from 'react-router-dom';
import { coverFor, ratingStars, wifiStars, wifiSpeedLabel } from '../site-helpers';

// Read-only detail modal. Editing still happens only via the
// existing CRUD routes (/dashboard, /edit/:id) — linked below.
export default function CafeDetailModal({ cafe, onClose }) {
  if (!cafe) return null;
  const env = cafe.environment || {};
  const rating = Number(cafe.rating ?? 0);
  const tags = cafe.ambienceTags || [];
  const specs = cafe.foodSpecialties || [];
  const initial = (cafe.name || '?').trim().charAt(0).toUpperCase();
  return (
    <div className="site-overlay" onClick={onClose}>
      <div className="site-modal" onClick={(e) => e.stopPropagation()}>
        <div className="site-modal-cover" style={{ background: coverFor(cafe.name) }}>
          <span>{initial}</span>
        </div>
        <div className="site-modal-body">
          <h2>{cafe.name}</h2>
          <p className="site-modal-loc">{cafe.city}{cafe.area ? ` • ${cafe.area}` : ''}</p>

          <div className="site-pills">
            {specs.map((s) => <span key={s} className="site-pill">{s}</span>)}
            {tags.map((t) => <span key={t} className="site-pill green">{t}</span>)}
            {!specs.length && !tags.length && <span className="site-card-loc">No tags yet</span>}
          </div>

          <div className="site-detail-row"><span>Rating</span><span className="site-rating">{ratingStars(rating)} {rating.toFixed(1)}</span></div>
          <div className="site-detail-row"><span>Price</span><span>{cafe.avgPricePerPerson != null ? `₹${cafe.avgPricePerPerson} / person` : '—'}</span></div>
          <div className="site-detail-row"><span>WiFi</span><span className="site-wifi">{wifiStars(cafe.wifiQuality)} · {wifiSpeedLabel(cafe)}</span></div>
          <div className="site-detail-row"><span>Noise</span><span>{env.noiseLevel || 'normal'}</span></div>
          <div className="site-detail-row"><span>Seating</span><span>{env.seatingType || 'mixed'}{env.hasAC ? ' • AC' : ''}{env.hasOutdoorSeating ? ' • outdoor' : ''}</span></div>
          <div className="site-detail-row"><span>Power plugs</span><span>{cafe.powerPlugsAvailable ? 'Available' : 'Not available'}</span></div>

          {cafe.notes && <p className="site-notes">“{cafe.notes}”</p>}

          <div className="site-modal-actions">
            <Link to={`/edit/${cafe._id}`} className="site-btn site-btn-gold site-btn-sm">Edit cafe</Link>
            <Link to="/dashboard" className="site-btn site-btn-ghost site-btn-sm">Manage in Dashboard</Link>
            <button className="site-close" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
