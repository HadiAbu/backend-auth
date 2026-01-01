# 📚 Mini-Library API: Secure Edition

A robust, well-typed RESTful API built with **Node.js**, **TypeScript**, and **Express**. This project demonstrates professional backend architecture integrated with high-level security mitigations against the OWASP Top 10, including **CSRF protection**, **XSS defense**, and **Redis-backed session management**.

---

## 🛡️ Security Implementations

This project goes beyond basic authentication to implement a multi-layered defense strategy:

- **CSRF Protection (Double Submit Cookie Pattern):** Prevents unauthorized state-changing requests by enforcing a strict handshake between the client and server using `csurf`. Tokens are transmitted via custom headers (`X-CSRF-Token`) to accommodate modern SPA architectures.
- **XSS & Injection Defense:** \* **Helmet.js:** Automatically configures secure HTTP headers (CSP, HSTS, X-Frame-Options).
  - **HttpOnly Cookies:** CSRF secrets are marked `HttpOnly` and `SameSite: Lax`, ensuring they are inaccessible to malicious client-side scripts.
- **Brute Force Protection:** Implements `express-rate-limit` on authentication and registration routes to mitigate automated credential stuffing and DoS attacks.
- **Input Integrity:** Uses `hpp` (HTTP Parameter Pollution) protection and strict JSON body-size limits to ensure request stability.

---

## 🚀 Core Features

- **Robust Type Safety**: 100% TypeScript implementation with strict null checks and custom Express type definitions for request locals.
- **Stateless Authentication**: Password hashing using `bcryptjs` and secure stateless authentication via `JWT`.
- **Token Revocation**: Advanced logout functionality implemented using a **Redis** blacklist with automated TTL (Time-To-Live) expiration.
- **Layered Architecture**: Clear separation of concerns between **Routes, Controllers, Services, and Middleware**.
- **Automated Testing**: Integration tests using `Jest` and `Supertest` to ensure security boundaries remain intact.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: TypeScript
- **Security**: `csurf`, `helmet`, `express-rate-limit`, `hpp`, `cookie-parser`
- **Session/Cache**: Redis (for Token Blacklisting)
- **Testing**: Jest & Supertest

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker & Docker Compose](https://www.docker.com/) (Recommended for Redis orchestration)

---

## ⚙️ Installation & Setup

### Option A: Using Docker (Recommended)

This starts the API and a Redis instance automatically, configured to communicate within a private network.

```bash
docker-compose up --build
```

### Option B: Local Development

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/yourusername/mini-library-api.git](https://github.com/yourusername/mini-library-api.git)
   cd mini-library-api
   ```
   Install Dependencies:
    ```bash
    npm install
    ```
Environment Setup: Create a .env file in the root directory and populate it with your configuration:


PORT=3000
JWT_SECRET=your_super_secret_key_change_me
REDIS_URL=redis://localhost:6379
NODE_ENV=development


Start Redis: Ensure you have a Redis server running locally. If you have Redis installed, start it with:

```bash
redis-server
```
Run the Application:

# For Development (Nodemon + ts-node)

npm run dev

# To Build and Run Production

npm run build
npm start

## 🏗️ Architecture & Middleware Flow

A key part of this project is the **Middleware Pipeline**. To ensure security filters don't interfere with legitimate traffic (like CORS preflights), the order is strictly defined:

1. **CORS Configuration**: Pre-authorizes trusted origins (e.g., your frontend on port 5500).
2. **Helmet**: Injects security headers like `Content-Security-Policy` and `X-Frame-Options`.
3. **Rate Limiting**: Throttles excessive requests before they hit expensive database operations.
4. **Parsers**: `cookie-parser` and `express.json()` prepare the data for validation.
5. **CSRF Protection**: Validates the request signature against the session cookie.
6. **Authentication**: Services verify the JWT and check the **Redis Blacklist** for revoked sessions.

---

## 📝 Lessons Learned

- **Synchronous Tokens**: Learned how to implement a "handshake" GET route to seed the CSRF secret before the user performs state-changing actions.
- **Token Revocation**: Since JWTs are stateless, we implemented a hybrid approach using Redis to "kill" sessions instantly upon logout.
- **Cookie Security**: Deep dived into `SameSite`, `HttpOnly`, and `Secure` flags to prevent side-channel attacks.

---

## 🤝 Contributing

1. **Fork** the Project
2. **Create** your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your Changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the Branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request
