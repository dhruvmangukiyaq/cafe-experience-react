<div align="center">

# ☕ Cafe Experience — Full-Stack Web Application

<p align="center">
  <strong>A modern, responsive, full-stack app to track cafe visits.</strong><br />
  Featuring a minimal artisan UI, cafe dashboard with ratings & work-friendly spots, vibe-based exploring, JWT login, and file uploads saved to MongoDB Atlas.
</p>

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Mongoose](https://img.shields.io/badge/Mongoose-8-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)

<br />

[Explore Features](#-features) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure) • [Getting Started](#-getting-started) • [Author](#-author)

</div>

---

## 📖 Overview

**Cafe Experience** is a full-stack **MERN** application for people who love cafes — track every visit with ratings, prices, WiFi quality, ambience notes, and photos. It pairs a clean, minimal frontend (React 18 + Vite) with a decoupled **Express.js + Mongoose API** backend backed by **MongoDB Atlas**, complete with JWT authentication and Atlas-stored file uploads.

---

## ✨ Features

### ☕ 1. Cafe Dashboard (CRUD)
- **Stats Header:** Live count of cafes tracked + average rating.
- **Rich Table View:** Name, city/area, specialties, environment summary, price (₹), WiFi stars, rating pill, tags — with Edit / Delete actions.
- **Modal Forms:** Add & Edit cafes in a blurred-backdrop modal (name, city, area, food, noise/seating/WiFi-speed/AC, price, WiFi quality, rating, tags, notes).
- **Soft Delete:** Deletes only flag `isDeleted` — data is never lost.

### 🧭 2. Explore & Vibe Finder
- **Find My Vibe:** One-tap moods — 💻 Work Mode, 🌿 Chill, ❤ Date Night — with per-pick reason lines.
- **Cafe Cards:** Gradient cover art generated per cafe, rating badges, price & WiFi at a glance.
- **Detail Modal:** Full cafe profile with notes, environment breakdown, and attached files (View / Save).

### 🔐 3. JWT Authentication
- **Register & Login Pages:** Client + server validation (email format, password ≥ 6 chars, confirm-password match, show/hide toggle).
- **Protected Routes:** Dashboard, Add & Edit pages require login; session restores from stored JWT via `/api/auth/me`.
- **Navbar State:** Shows Login button or `Hi, <name>` + Logout.

### 📎 4. File Uploads to MongoDB Atlas
- **Attach Anything:** Photos, PDF, Word, Excel, CSV & TXT per cafe — binaries stored directly in Atlas (memory storage, Vercel-safe).
- **Smart Validation:** Documents max **5MB**, photos max **10MB**, type allowlist, instant client-side checks + strict server checks.
- **View & Download:** Images/PDFs open in-browser, everything else downloads; per-file delete.

### 🎨 5. Minimal Artisan UI/UX
- **Restrained Palette:** Warm paper, espresso ink, one deep-green accent — no visual noise.
- **Editorial Typography:** Fraunces serif headings + Inter body (Google Fonts with system fallbacks).
- **Responsive:** Phone, tablet, laptop & TV breakpoints; full-bleed fluid layout with zero side gutters.
- **Safety Nets:** Error boundary + boot fallback (blank page impossible), back-button on every page (always returns Home).

---

## 🧱 Tech Stack

### Frontend
- **Framework:** [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Styling:** Handcrafted CSS (no UI framework) — scoped `site.css` + `index.css`
- **Fonts:** Fraunces + Inter via Google Fonts
- **State:** React hooks + Context (`AuthProvider`), Fetch API layer (`src/api.js`)

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) (CommonJS)
- **Server Framework:** [Express.js 4](https://expressjs.com/)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) via [Mongoose 8](https://mongoosejs.com/)
- **Auth:** [bcryptjs](https://github.com/dcodeIO/bcrypt.js/) password hashing + [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) (7-day expiry)
- **Uploads:** [Multer](https://github.com/expressjs/multer) (memory storage, type + size validation)

---

## 📁 Project Structure

```bash
cafe-experience-react/
├── vercel.json                # Services deploy: frontend (vite) + backend (express)
│
├── backend/                   # 🚀 Express API (Port 5001)
│   ├── server.js              # App entry: middleware, routes, Vercel export
│   ├── config/db.js           # mongoose.connect(MONGODB_URI)
│   ├── models/
│   │   ├── Cafe.js            # Cafe schema (environment, rating, soft delete)
│   │   ├── User.js            # User schema (bcrypt hash, unique email)
│   │   └── Attachment.js      # File schema (Buffer binary in Atlas)
│   ├── controllers/
│   │   ├── cafeController.js  # Cafe CRUD + query filters
│   │   ├── authController.js  # Register / login / me (JWT)
│   │   └── uploadController.js# Upload / list / stream / delete files
│   ├── routes/
│   │   ├── cafeRoutes.js      # /api/cafes
│   │   ├── authRoutes.js      # /api/auth
│   │   └── uploadRoutes.js    # /api/uploads
│   └── middleware/
│       ├── asyncHandler.js    # Async error wrapper
│       ├── errorHandler.js    # Central { success:false } errors + Multer mapping
│       └── auth.js            # protect (Bearer JWT → req.user)
│
└── frontend/                  # ⚛️ React Frontend (Vite, Port 5174)
    ├── index.html             # HTML shell, fonts & meta tags
    ├── vite.config.js         # Port 5174 + /api reverse proxy → :5001
    ├── public/
    │   ├── sitemap.xml        # SEO sitemap (public pages)
    │   ├── robots.txt         # Crawlers (login pages disallowed)
    │   └── google*.html       # Search Console verification
    └── src/
        ├── main.jsx           # Entry: Router + ErrorBoundary + boot fallback
        ├── App.jsx            # Routes + RequireAuth guard
        ├── auth.jsx           # AuthProvider (session restore, login/logout)
        ├── api.js             # All backend calls (cafes, auth, uploads)
        ├── site-helpers.js    # Stars, covers, vibes, array guards
        ├── site.css           # Website theme (Home/Explore/Auth)
        ├── index.css          # Dashboard/CRUD theme
        ├── components/
        │   ├── SiteLayout.jsx     # Navbar + footer
        │   ├── CafeList.jsx       # Dashboard table
        │   ├── CafeForm.jsx       # Shared add/edit form
        │   ├── CafeCard.jsx       # Explore cards
        │   ├── CafeDetailModal.jsx# Cafe profile + files
        │   ├── Attachments.jsx    # Upload UI (pending + live modes)
        │   ├── BackButton.jsx     # ← always returns Home
        │   └── ErrorBoundary.jsx  # Crash → recovery screen
        └── pages/
            ├── HomePage.jsx       # Hero, stats, spotlight, top picks
            ├── ExplorePage.jsx    # Vibe finder + all-cafes grid
            ├── CafesPage.jsx      # Dashboard (login required)
            ├── AddCafePage.jsx    # Create + post-create uploads
            ├── EditCafePage.jsx   # Edit + live uploads
            ├── LoginPage.jsx      # Validation + redirect-back
            └── RegisterPage.jsx   # Validation + auto-login
```

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version `18.x` or higher recommended)
- [npm](https://www.npmjs.com/) (version `9.x` or higher)
- [Git](https://git-scm.com/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster + connection string

### 2. Clone the Repository
```bash
git clone https://github.com/dhruvmangukiyaq/cafe-experience-react.git
cd cafe-experience-react
```

### 3. Backend Setup
```bash
npm install --prefix backend
```

Create `backend/.env` (never committed):
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
PORT=5001
JWT_SECRET=<any-long-random-string>
```

Run it:
```bash
node backend/server.js
# health check → http://localhost:5001/
# {"success":true,"message":"Cafe Experience Tracker API is running"}
```
> Port `5001` is used because macOS Control Center (AirPlay) occupies port `5000`.

### 4. Frontend Setup
```bash
npm install --prefix frontend
npm run dev --prefix frontend
# open http://localhost:5174/
```
> Port `5174` is pinned in `vite.config.js` (`strictPort: true`). In dev, `/api/*` is proxied to `http://localhost:5001`, so the browser talks same-origin. To point at another backend, set `frontend/.env`: `VITE_API_URL=http://localhost:5001`.

Visit **`http://localhost:5174/`** — register an account, then open the Dashboard to add your first cafe.

---

## 🛠️ Available Scripts

| Script | Command | Description |
|---|---|---|
| **Dev Frontend** | `npm run dev --prefix frontend` | Starts Vite dev server with HMR on port `5174` |
| **Start Backend** | `node backend/server.js` | Starts the Express API on port `5001` |
| **Build Frontend** | `npm run build --prefix frontend` | Compiles optimized bundle into `frontend/dist/` |
| **Install All** | `npm install --prefix backend && npm install --prefix frontend` | One-time install for both sides |

---

## 🚢 Production Deployment

Deployed as a single Vercel project with two services (`vercel.json`):

- **Frontend service** (`frontend/`, Vite) — all routes except `/api/*`
- **Backend service** (`backend/`, Express, entrypoint `server.js`) — `/api/*`

Set these in **Vercel → Project → Settings → Environment Variables**, then Redeploy:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
JWT_SECRET=<any-long-random-string>
```
> The frontend needs no env vars — same-domain `/api` rewrites reach the backend service automatically.

---

## 🧑‍💻 Author

**Dhruv Mangukiya**
- GitHub: [@dhruvmangukiyaq](https://github.com/dhruvmangukiyaq)
- Email: [dhruvmangukiya111@gmail.com](mailto:dhruvmangukiya111@gmail.com)

---

<div align="center">
  <sub>Made with ❤️, coffee, and code by Dhruv Mangukiya</sub>
</div>
