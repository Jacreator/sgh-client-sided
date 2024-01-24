import { Book } from "@/models/Book.model";

export class BookService {
  getAll = async () => {
    return Book.find({ is_deleted: false });
  };

  getBookById = async (id: any) => {
    return Book.findOne({ _id: id, is_deleted: false });
  };
}