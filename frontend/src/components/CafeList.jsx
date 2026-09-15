// Pure presentational list: renders cafe cards + Edit/Delete buttons.
// Data fetching lives in App.jsx; this component just displays `cafes`.
export default function CafeList({ cafes, loading, onEdit, onDelete }) {
  if (loading) return <p>Loading cafes…</p>;
  if (!cafes.length) return <p>No cafes found. Try adding one above!</p>;

  return (
    <div className="list">
      {cafes.map((cafe) => (
        <article key={cafe._id} className="card cafe-card">
          <header>
            <h3>{cafe.name}</h3>
            <span className="rating">★ {cafe.rating ?? 0}</span>
          </header>
          <p className="muted">
            {cafe.city}
            {cafe.area ? ` • ${cafe.area}` : ''}
          </p>

          {!!(cafe.foodSpecialties || []).length && (
            <p>
              <strong>Food:</strong> {cafe.foodSpecialties.join(', ')}
            </p>
          )}

          {/* One-line environment summary */}
          <p className="muted">
            {cafe.environment?.noiseLevel} • {cafe.environment?.seatingType} seating
            {cafe.environment?.hasAC ? ' • AC' : ''}
            {cafe.environment?.hasOutdoorSeating ? ' • outdoor' : ''}
            {cafe.powerPlugsAvailable ? ' • plugs' : ''} • WiFi {cafe.wifiQuality}/5
          </p>

          {!!(cafe.ambienceTags || []).length && (
            <div className="tags">
              {cafe.ambienceTags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          )}

          {cafe.avgPricePerPerson != null && <p>${cafe.avgPricePerPerson} / person</p>}
          {cafe.notes && <p className="notes-text">{cafe.notes}</p>}

          <div className="actions">
            <button onClick={() => onEdit(cafe)}>Edit</button>
            <button
              className="danger"
              onClick={() => {
                // Confirm before soft-deleting
                if (window.confirm(`Delete "${cafe.name}"?`)) onDelete(cafe._id);
              }}
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
