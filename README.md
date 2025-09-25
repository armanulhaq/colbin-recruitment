# Recruitment Platform Prototype

This is a minimal full‑stack prototype for a recruitment platform demonstrating:

-   Registration API where users sign up using email and password.
-   Login API using JWT for authentication.
-   A simple React user profile page that fetches and displays user data.
-   A simple database schema with basic validations and data integrity.

## Tech Stack

-   Server: Node.js, Express, Mongoose, JWT, bcrypt, cookie-parser, CORS
-   Client: React (Vite), React Router, React Hook Form, Tailwind CSS
-   Database: MongoDB (via Mongoose)

## Project Structure

```
colbin-assignment/
├── server/
│   ├── controllers/
│   │   └── authentication.controller.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   └── authentication.route.js
│   ├── utils/
│   │   ├── authentication.js
│   │   └── database.js
│   ├── server.js
│   ├── package.json
│   └── .env (not committed for security)
└── client/
    ├── public/
    │   ├── icon.svg
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── main.jsx
    │   └── pages/
    │       ├── Register.jsx
    │       ├── Login.jsx
    │       └── Dashboard.jsx
    ├── package.json
    └── .env (not committed for security)
```

## Environment Variables

Server (`server/.env`):

-   `MONGO_URI` = MongoDB connection string
-   `JWT_SECRET` = secret for signing JWTs
-   `CLIENT_URL` = frontend origin (e.g., `http://localhost:5173`)

Client (`client/.env`):

-   `VITE_BACKEND_URL` = server base URL (e.g., `http://localhost:3000`)

## Setup & Run

1. Install dependencies

-   From project root:
    -   Server: `cd server && npm i`
    -   Client: `cd client && npm i`

2. Run apps

-   Start server: from `server/` run `npm run start` (runs on `http://localhost:3000`)
-   Start client: from `client/` run `npm run dev` (runs on `http://localhost:5173`)

## Documentation for Submission

For full API documentation, see:

-   `docs/APIDocumentation.pdf`
