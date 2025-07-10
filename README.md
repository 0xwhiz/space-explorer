# Bounce NASA Space Explorer

A full-stack web application for exploring NASA space data, featuring a modern React frontend and an Express backend. Users can view Astronomy Picture of the Day, Mars Rover photos, Near Earth Objects, and Earth Imagery, all with a beautiful, responsive UI.

---

## 🌌 Features
- **Astronomy Picture of the Day (APOD):** View NASA's daily featured image with explanations.
- **Mars Rover Gallery:** Browse latest photos from NASA's Mars rovers.
- **Near Earth Objects:** Track asteroids and comets approaching Earth.
- **Earth Imagery:** See our planet from space via NASA's EPIC camera.
- **Satellite Position Cards:** View X, Y, Z coordinates for Earth imagery.
- **Modern UI:** Responsive, mobile-friendly, and visually stunning.

---

## 🛠️ Tech Stack

### Frontend
- **React** (with Hooks & Context API)
- **TypeScript**
- **Vite** (for fast dev/build)
- **Tailwind CSS** (utility-first styling)
- **Radix UI** and **Lucide React** (UI primitives & icons)

### Backend
- **Node.js**
- **Express**
- **CORS** (for cross-origin requests)
- **Axios** (for NASA API requests)
- **Serverless-ready** (deployable to Vercel)

---

## 📦 Project Structure
```
bounce/
├── backend/      # Express API (serverless-ready)
│   ├── api/      # Vercel serverless entry
│   ├── controllers/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   └── vercel.json
├── frontend/     # React app (Vite + TS + Tailwind)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── config/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
└── README.md     # (this file)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd bounce
```

### 2. Setup the Backend
```bash
cd backend
npm install
# For local development:
npm run dev
# Server runs at http://localhost:5000
```
- **Environment Variables:**
  - Create a `.env` file in `backend/` for any secrets or API keys (see NASA API docs if needed).
- **Vercel Deployment:**
  - The backend is ready for Vercel serverless deployment. See `vercel.json` for routing.

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
npm run dev
# App runs at http://localhost:5173 (or as configured)
```
- **API URLs:**
  - By default, the frontend fetches from the backend at `/api`. Update `src/config/api.ts` if needed.

---

## ⚙️ Customization & Configuration
- **Frontend Theme:** Tailwind and custom CSS in `frontend/src/index.css`.
- **Navigation:** Edit `frontend/src/pages/Index.tsx` for main navigation.
- **Backend CORS:** Update allowed origins in `backend/api/index.js` for production security.

---

## 🛰️ Deployment

### Vercel (Recommended)
- Deploy both `frontend/` and `backend/` as separate projects on Vercel.
- The backend uses `api/` as the serverless entry point and is configured via `vercel.json`.
- Use Vercel's rewrite/proxy rules to connect frontend and backend securely.

### Local Development
- Run backend (`localhost:5000`) and frontend (`localhost:5173`) separately.
- Ensure CORS is configured to allow frontend URL in backend.

---

## 🙏 Credits
- NASA Open APIs ([APOD](https://api.nasa.gov/), [EPIC](https://epic.gsfc.nasa.gov/), [Mars Rover](https://mars.nasa.gov/), [NEO](https://neo.ws/))
- [Lucide Icons](https://lucide.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📣 License
This project is for educational and demonstration purposes. NASA imagery is public domain, but check API terms for usage limits. 