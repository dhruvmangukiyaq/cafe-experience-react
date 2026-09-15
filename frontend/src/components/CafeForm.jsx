import { useState } from 'react';

// Empty form shape — also used to reset after submit/cancel
const EMPTY_FORM = {
  name: '',
  city: '',
  area: '',
  foodSpecialties: '', // comma-separated in the UI, split into array on submit
  noiseLevel: 'normal',
  seatingType: 'mixed',
  hasAC: true,
  hasOutdoorSeating: false,
  avgPricePerPerson: '',
  wifiQuality: '', // empty = not set yet (backend default 3 applies on save)
  powerPlugsAvailable: false,
  ambienceTags: '', // comma-separated in the UI
  rating: '', // empty = not set yet (saved as 0)
  notes: '',
};

// Converts a cafe doc (edit mode) into flat form state
function fromInitialValues(cafe) {
  if (!cafe) return EMPTY_FORM;
  return {
    name: cafe.name || '',
    city: cafe.city || '',
    area: cafe.area || '',
    foodSpecialties: (cafe.foodSpecialties || []).join(', '),
    noiseLevel: cafe.environment?.noiseLevel || 'normal',
    seatingType: cafe.environment?.seatingType || 'mixed',
    hasAC: cafe.environment?.hasAC ?? true,
    hasOutdoorSeating: cafe.environment?.hasOutdoorSeating ?? false,
    avgPricePerPerson: cafe.avgPricePerPerson ?? '',
    wifiQuality: cafe.wifiQuality ?? '',
    powerPlugsAvailable: cafe.powerPlugsAvailable ?? false,
    ambienceTags: (cafe.ambienceTags || []).join(', '),
    rating: cafe.rating ?? '',
    notes: cafe.notes || '',
  };
}

// Turns "a, b, c" into ["a", "b", "c"]
function splitTags(value) {
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function CafeForm({ initialValues, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => fromInitialValues(initialValues));
  const [error, setError] = useState('');

  // If a different cafe is selected for editing, sync the form.
  // We track the edited id with a key from the parent instead — see App.jsx.
  // (Kept simple on purpose for beginners.)

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // --- Simple client-side validation ---
    if (!form.name.trim() || !form.city.trim()) {
      setError('Name and City are required.');
      return;
    }
    const wifi = Number(form.wifiQuality);
    if (form.wifiQuality !== '' && (wifi < 1 || wifi > 5)) {
      setError('WiFi quality must be between 1 and 5.');
      return;
    }

    // --- Shape payload to match the Mongoose model ---
    const payload = {
      name: form.name.trim(),
      city: form.city.trim(),
      area: form.area.trim() || undefined,
      foodSpecialties: splitTags(form.foodSpecialties),
      environment: {
        noiseLevel: form.noiseLevel,
        seatingType: form.seatingType,
        hasAC: form.hasAC,
        hasOutdoorSeating: form.hasOutdoorSeating,
      },
      avgPricePerPerson: form.avgPricePerPerson === '' ? undefined : Number(form.avgPricePerPerson),
      // Empty wifi = leave it out so the backend default (3) applies
      wifiQuality: form.wifiQuality === '' ? undefined : wifi,
      powerPlugsAvailable: form.powerPlugsAvailable,
      ambienceTags: splitTags(form.ambienceTags),
      rating: Number(form.rating) || 0,
      notes: form.notes.trim(),
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="card form">
      <h2>{initialValues ? 'Edit Cafe' : 'Add a Cafe'}</h2>
      {error && <p className="error">{error}</p>}

      <div className="grid">
        <label>
          Name *
          <input value={form.name} onChange={(e) => set('name', e.target.value)} />
        </label>
        <label>
          City *
          <input value={form.city} onChange={(e) => set('city', e.target.value)} />
        </label>
        <label>
          Area
          <input value={form.area} onChange={(e) => set('area', e.target.value)} />
        </label>
        <label>
          Food Specialties (comma separated)
          <input
            value={form.foodSpecialties}
            onChange={(e) => set('foodSpecialties', e.target.value)}
          />
        </label>
        <label>
          Noise Level
          <select value={form.noiseLevel} onChange={(e) => set('noiseLevel', e.target.value)}>
            <option value="quiet">quiet</option>
            <option value="normal">normal</option>
            <option value="loud">loud</option>
          </select>
        </label>
        <label>
          Seating Type
          <select value={form.seatingType} onChange={(e) => set('seatingType', e.target.value)}>
            <option value="sofa">sofa</option>
            <option value="chairs">chairs</option>
            <option value="mixed">mixed</option>
          </select>
        </label>
        <label>
          Avg Price / Person ($)
          <input
            type="number"
            min="0"
            value={form.avgPricePerPerson}
            onChange={(e) => set('avgPricePerPerson', e.target.value)}
          />
        </label>
        <label>
          WiFi Quality (1–5)
          <input
            type="number"
            min="1"
            max="5"
            value={form.wifiQuality}
            onChange={(e) => set('wifiQuality', e.target.value)}
          />
        </label>
        <label>
          Rating
          <select value={form.rating} onChange={(e) => set('rating', e.target.value)}>
            <option value="">Select</option>
            {/* -10 to 10 options, like the Seating Type dropdown */}
            {Array.from({ length: 21 }, (_, i) => i - 10).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ambience Tags (comma separated)
          <input
            value={form.ambienceTags}
            onChange={(e) => set('ambienceTags', e.target.value)}
          />
        </label>
      </div>

      <div className="checks">
        <label>
          <input type="checkbox" checked={form.hasAC} onChange={(e) => set('hasAC', e.target.checked)} /> Has AC
        </label>
        <label>
          <input
            type="checkbox"
            checked={form.hasOutdoorSeating}
            onChange={(e) => set('hasOutdoorSeating', e.target.checked)}
          />{' '}
          Outdoor seating
        </label>
        <label>
          <input
            type="checkbox"
            checked={form.powerPlugsAvailable}
            onChange={(e) => set('powerPlugsAvailable', e.target.checked)}
          />{' '}
          Power plugs
        </label>
      </div>

      <label className="notes">
        Notes
        <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} />
      </label>

      <div className="actions">
        <button type="submit">{initialValues ? 'Save changes' : 'Save'}</button>
        {initialValues && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
