import type { User } from "../types/user.js";
import type { Book } from "../types/book.js";

export const users: User[] = [];
export const books: Book[] = [];

export const tokenBlacklist = new Set<string>();
