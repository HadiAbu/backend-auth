import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import redisClient from "../config/redis.js";
import { JWTpayload } from "../types/user.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    // 1. Check if token is blacklisted in Redis
    const isBlacklisted = await redisClient.get(`blacklist:${token}`);
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token is invalid (logged out)" });
    }

    // 2. Standard JWT verification
    const decoded = jwt.verify(token, JWT_SECRET) as JWTpayload;
    console.log(decoded);
    // attach the user data (payload) to the request for easier retrieval later on
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};
