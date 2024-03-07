import express from "express";
import {
   createBlog,
   addReview,
   getAllBlogs,
   getBlogById,
} from "../controllers/blog.js";

const router = express.Router();

router.post("/", createBlog);
router.post("/:id/reviews", addReview);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

export default router;