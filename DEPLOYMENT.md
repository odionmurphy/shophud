# Deployment to Render 🚀

This document explains how to deploy the project to Render (both backend and frontend), the required environment variables, testing tips, and common troubleshooting steps.

---

## Overview
- Backend: Docker web service using Bun (Dockerfile included at `/backend/Dockerfile`).
- Frontend: Static site built with Vite (build output at `/frontend/dist`).
- A `render.yaml` is included at the repo root to declare services.

---

## Prerequisites
- GitHub repo: `https://github.com/odionmurphy/shophud`
- Render account with permission to create services and databases.

---

## 1) Create Postgres DB on Render
1. Render dashboard → **New** → **Postgres**.
2. Choose plan and create database.
3. Copy the **Connection String** (this is the value for `DATABASE_URL`).

Example: `postgres://user:password@hostname:5432/dbname`

---

## 2) Backend (Web service) setup
- New → **Web Service** → Connect repo `odionmurphy/shophud`.
- Branch: `main`
- Root directory: `backend`
- Environment: **Docker** (Render uses the `backend/Dockerfile`)
- Port: `3001` (Render will set `PORT` automatically and the app uses `process.env.PORT`)

Environment Variables to set in Render (Service → Environment):
- `DATABASE_URL` — Postgres connection string (from step 1).
- `DB_SSL` — `true` if your Postgres host requires SSL (try `true` if you see connection errors).
- `CLIENT_URL` — frontend URL (set after frontend deploy, e.g. `https://shophud-frontend.onrender.com`).

Notes:
- The backend seeds the database on startup (`seedDatabase()` in `/backend/libs/seed.ts`).
- Logs will show `db connected` and `Database seeded successfully!` when successful.

---

## 3) Frontend (Static site) setup
- New → **Static Site** → Connect repo `odionmurphy/shophud`.
- Branch: `main`
- Root: `frontend`
- Build Command: `npm run build`
- Publish Directory: `dist`

Environment Variables:
- `VITE_API_BASE_URL` — e.g. `https://<your-backend>.onrender.com/api`
  - This ensures the frontend calls the deployed backend instead of `localhost`.

After the frontend deploy, set the backend `CLIENT_URL` (the frontend URL) and restart the backend service to allow CORS.

---

## 4) Using `render.yaml` (optional)
- `render.yaml` is included and declares the backend web service and frontend static site.
- When creating services you can either use the web UI or import the repo — Render will honor `render.yaml` if present.

---

## 5) Testing & quick checks
- Check backend products: `curl https://<your-backend>.onrender.com/api/products`
- Visit the frontend URL and confirm UI calls succeed.
- Inspect Render service logs (Service → Logs) for errors like DB connection issues or CORS errors.

---

## 6) Troubleshooting tips ⚠️
- DB connection errors: set `DB_SSL=true` and redeploy if your provider requires SSL. Check logs for exact error message.
- CORS errors: ensure `CLIENT_URL` exactly matches the frontend URL (include `https://`).
- Frontend still hitting `localhost`: confirm `VITE_API_BASE_URL` is set in the static site env variables and redeploy the site.
- Seed data not appearing: check backend logs for seed errors; ensure `DATABASE_URL` points to the correct DB.

---

## 7) Useful Render UI locations
- Create Postgres: Render dashboard → New → Postgres
- Create Web Service: Render dashboard → New → Web Service
- Create Static Site: Render dashboard → New → Static Site
- Environment variables: Service (or Static Site) → **Environment** → Add Variables
- Logs: Service → **Logs**

---

If you'd like, I can also:
- Create a branch and add additional automated health checks or status endpoints, or
- Walk you step-by-step in the Render UI to set up services and env variables.

