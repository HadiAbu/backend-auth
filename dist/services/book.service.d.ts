import { Book, BookDTO } from "../types/book.js";
export declare class BookService {
    static getAllByUser(userId: string): Book[];
    static create(data: BookDTO, userId: string): Book;
}
//# sourceMappingURL=book.service.d.ts.map