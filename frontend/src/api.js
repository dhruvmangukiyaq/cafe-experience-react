// Central place for all backend calls.
// Same-origin by default: in dev, Vite proxies "/api" -> http://localhost:5001
// (see vite.config.js), so the browser never calls the backend port directly.
// To point at a backend elsewhere, set VITE_API_URL, e.g. in .env:
//   VITE_API_URL=http://localhost:5001
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Small helper: builds "?city=X&tag=Y&minRating=Z" from a filters object
function toQueryString(filters = {}) {
  const params = new URLSearchParams();
  if (filters.city) params.append('city', filters.city);
  if (filters.tag) params.append('tag', filters.tag);
  if (filters.minRating) params.append('minRating', filters.minRating);
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

// Unwraps { success, data } and throws a readable error on failure
async function handleResponse(res) {
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.success === false) {
    const msg = body.message || `Request failed with status ${res.status}`;
    const err = new Error(msg);
    err.details = body.errors;
    throw err;
  }
  return body.data;
}

// GET /api/cafes?city=&tag=&minRating=
export async function getCafes(filters = {}) {
  const res = await fetch(`${API_BASE_URL}/api/cafes${toQueryString(filters)}`);
  return handleResponse(res);
}

// GET /api/cafes/:id — single cafe (used by the Edit page)
export async function getCafe(id) {
  const res = await fetch(`${API_BASE_URL}/api/cafes/${id}`);
  return handleResponse(res);
}

// POST /api/cafes
export async function createCafe(data) {
  const res = await fetch(`${API_BASE_URL}/api/cafes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// PUT /api/cafes/:id
export async function updateCafe(id, data) {
  const res = await fetch(`${API_BASE_URL}/api/cafes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// DELETE /api/cafes/:id (soft delete on the server)
export async function deleteCafe(id) {
  const res = await fetch(`${API_BASE_URL}/api/cafes/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}
