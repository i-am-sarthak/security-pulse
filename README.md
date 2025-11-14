# Security Pulse

A full-stack cybersecurity news and awareness platform built with **Node.js (Express + TypeScript)**, **PostgreSQL**, and **React (Vite + TypeScript)**.  
It features authentication, article saving, and a responsive Tailwind UI.

---

## Live Demo
**Frontend:** https://security-pulse-tau.vercel.app

**Backend:** https://security-pulse.onrender.com/api/health

**Database:** PostgreSQL (Render hosted)

---

## Tech Stack
**Backend:** Node.js, Express, TypeScript, PostgreSQL  
**Frontend:** React, Vite, TypeScript, TailwindCSS  
**Security:** Helmet, CORS, bcryptjs, JWT 
**Testing:** Jest, Supertest   
**Deployment:** Vercel (frontend) & Render (backend)
**Dev Tools:** ts-node-dev, ESLint, Prettier

---

## Features
- User authentication with **JWT**
- Protected routes + context-based auth
- PostgreSQL database for users & articles
- Save/unsave articles for logged-in users
- Pagination, filtering, and search for articles
- Responsive UI + mobile navbar
- RESTful API with structured responses
- Full test coverage using **Jest + Supertest**

---

## Automated News Feed (Bonus Feature)

Security Pulse now updates itself automatically every day.

### 📰 Live Cybersecurity News
The backend integrates with a cybersecurity news source (SecureWeek API) to fetch real articles, including:
- Title
- Source
- Date Published
- Summary

### Daily Scheduled Cron Job
A background job runs **every day at 20:00 UTC**:

1. Fetches the latest cybersecurity articles  
2. Normalizes and cleans the data  
3. Checks for duplicates in PostgreSQL  
4. Inserts only new articles  
5. Keeps the feed continuously fresh

---

## Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/i-am-sarthak/security-pulse.git
cd security-pulse
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Environment variables
Create a .env file in the root directory:
```env
PORT=4000
DATABASE_URL=postgres://postgres:password@localhost:5432/security_pulse
JWT_SECRET=mysecretkey
```

You can also copy and edit the example:
```bash
cp .env.example .env
```

### 4️⃣ Start PostgreSQL & run migrations
Open pgAdmin or psql and create the required tables:
```sql
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  password TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE articles(
  id SERIAL PRIMARY KEY,
  title TEXT,
  source TEXT,
  published_at DATE,
  summary TEXT
);

CREATE TABLE users_articles(
  user_id INT REFERENCES users(id),
  article_id INT REFERENCES articles(id),
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, article_id)
);
```

### 5️⃣ Run the development server
Create a .env file in the root directory:
```bash
npm run dev
```
The server will start at http://localhost:4000

### 6️⃣ Run tests
Create a .env file in the root directory:
```bash
npm test
```

---

## API Endpoints
| Method | Endpoint                | Description                                | Auth Required |
| ------ | ----------------------- | ------------------------------------------ | ------------- |
| GET    | `/api/health`           | Health check                               | ❌             |
| POST   | `/api/auth/register`    | Register user                              | ❌             |
| POST   | `/api/auth/login`       | Login user                                 | ❌             |
| GET    | `/api/me`               | Get logged-in user info                    | ✅             |
| GET    | `/api/articles`         | Fetch all articles (paginated, searchable) | ❌             |
| POST   | `/api/saved/:articleId` | Save an article                            | ✅             |
| DELETE | `/api/saved/:articleId` | Unsave an article                          | ✅             |

---

## Testing
The test suite uses Jest and Supertest to verify:

/api/auth registration & login flow

/api/articles fetching

Protected routes (/api/me)

Run:
```bash
npm test
```

---

## Scripts
Open your **root** `package.json` and add these under `"scripts"`:
```json
"scripts": {
  "dev": "ts-node-dev src/server.ts",
  "test": "jest",
  "lint": "eslint ."
}
```
If you already have some scripts (like the default start), that’s fine — just make sure these three are present.

---

## License
MIT © 2025 Sarthak Sharma
