import { UsersController } from "@/controllers/UsersController";
import express from "express";
const router = express.Router();

const { getUserById, getAllUsers, create, borrowBook } = new UsersController();

router.get('/:id', getUserById);

router.get('/', getAllUsers);

router.post('/', create);

router.post('/borrow', borrowBook);

export default router;