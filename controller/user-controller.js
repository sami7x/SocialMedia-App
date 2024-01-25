import User from "../model/user.js";
import bcrypt from "bcryptjs";


//fetch User
export const getAllUser = async(req,res, next) => 
{
    let users;
    try{
        users = await User.find();
    }
    catch(err)
    {
        console.log(err);
    }
    if(!users)
    {
        return res.status(404).json({message: "No users founs"});

    }

    return res.status(200).json({users});
};

//Signup User
export const signup = async(req,res)=>{
    const {name, email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }
    catch(err)
    {
        console.log(err);
    }

    if(existingUser)
    {
        return res.status(400)
        .json({message: "User Already exists login instead."});
    }

    const hashedPassword = bcrypt.hashSync(password);

    //Query for saving data into DB
    const user = new User ({
        name,
        email,
        password: hashedPassword,
    });

    try{
       await user.save();
    } catch(err)
    {
        console.log(err);
    }
    
    return res.status(201).json({user});

};