# 📚 Mini-Library API

A secure, well-typed RESTful API built with **Node.js**, **TypeScript**, and **Express**. This project demonstrates professional backend practices including layered architecture, JWT authentication, and a Redis-backed token blacklist for secure logouts.

---

## 🚀 Features

- **Robust Type Safety**: 100% TypeScript with strict null checks and custom Express type definitions.
- **Secure Authentication**: Password hashing with `bcryptjs` and stateless authentication via `JWT`.
- **Token Revocation**: Logout functionality implemented using a **Redis** blacklist with automated TTL (Time-To-Live) expiration.
- **Layered Architecture**: Clear separation of concerns between Routes, Controllers, Services, and Middleware.
- **Automated Testing**: Integration tests using `Jest` and `Supertest`.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: In-memory (Mock) / Redis (for Blacklisting)
- **Testing**: Jest & Supertest
- **Process Management**: Nodemon & ts-node

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker & Docker Compose](https://www.docker.com/) (Recommended for easy setup)

---

## ⚙️ Installation & Setup

### Option A: Using Docker (Recommended)

This starts the API and a Redis instance automatically.

```bash
docker-compose up --build
```
