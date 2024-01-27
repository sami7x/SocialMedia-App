import Blog from "../model/Blog.js";

export const getAllBlogs = async(req,res,next)=> {
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
    try{
        const blogs = await Blog.find();
        if(!blogs || blogs.length == 0)
        {
            return res.status(404).json({message: "No Blogs found"});
        }
        return res.status(200).json({blogs});

    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }

};


export const addBlog = async(req,res, next)=> {
    const {title, description, image, user} = req.body;
    
    //Basic Validation
    if(!title || !description || !image || !user)
    {
        return res.status(402). json({message: " All fields are madatory"});
    }
    //Validation for Description Length
    if(description.length < 10 || description.length >30)
    {
        return res.status(402).json({message: "Description must be between 10 and 30 characters."});
    }
    //Query for savig Data in DB
    const blog = new Blog({
        title,
        description, 
        image,
        user,
    });
    
    try{
        await blog.save();  
        return res.status(200).json({blog});      
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message: "Internal Server error"});
    }
};


/*** Assignment ***/
//edit

//delete

//middleware