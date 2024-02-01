//importing modules
import express from 'express'
import { getAllBlogs, addBlog, updateBlog, deleteBlog } from '../controller/blog-controller.js'

const blogRouter = express.Router();

blogRouter.get('/', getAllBlogs);
blogRouter.post('/add', addBlog);
blogRouter.put("/:blogId",updateBlog);
blogRouter.delete("/:blogId", deleteBlog);


export default blogRouter;
