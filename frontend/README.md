# Space Explorers Hub – Frontend

A visually stunning, interactive React web app for exploring NASA space data, including Astronomy Picture of the Day, Mars Rover Gallery, Near Earth Objects, and Earth Imagery. Built with Vite, React, TypeScript, Tailwind CSS, and modern UI libraries.

---

## 🚀 Features
- **Astronomy Picture of the Day (APOD):** View NASA's daily featured image with explanations.
- **Mars Rover Gallery:** Browse latest photos from NASA's Mars rovers.
- **Near Earth Objects:** Track asteroids and comets approaching Earth.
- **Earth Imagery:** See our planet from space via NASA's EPIC camera.
- **Mobile-Responsive:** Fully responsive design with mobile navigation drawer.
- **Modern UI:** Beautiful gradients, glassmorphism, and cosmic theme.
- **Fast & Modular:** Built with Vite, React Context API, and modular components.

---

## 🛠️ Tech Stack
- **React** (with Hooks & Context API)
- **TypeScript**
- **Vite** (for fast dev/build)
- **Tailwind CSS** (utility-first styling)
- **Lucide React** (icon set)
- **Radix UI** (accessible UI primitives)
- **Custom UI Components** (Card, Button, Sheet, etc.)

---

## 📦 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
```bash
cd frontend
npm install
# or
yarn install
```

### Development
```bash
npm run dev
# or
yarn dev
```
- App runs at `http://localhost:5173` by default.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Folder Structure
```
frontend/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI and feature components
│   ├── pages/             # Main page(s) and routing
│   ├── hooks/             # Custom React hooks
│   ├── config/            # API endpoints and config
│   ├── assets/            # Images, fonts, etc.
│   └── main.tsx           # App entry point
├── index.html             # Main HTML file
├── tailwind.config.js     # Tailwind CSS config
├── tsconfig.json          # TypeScript config
└── ...
```

---

## ⚙️ Customization
- **API URLs:** Set in `src/config/api.ts`. By default, points to backend or NASA APIs.
- **Theme:** Tailwind and custom CSS variables in `src/index.css`.
- **Navigation:** Edit `src/pages/Index.tsx` for main navigation and sections.

---

## 🙏 Credits
- NASA Open APIs ([APOD](https://api.nasa.gov/), [EPIC](https://epic.gsfc.nasa.gov/), [Mars Rover](https://mars.nasa.gov/), [NEO](https://neo.ws/))
- [Lucide Icons](https://lucide.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📣 License
This project is for educational and demonstration purposes. NASA imagery is public domain, but check API terms for usage limits.
