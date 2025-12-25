import { Book, BookDTO } from "../types/book.js";
import { books } from "../config/db.js";
export class BookService {
  //get all books by userId
  static getAllByUser(userId: string): Book[] {
    return books.filter((book) => book.userId === userId);
  }

  // create new book
  static create(data: BookDTO, userId: string): Book {
    const newBook = {
      id: crypto.randomUUID(),
      ...data,
      userId,
    };
    books.push(newBook);
    return newBook;
  }
}
