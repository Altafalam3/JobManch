import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
   try {
      const { name, content, image } = req.body;

      const newBlog = new Blog({ name, content, image });
      const savedBlog = await newBlog.save();
      res.status(201).json(savedBlog);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const addReview = async (req, res) => {
   try {
      const { userName, content } = req.body;
      const blog = await Blog.findById(req.params.id);

      if (!blog) return res.status(404).json({ message: "Blog not found" });

      const newReview = { userName, content };
      blog.reviews.push(newReview);
      const updatedBlog = await blog.save();
      res.status(200).json(updatedBlog);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const getAllBlogs = async (req, res) => {
   try {
      const blogs = await Blog.find();
      res.status(200).json(blogs);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const getBlogById = async (req, res) => {
   try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      res.status(200).json(blog);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};