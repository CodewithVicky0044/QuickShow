<<<<<<< HEAD
﻿# QuickShow
=======
# QuickShow
>>>>>>> 489539b68d47ffa5e58a4ff48ac59ed4d55c9cf6

QuickShow is a movie ticket booking platform built with **React (Vite)** frontend and **Node.js + Express** backend.

This is a learning/demo project with a modern UI, user booking flow, favorites, and an admin panel.

## Features

- Browse movies
- Movie details with date-wise schedule
- Seat selection and booking flow
- My Bookings page
- Favorites page
- Admin panel:
  - Dashboard
  - Movies management (add/delete)
  - Shows management (add/delete)
  - Bookings overview

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Clerk Auth, React Router
- Backend: Node.js, Express, CORS
- Data Storage: In-memory (runtime store)

## Important Note About Data Persistence

Currently, backend data is stored in memory (`server/src/store.js`).

That means:
- Data resets on server restart/redeploy
- Bookings/favorites/admin-added items are not permanent

This is intentional for learning/demo usage.

## Project Structure

```text
QuickShow/
  client/   # React frontend
  server/   # Node/Express backend
```

## Prerequisites

- Node.js 18+
- npm

## Local Setup

### 1) Backend

```bash
cd server
npm install
npm run dev
```

Backend runs at: `http://localhost:4000`

### 2) Frontend

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:4000
<<<<<<< HEAD
=======
>>>>>>> 489539b68d47ffa5e58a4ff48ac59ed4d55c9cf6
VITE_ADMIN_EMAILS=your-email@example.com
```

Run frontend:

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

## Backend Environment Variables

Create `server/.env` (optional but recommended):

```env
PORT=4000
<<<<<<< HEAD
=======
>>>>>>> 489539b68d47ffa5e58a4ff48ac59ed4d55c9cf6
```

## Admin Access

1. Login from frontend
2. Click user menu (top-right)
3. Open **Admin Panel**

Admin access conditions:
- Logged-in user email must be in `VITE_ADMIN_EMAILS`
- Frontend sends `x-admin-key`
- Backend validates it against `ADMIN_KEY`

## API Overview

### Public/User APIs

- `GET /api/health`
- `GET /api/movies`
- `GET /api/movies/:movieId`
- `GET /api/shows/:showId/seats`
- `POST /api/bookings`
- `GET /api/bookings?userId=...`
- `GET /api/favorites?userId=...`
- `POST /api/favorites/toggle`

### Admin APIs

- `GET /api/admin/dashboard`
- `GET /api/admin/movies`
- `POST /api/admin/movies`
- `PUT /api/admin/movies/:movieId`
- `DELETE /api/admin/movies/:movieId`
- `GET /api/admin/shows`
- `POST /api/admin/shows`
- `PUT /api/admin/shows/:showId`
- `DELETE /api/admin/shows/:showId`
- `GET /api/admin/bookings`

## Deploy (Vercel + Render)

### Frontend on Vercel

- Root: `client`
- Build command: `npm run build`
- Output directory: `dist`
- Env vars:
  - `VITE_API_BASE_URL=https://your-render-service.onrender.com`
<<<<<<< HEAD
=======
>>>>>>> 489539b68d47ffa5e58a4ff48ac59ed4d55c9cf6
  - `VITE_ADMIN_EMAILS=your-email@example.com`

### Backend on Render

- Root: `server`
- Build command: `npm install`
- Start command: `npm start`
- Env vars:
=======
>>>>>>> 489539b68d47ffa5e58a4ff48ac59ed4d55c9cf6
  - `PORT=4000`

## Known Limitations

- No real database yet
- No payment gateway integration
- Data not persistent across backend restarts

## Future Improvements

- File-based JSON persistence or database integration
- Payment integration (Razorpay/Stripe)
- Role-based authorization
- Automated tests

---

If you use this project as a portfolio demo, mention clearly that it is a learning-focused architecture with runtime in-memory storage.
<<<<<<< HEAD

=======
>>>>>>> 489539b68d47ffa5e58a4ff48ac59ed4d55c9cf6
