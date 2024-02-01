import Blog from "../model/Blog.js";

export const getAllBlogs = async (req, res, next) => {
  /* Code use for Testing */

  /** let blogs;
    try{
        blogs = await Blog.find();
    }
    catch(error)
    {
        console.log(error);
    }
    if(!blogs)
    {
        return res.status(404).json({messgae: "No Blogs found"});
    }

    return res.status(200).json({blogs}); **/

  /*Code used for Production */

  try {
    const blogs = await Blog.find();
    if (!blogs || blogs.length == 0) {
      return res.status(404).json({ message: "No Blogs found" });
    }
    return res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


/**
 * Add Blog
 */
export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  //Basic Validation
  if (!title || !description || !image || !user) {
    return res.status(402).json({ message: " All fields are madatory" });
  }
  //Validation for Description Length
  if (description.length < 10 || description.length > 30) {
    return res
      .status(402)
      .json({ message: "Description must be between 10 and 30 characters." });
  }
  //Query for savig Data in DB
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });

  try {
    await blog.save();
    return res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

/*
 * For Editing Blog
 */

export const updateBlog = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;
    const updateBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
      new: true,
    });

    if (!updateBlog) {
      return res.status(404).json({ message: "No Blogs found." });
    }
    res.json({ message: "Blog has been updated sucessfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Deleting Post
 */

export const deleteBlog = async(req, res, next) => {
  try {
    const blogId = req.params.blogId;
    const deleteBlog = await Blog.findByIdAndDelete(blogId, req.body, {
      new: true,
    });
    if (!deleteBlog) {
      return res.status(404).json({ message: "No Blogs found." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

