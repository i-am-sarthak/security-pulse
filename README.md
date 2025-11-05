# Security Pulse

A full-stack cybersecurity news and awareness platform built with **Node.js (Express + TypeScript)**, **PostgreSQL**, and **React (Vite + TypeScript)**.  
It allows users to register, log in, view cybersecurity articles, and save their favorites securely.

---

## Features
- User authentication with **JWT**
- PostgreSQL database for users & articles
- Save/unsave articles for logged-in users
- Pagination, filtering, and search for articles
- RESTful API with structured responses
- Full test coverage using **Jest + Supertest**

---

## Tech Stack
**Backend:** Node.js, Express, TypeScript, PostgreSQL  
**Frontend:** React, Vite, TypeScript, Axios  
**Testing:** Jest, Supertest  
**Security:** Helmet, CORS, bcryptjs, JWT  
**Dev Tools:** ts-node-dev, ESLint, Prettier

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

## Status
✅ Backend complete
✅ Frontend integrated
✅ Testing implemented
⬜ CI/CD setup (coming soon)

---

## License
MIT © 2025 Sarthak Sharma
