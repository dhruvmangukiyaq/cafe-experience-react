# Cafe Experience Tracker

A full-stack MERN app to track cafe visits — ratings, work-friendliness, food, environment, pricing and ambience — with a clean table dashboard and modal-based CRUD.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-8-880000?logo=mongoose&logoColor=white)

## Features

- **Dashboard** — cafe table with specialties, environment summary, price (₹), WiFi stars, rating pill, tags, and Edit / Delete actions
- **Stats header** — total cafes tracked + average rating, computed live from data
- **Add / Edit modal** — single form with validation (`name` + `city` required), environment section (noise, seating, WiFi speed, AC, outdoor), WiFi quality (1–5), rating (0–5), tags and notes
- **Soft delete** — `DELETE` sets `isDeleted: true`; deleted cafes never appear in listings
- **Filtering API** — list supports `?city=`, `?tag=`, `?minRating=`
- **Consistent API contract** — success is always `{ success: true, data }`, errors are `{ success: false, message, errors? }`

## Tech Stack

| Layer    | Tech                                            |
| -------- | ----------------------------------------------- |
| Frontend | React 18, React Router 7, Vite 5                |
| Backend  | Node.js, Express 4, Mongoose 8                  |
| Database | MongoDB Atlas                                   |
| Dev      | Vite proxy (`/api` → `localhost:5001`), dotenv  |

## Project Structure

```
├── backend/
│   ├── server.js                 # Express app, health check, error handling
│   ├── config/db.js              # mongoose.connect(MONGODB_URI)
│   ├── models/Cafe.js            # Cafe schema (timestamps, soft delete)
│   ├── controllers/cafeController.js  # CRUD + query filters
│   ├── routes/cafeRoutes.js      # /api/cafes routes
│   └── middleware/               # asyncHandler, errorHandler
└── frontend/
    ├── vite.config.js            # port 5174 + /api proxy → :5001
    └── src/
        ├── App.jsx               # Routes: /, /add, /edit/:id
        ├── api.js                # fetch helpers (VITE_API_URL override)
        ├── pages/CafesPage.jsx   # dashboard + stats + modal state
        ├── pages/AddCafePage.jsx # centered form (direct URL)
        ├── pages/EditCafePage.jsx# centered form (direct URL)
        └── components/
            ├── CafeList.jsx      # table view
            └── CafeForm.jsx      # shared add/edit form
```

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB Atlas cluster + connection string

### 1. Backend

```bash
npm install --prefix backend
```

Create `backend/.env`:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
PORT=5001
```

Run:

```bash
node backend/server.js
# health check → http://localhost:5001/
# {"success":true,"message":"Cafe Experience Tracker API is running"}
```

> Port 5001 is used because macOS Control Center (AirPlay) occupies port 5000.

### 2. Frontend

```bash
npm install --prefix frontend
npm run dev --prefix frontend
# open http://localhost:5174/
```

> Port 5174 is pinned in `vite.config.js` (`strictPort: true`). In dev, `/api/*` is proxied to `http://localhost:5001`, so the browser talks same-origin. To point at another backend, set `frontend/.env`: `VITE_API_URL=http://localhost:5001`.

Build:

```bash
npm run build --prefix frontend   # outputs frontend/dist/
```

## API Reference

Base URL (dev): `http://localhost:5001`

| Method | Endpoint         | Description                                              |
| ------ | ---------------- | -------------------------------------------------------- |
| POST   | `/api/cafes`     | Create a cafe (`name`, `city` required)                  |
| GET    | `/api/cafes`     | List cafes (`isDeleted: false`); `?city=&tag=&minRating=` |
| GET    | `/api/cafes/:id` | Get one cafe                                             |
| PUT    | `/api/cafes/:id` | Update a cafe                                            |
| DELETE | `/api/cafes/:id` | Soft delete (`isDeleted = true`)                         |

Example:

```bash
curl -X POST http://localhost:5001/api/cafes \
  -H "Content-Type: application/json" \
  -d '{"name":"Blue Tokai","city":"Ahmedabad","rating":4.5}'
```

## Data Model (`Cafe`)

- `name` (required), `city` (required), `area`
- `foodSpecialties` ([String])
- `environment`: `noiseLevel` (quiet/normal/loud), `seatingType` (sofa/chairs/mixed), `wifiSpeed` (slow/medium/fast), `hasAC`, `hasOutdoorSeating`
- `avgPricePerPerson` (Number, ₹), `wifiQuality` (1–5, default 3), `powerPlugsAvailable`
- `ambienceTags` ([String]), `rating` (0–5 in UI; backend allows −10 to 10), `notes`
- `isDeleted` (default false), `createdAt` / `updatedAt`

## Troubleshooting

| Symptom                                        | Fix                                                              |
| ---------------------------------------------- | ---------------------------------------------------------------- |
| `EADDRINUSE :::5000`                            | Use `PORT=5001` (macOS AirPlay owns 5000)                        |
| `NetworkError when attempting to fetch resource`| Open `http://localhost:5174` (not 5173) and hard-refresh         |
| `MONGODB_URI is not defined`                    | Create `backend/.env` with your Atlas URI                        |
