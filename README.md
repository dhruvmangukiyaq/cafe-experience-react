# Cafe Experience Tracker

A full-stack **MERN** CRUD app to track real-life cafe experiences —
place, food, environment, wifi, price, ambience tags, rating and notes.

- **Frontend:** React 18 + Vite + React Router
- **Backend:** Node.js + Express + Mongoose
- **Database:** MongoDB Atlas (you configure it yourself via `.env`)

---

## Features

- **Listing page (`/`)** — opens first; shows all cafes as cards + **+ Add Cafe** button
- **Add page (`/add`)** — empty form, **Save** → back to listing
- **Edit page (`/edit/:id`)** — form pre-filled with that cafe, **Save changes** → back to listing
- **Delete** — soft delete (`isDeleted: true`), with confirm; refreshes the list
- Fields per cafe: name, city, area, food specialties, environment
  (noise level / seating type / AC / outdoor seating), avg price per person,
  wifi quality, power plugs, ambience tags, **rating (-10 to 10 dropdown)**,
  notes
- Backend validates input and always responds `{ success, data }` or
  `{ success: false, message, errors? }`

---

## Folder structure

```
cafe-react/
├── README.md
├── backend/
│   ├── server.js                 # Express app + MongoDB connect + listen
│   ├── .env                      # YOU create this (MONGODB_URI, PORT) — never commit real values
│   ├── .env.example              # Placeholder example
│   ├── config/db.js              # mongoose.connect(process.env.MONGODB_URI) only
│   ├── models/Cafe.js            # Mongoose "Cafe" schema (timestamps: true)
│   ├── controllers/cafeController.js  # CRUD logic (async/await)
│   ├── routes/cafeRoutes.js      # Routes under /api/cafes
│   ├── middleware/asyncHandler.js
│   └── middleware/errorHandler.js
└── frontend/  (Vite + React)
    ├── vite.config.js            # port 5174 + /api proxy → http://localhost:5001
    └── src/
        ├── main.jsx              # BrowserRouter setup
        ├── App.jsx               # Title + Routes (/, /add, /edit/:id)
        ├── api.js                # fetch helpers (same-origin /api; VITE_API_URL override)
        ├── index.css
        ├── pages/
        │   ├── CafesPage.jsx     # listing
        │   ├── AddCafePage.jsx   # create form page
        │   └── EditCafePage.jsx  # edit form page
        └── components/
            ├── CafeForm.jsx      # shared add/edit form
            └── CafeList.jsx      # cards + Edit/Delete buttons
```

---

## Prerequisites

- Node.js 18+ and npm
- A MongoDB Atlas cluster (create it yourself in the Atlas dashboard)

---

## Setup

### 1) Backend

```bash
npm install --prefix backend
```

Create `backend/.env` yourself (no real URI lives in this repo):

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
PORT=5001
```

> **Why 5001, not 5000?** On macOS, port 5000 is occupied by Control
> Center (AirPlay), so Express cannot bind to it (`EADDRINUSE`).

Run it:

```bash
# from cafe-react/backend
node server.js
# health check -> http://localhost:5001/
# {"success":true,"message":"Cafe Experience Tracker API is running"}
```

### 2) Frontend

```bash
npm install --prefix frontend
```

Run it:

```bash
# from cafe-react/frontend
npm run dev
# open http://localhost:5174/
```

> **Why 5174, not 5173?** Port 5173 was already used by another project on
> this machine, so Vite is pinned to 5174 (`strictPort: true`).

Build for production:

```bash
npm run build --prefix frontend   # outputs frontend/dist/
```

---

## Backend API

Base URL (dev): `http://localhost:5001`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cafes` | Create a cafe (`name`, `city` required) → `{ success: true, data: createdCafe }` |
| GET | `/api/cafes` | List all cafes (`isDeleted: false`); filters: `?city=…&tag=…&minRating=…` |
| GET | `/api/cafes/:id` | Single cafe (`isDeleted: false`) |
| PUT | `/api/cafes/:id` | Update any cafe fields → updated doc |
| DELETE | `/api/cafes/:id` | Soft delete (`isDeleted = true`) → `{ success: true, data: null }` |

Example:

```bash
curl -X POST http://localhost:5001/api/cafes \
  -H "Content-Type: application/json" \
  -d '{"name":"Blue Tokai","city":"Ahmedabad","rating":8}'
```

### Data model (Mongoose `Cafe`)

- `name` (String, required), `city` (String, required), `area` (String)
- `foodSpecialties` ([String])
- `environment`: `noiseLevel` (quiet/normal/loud), `seatingType`
  (sofa/chairs/mixed), `hasAC` (Boolean), `hasOutdoorSeating` (Boolean)
- `avgPricePerPerson` (Number), `wifiQuality` (1–5, default 3),
  `powerPlugsAvailable` (Boolean)
- `ambienceTags` ([String]), `rating` (**-10 to 10**, default 0), `notes`
- `isDeleted` (Boolean, default false), plus `createdAt`/`updatedAt`

---

## Frontend notes

- Dev only: Vite proxies `/api/*` to `http://localhost:5001`, so the
  browser talks same-origin (no CORS / wrong-port issues).
  To call a backend elsewhere, set `VITE_API_URL` in `frontend/.env`:
  `VITE_API_URL=http://localhost:5001` (`src/api.js` reads it).
- Form details: comma-separated inputs are split into arrays on submit;
  `name` + `city` required; empty wifi falls back to backend default (3).
- Rating is a dropdown from **-10 to 10** (backend enforces the same range).

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `EADDRINUSE :::5000` | Use `PORT=5001` (macOS AirPlay owns 5000) |
| `NetworkError when attempting to fetch resource` | Open `http://localhost:5174` (not 5173) and hard-refresh (`Cmd+Shift+R`) so the latest bundle loads |
| `MONGODB_URI is not defined` | Create `backend/.env` with your Atlas URI |
| Old form values stuck after delete/edit | Hard-refresh; the app exits edit mode on delete automatically |
