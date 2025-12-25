import { Request, Response } from "express";
import { BookService } from "../services/book.service.js";

export const getMyBooks = (req: Request, res: Response) => {
  const { userId } = req.user;
  const userBooks = BookService.getAllByUser(userId);
  res.json(userBooks);
};
export const createNewBook = (req: Request, res: Response) => {
  const { title, author } = req.body;
  const { userId } = req.user;
  const newBook = BookService.create({ title, author }, userId);
  res.status(201).json(newBook);
};
