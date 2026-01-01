import express, { type Request, type Response } from "express";
import dotenv from "dotenv";

// cookie parser imports
import cookieParser from "cookie-parser";
import csrf from "csurf";
import bodyParser from "body-parser";

import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";
// routes
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

dotenv.config();

const app = express();

// Apply helmet early in the middleware chain
app.use(helmet());

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    credentials: true, // This allows the CSRF cookie to be saved
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "X-CSRF-Token"],
  })
);
// Setup CSRF protection
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    // For local dev between different ports:
    sameSite: "lax",
    // Must be false if you are using http:// and not https://
    secure: false,
  },
});
// app.use(csrfProtection);
// middleware for cookie parsing and CSRF protection
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(hpp());

app.use(express.json({ limit: "10kb" })); // Body limit prevents DOS

// adding error handler middleware
app.use(errorHandler);

// RATE LIMITING (Brute force protection)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { message: "Too many requests, please try again later." },
});

// Apply to all routes
app.use("/api/", limiter);

// Every GET request will now have access to a fresh token via req.csrfToken()
app.get("/api/get-config", csrfProtection, (req, res) => {
  req.csrfToken(); // will either create a new one or
  // provide one valid for the current cookie secret.
  res.json({ csrfToken: req.csrfToken() });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("all good here");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});
