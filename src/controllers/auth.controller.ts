import { AuthService } from "../services/auth.service.js";
import { Request, Response } from "express";
// import { tokenBlacklist } from "../config/db.js";
import redisClient from "@/config/redis.js";
import jwt from "jsonwebtoken";

import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export const register = async (req: Request, res: Response) => {
  try {
    const { username, pass } = req.body;
    const sanitizedUsername = DOMPurify.sanitize(username);
    const sanitizedPass = DOMPurify.sanitize(pass);

    if (!sanitizedUsername || !sanitizedPass)
      return res.status(400).json({ message: "creds missing" });

    const user = await AuthService.register(sanitizedUsername, sanitizedPass);
    res.status(201).json({ message: `created new user: ${sanitizedUsername}` });
  } catch (e) {
    return res.status(500).json({ message: "server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, pass } = req.body;
    const sanitizedUsername = DOMPurify.sanitize(username);
    const sanitizedPass = DOMPurify.sanitize(pass);

    if (!sanitizedUsername || !sanitizedPass)
      return res.status(400).json({ message: "creds missing" });
    const token = await AuthService.login(sanitizedUsername, sanitizedPass);
    if (!token)
      return res.status(400).json({ message: "invalid username or pass" });
    res.status(200).json({ token });
    res.end();
  } catch (e) {
    return res.status(500).json({ message: "server error" });
  }
};
// to logout means, to invalidate the JWT token, we do this by adding the token to the blacklisted list

export const logout = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (token) {
    try {
      // Decode the token to find out when it expires
      const decoded = jwt.decode(token) as any;
      const expiry = decoded.exp; // Unix timestamp
      const now = Math.floor(Date.now() / 1000);
      const secondsLeft = expiry - now;

      if (secondsLeft > 0) {
        // Store in Redis with an expiration time
        // Key: "blacklist:<token>", Value: "true"
        await redisClient.setEx(`blacklist:${token}`, secondsLeft, "true");
      }
    } catch (error) {
      return res.status(400).json({ message: "Invalid token" });
    }
  }

  res.status(200).json({ message: "Logged out successfully" });
};
