import { Request, Response } from "express";
import { BookService } from "../services/book.service.js";

import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export const getMyBooks = (req: Request, res: Response) => {
  let { userId } = req.user;
  userId = DOMPurify.sanitize(userId);
  const userBooks = BookService.getAllByUser(userId);
  res.json(userBooks);
};
export const createNewBook = (req: Request, res: Response) => {
  let { title, author } = req.body;
  let { userId } = req.user;

  title = DOMPurify.sanitize(title);
  author = DOMPurify.sanitize(author);
  userId = DOMPurify.sanitize(userId);

  const newBook = BookService.create({ title, author }, userId);
  res.status(201).json(newBook);
};
