export interface Book {
  id: string;
  title: string;
  author: string;
  userId: string;
}

// DTO for book
export interface BookDTO {
  title: string;
  author: string;
}
