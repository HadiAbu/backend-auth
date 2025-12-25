import { BookService } from "../services/book.service.js";
export const getMyBooks = (req, res) => {
    const { userId } = req.user;
    const userBooks = BookService.getAllByUser(userId);
    res.json(userBooks);
};
export const createNewBook = (req, res) => {
    const { title, author } = req.body;
    const { userId } = req.user;
    const newBook = BookService.create({ title, author }, userId);
    res.status(201).json(newBook);
};
//# sourceMappingURL=book.controllers.js.map