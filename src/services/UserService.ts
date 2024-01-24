import { Book } from "@/models/Book.model";
import { User } from "@/models/user.model";
import ApiError from "@/utils/ApiError";
import httpStatus from "http-status";

export class UsersService {
  getAllUser = async () => {
    return User.find({ is_deleted: false });
  };

  getUserById = async (id: any) => {
    return User.findOne({ _id: id, is_deleted: false });
  };

  create = async (userPayload: any) => {
    return await User.create(userPayload);
  };

  handleBookAction = async (payload: {
    userId: string;
    bookId: string;
    isBorrowing: boolean;
    dueDate: Date;
  }) => {
    try {
      const { userId, bookId, isBorrowing, dueDate } = payload;
      const user = await User.findById(userId);
      const book = await Book.findById(bookId);

      if (!user || !book) {
        // Handle invalid user or book ID
        throw new ApiError(httpStatus.NOT_FOUND, 'Invalid user or book ID');
      }

      if (isBorrowing) {
        // Check if user already borrowed the book
        if (user.borrowedBooks.includes(bookId)) {
          throw new ApiError(
            httpStatus.NOT_ACCEPTABLE,
            'User already borrowed this book',
          );
        }

        // Update user and book models
        user.borrowedBooks.push(book._id);
        book.borrowedBy = user._id;
        book.borrowed = true;
        book.dueDate = dueDate
        await Promise.all([user.save(), book.save()]);
      } else {
        // Check if user borrowed the book
        if (!user.borrowedBooks.includes(bookId)) {
          throw new ApiError(
            httpStatus.NOT_ACCEPTABLE,
            'User did not borrow this book',
          );
        }

        // Update user and book models
        const bookIndex = user.borrowedBooks.indexOf(bookId);
        user.borrowedBooks.splice(bookIndex, 1);
        book.borrowedBy = null;
        book.borrowed = false;

        await Promise.all([user.save(), book.save()]);
      }

      return {
        message: isBorrowing
          ? 'Book borrowed successfully'
          : 'Book returned successfully',
      };
    } catch (error) {
      // Handle errors
      console.error(error);
      return { error: error.message };
    }
  };
}