//importing modules
import express from 'express'
import { getAllBlogs, addBlog, updateBlog, deleteBlog } from '../controller/blog-controller.js'
import {validateToken} from "../middleware/validateTokenHandler.js";
const blogRouter = express.Router();

blogRouter.get('/', validateToken, getAllBlogs);
blogRouter.post('/add',validateToken,  addBlog);
blogRouter.put("/:blogId",validateToken, updateBlog);
blogRouter.delete("/:blogId",validateToken, deleteBlog);


export default blogRouter;
