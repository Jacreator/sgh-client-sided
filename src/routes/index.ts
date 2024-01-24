import user from "./user.route";
import book from "./book.route";

import express from "express";


const router = express.Router();

// admin endpoint
router.use("/v1/user", user);

router.use('/v1/book', book);

export default router;
