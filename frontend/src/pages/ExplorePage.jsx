import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCafes } from '../api';
import { VIBES, isWorkFriendly } from '../site-helpers';
import CafeCard from '../components/CafeCard';
import CafeDetailModal from '../components/CafeDetailModal';

export default function ExplorePage() {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  // Vibe finder + manual filters (independent systems)
  const [vibe, setVibe] = useState(null);
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [minRating, setMinRating] = useState('');
  const [sort, setSort] = useState('rating-desc');
  const [onlyAC, setOnlyAC] = useState(false);
  const [onlyPlugs, setOnlyPlugs] = useState(false);
  const [onlyWork, setOnlyWork] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError('');
    getCafes()
      .then(setCafes)
      .catch((e) => setError(e.message || 'Failed to load cafes'))
      .finally(() => setLoading(false));
  }, []);

  const cities = useMemo(
    () => [...new Set(cafes.map((c) => c.city).filter(Boolean))].sort(),
    [cafes]
  );

  const vibePicks = useMemo(() => {
    if (!vibe) return null;
    return cafes.filter(VIBES[vibe].match).slice(0, 3);
  }, [vibe, cafes]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = cafes.filter((c) => {
      if (q && !`${c.name} ${c.city} ${c.area || ''}`.toLowerCase().includes(q)) return false;
      if (city && c.city !== city) return false;
      if (minRating !== '' && (Number(c.rating) || 0) < Number(minRating)) return false;
      if (onlyAC && !c.environment?.hasAC) return false;
      if (onlyPlugs && !c.powerPlugsAvailable) return false;
      if (onlyWork && !isWorkFriendly(c)) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'rating-asc': return (Number(a.rating) || 0) - (Number(b.rating) || 0);
        case 'price-asc': return (a.avgPricePerPerson ?? 1e9) - (b.avgPricePerPerson ?? 1e9);
        case 'price-desc': return (b.avgPricePerPerson ?? -1) - (a.avgPricePerPerson ?? -1);
        case 'name': return (a.name || '').localeCompare(b.name || '');
        default: return (Number(b.rating) || 0) - (Number(a.rating) || 0);
      }
    });
    return list;
  }, [cafes, query, city, minRating, sort, onlyAC, onlyPlugs, onlyWork]);

  return (
    <>
      <section className="site-section" style={{ paddingTop: 40 }}>
        <p className="site-kicker">Find my vibe</p>
        <div className="site-section-head"><h2>Tell me your mood</h2></div>
        <div className="site-vibes">
          {Object.entries(VIBES).map(([key, v]) => (
            <button
              key={key}
              className={vibe === key ? 'site-vibe active' : 'site-vibe'}
              onClick={() => setVibe(vibe === key ? null : key)}
            >
              {v.label}
            </button>
          ))}
        </div>
        {vibe && <p className="site-count">{VIBES[vibe].tagline}</p>}
        {vibePicks && (
          vibePicks.length ? (
            <div className="site-grid" style={{ marginBottom: 10 }}>
              {vibePicks.map((c) => (
                <CafeCard key={c._id} cafe={c} onOpen={setSelected} reason={VIBES[vibe].reason(c)} />
              ))}
            </div>
          ) : (
            <div className="site-empty">No cafe matches this vibe yet — add one from the Dashboard!</div>
          )
        )}
      </section>

      <section className="site-section" style={{ paddingTop: 30 }}>
        <p className="site-kicker">Browse all</p>
        <div className="site-section-head"><h2>Explore cafes</h2></div>

        <div className="site-toolbar">
          <label>Search<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Name, city, area…" /></label>
          <label>City
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">All cities</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label>Min rating
            <select value={minRating} onChange={(e) => setMinRating(e.target.value)}>
              <option value="">Any</option>
              <option value="4">4.0+</option>
              <option value="3">3.0+</option>
              <option value="2">2.0+</option>
            </select>
          </label>
          <label>Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="rating-desc">Rating: high → low</option>
              <option value="rating-asc">Rating: low → high</option>
              <option value="price-asc">Price: low → high</option>
              <option value="price-desc">Price: high → low</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>

        <div className="site-checks">
          <label className="site-check"><input type="checkbox" checked={onlyAC} onChange={(e) => setOnlyAC(e.target.checked)} /> AC</label>
          <label className="site-check"><input type="checkbox" checked={onlyPlugs} onChange={(e) => setOnlyPlugs(e.target.checked)} /> Power plugs</label>
          <label className="site-check"><input type="checkbox" checked={onlyWork} onChange={(e) => setOnlyWork(e.target.checked)} /> Work-friendly only</label>
        </div>

        {loading ? (
          <div className="site-empty">Loading cafes…</div>
        ) : error ? (
          <div className="site-empty">
            <p style={{ fontSize: 16, color: 'var(--s-gold-soft)', fontWeight: 700, margin: '0 0 8px' }}>
              Couldn&apos;t reach the cafe database
            </p>
            <p style={{ margin: '0 0 18px' }}>{error}</p>
            <Link to="/dashboard" className="site-btn site-btn-ghost site-btn-sm">Open Dashboard</Link>
          </div>
        ) : results.length ? (
          <>
            <p className="site-count">{results.length} cafe{results.length > 1 ? 's' : ''} found</p>
            <div className="site-grid">
              {results.map((c) => <CafeCard key={c._id} cafe={c} onOpen={setSelected} />)}
            </div>
          </>
        ) : cafes.length === 0 ? (
          <div className="site-empty">
            <p style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>No cafes yet ☕</p>
            <p style={{ margin: '0 0 18px' }}>Add your first cafe and it will show up here.</p>
            <Link to="/add" className="site-btn site-btn-gold site-btn-sm">+ Add cafe</Link>
          </div>
        ) : (
          <div className="site-empty">Nothing matches — try clearing a filter or two.</div>
        )}
      </section>

      {selected && <CafeDetailModal cafe={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
