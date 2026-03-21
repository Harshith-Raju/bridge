# Production Readiness Notes

## Backend

- Copy `backend/.env.example` to `backend/.env` and provide real secrets.
- Install dependencies with `npm install` in `backend`.
- Run with `npm run start` in production (`npm run dev` for development).
- Ensure MongoDB is reachable from your deployment environment.
- Set `CORS_ORIGINS` to your frontend domain(s), comma-separated.
- Current deployed backend: `https://franchise-bridge.onrender.com`

## Frontend

- Copy `frontend/.env.example` to `frontend/.env`.
- Set `REACT_APP_API_URL` and `REACT_APP_SOCKET_URL` to backend public URLs.
- For your current deployment use:
  - `REACT_APP_API_URL=https://franchise-bridge.onrender.com/api`
  - `REACT_APP_SOCKET_URL=https://franchise-bridge.onrender.com`
- Build using `npm run build` in `frontend`.
- Serve the `build` folder via a static host (Netlify, Vercel, Nginx, etc.).

## Deployment checklist

- Use HTTPS for frontend and backend.
- Keep secrets out of git and rotate leaked credentials.
- Add monitoring/log aggregation in your hosting platform.
- Add backup strategy for MongoDB data.
