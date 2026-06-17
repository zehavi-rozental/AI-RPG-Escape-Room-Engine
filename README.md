# 🎮 AI RPG Escape Room Engine

A backend engine for AI-driven RPG escape room experiences, built with **Node.js**, **TypeScript**, and **LangChain**. The server manages user authentication, role-based access, and sets the foundation for AI-powered game sessions using Google Gemini and OpenAI via LangChain.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript (ES2022) |
| Framework | Express 5 |
| Database | MongoDB (via Mongoose) |
| AI / LLM | LangChain + Google Gemini + OpenAI |
| Auth | JWT (jsonwebtoken) + bcrypt |
| Validation | Zod |
| Logging | Pino + pino-pretty |
| API Docs | Swagger / OpenAPI 3.0 |
| Testing | Jest + Supertest |
| Security | express-rate-limit, RBAC middleware |

---

## 📁 Project Structure

```
AI-RPG-Escape-Room-Engine/
├── src/
│   ├── app.ts                  # Express app setup, middleware, rate limiting
│   ├── swagger.ts              # Swagger/OpenAPI configuration
│   ├── config/
│   │   ├── db.ts               # MongoDB connection
│   │   └── logger.ts           # Pino structured logger
│   ├── routes/
│   │   └── auth.ts             # Auth routes (register, login)
│   ├── middleware/
│   │   ├── auth.ts             # JWT protect + role-based authorize
│   │   └── errorHandler.ts     # Centralized error handler
│   ├── models/
│   │   └── User.ts             # Mongoose User schema (Player / Game_Master)
│   ├── services/
│   │   └── AuthService.ts      # Registration, login, token generation
│   ├── dal/
│   │   └── UserDAL.ts          # Data access layer for User model
│   └── types/
│       └── express.d.ts        # Express Request augmentation (req.user)
├── tests/
│   └── auth.test.ts            # Integration tests (Jest + Supertest)
├── tsconfig.json
├── package.json
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local instance or Atlas)

### Installation

```bash
git clone https://github.com/zehavi-rozental/AI-RPG-Escape-Room-Engine.git
cd AI-RPG-Escape-Room-Engine
npm install
```

### Environment Variables

Create a `.env` file in the project root. This file is **not committed to Git** (listed in `.gitignore`).

```env
MONGO_URI=mongodb://localhost:27017/escape-room
JWT_SECRET=your_super_secret_key
PORT=5000

# AI Providers (add whichever you use)
GOOGLE_API_KEY=your_google_gemini_key
OPENAI_API_KEY=your_openai_key
```

### Run in Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

---

## 🔐 Authentication & Roles

The system supports two user roles:

| Role | Description |
|---|---|
| `Player` | Default role. Can join and play escape room sessions. |
| `Game_Master` | Elevated role. Can create and manage escape rooms. |

### Auth Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive a JWT |

### Protected Routes

Use the `protect` middleware to require authentication, and `authorize(...roles)` for role-based access:

```typescript
router.get('/admin', protect, authorize('Game_Master'), handler);
```

---

## 📖 API Documentation

Interactive Swagger UI is available at:

```
http://localhost:5000/api-docs
```

---

## 🤖 AI Integration

Game logic is powered by [LangChain](https://js.langchain.com/), with support for multiple LLM providers:

- **Google Gemini** via `@langchain/google-genai`
- **OpenAI** via `@langchain/openai`

LangChain manages the conversation chain, enabling the AI to serve as the game narrator — presenting riddles, evaluating player responses, and advancing the story dynamically.

---

## 🛡️ Security

- **Rate Limiting** — 100 requests per 15 minutes per IP (via `express-rate-limit`)
- **Password Hashing** — bcrypt with salt rounds
- **JWT Auth** — stateless, 30-day expiry
- **Role-Based Access Control** — middleware-level enforcement
- **`.env` excluded from Git** — secrets never committed

---

## 🧪 Testing

```bash
npm test
```

Tests use **Jest** + **Supertest** with mocked MongoDB models for fast, isolated integration tests.

---

## 📝 Notes

- `redis` is listed as a dependency and is intended for future use (e.g., JWT blacklisting on logout). It is **not yet integrated** into the application logic.
- The `react` and `react-router-dom` packages in `package.json` are present for a planned frontend — the current codebase is backend-only.


