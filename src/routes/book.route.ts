import { BookController } from '@/controllers/BookController';
import express from 'express';
const router = express.Router();

const { getAllBooks, getBookById } = new BookController();

router.get('/', getAllBooks);

router.get('/:id', getBookById);

export default router;
