import { books } from "../config/db.js";
export class BookService {
    //get all books by userId
    static getAllByUser(userId) {
        return books.filter((book) => book.userId === userId);
    }
    // create new book
    static create(data, userId) {
        const newBook = {
            id: crypto.randomUUID(),
            ...data,
            userId,
        };
        books.push(newBook);
        return newBook;
    }
}
//# sourceMappingURL=book.service.js.map