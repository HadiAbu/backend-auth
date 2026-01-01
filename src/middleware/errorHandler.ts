import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.code === "EBADCSRFTOKEN") {
    console.log("--- CSRF Debug ---");
    console.log("Body Token:", req.body._csrf);
    console.log("Header Token:", req.headers["x-csrf-token"]);
    console.log("Cookies:", req.cookies);
    return res.status(403).json({ message: "Invalid CSRF Token" });
  }
  next(err);
};
