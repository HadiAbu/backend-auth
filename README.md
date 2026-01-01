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
- **Security**: `csurf`,
