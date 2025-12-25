import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWTpayload } from "../types/user.js";

const JWT_secert: string = process.env.JWT || "fallback_secret";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestHeader = req.headers.authorization;

  if (!requestHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "unauthorized: token not valid" });
  }
  const token = requestHeader.split(" ")[1];
  console.log(token);
  try {
    req.user = token && jwt.verify(token, JWT_secert);
    next();
  } catch (e) {
    return res.status(403).json({ message: "error" });
  }
};
