import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BlacklistToken from "../model/blacklistToken.js";

//fetch User
export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No users founs" });
  }

  return res.status(200).json({ users });
};

//Signup User
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already exists login instead." });
  }

  //hash password
  const hashedPassword = bcrypt.hashSync(password);

  //Query for saving data into DB
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ user });
};

/**
 * Login User
 */

export const login = async(req,res,next)=>{
    
    const {email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }
    catch(err)
    {
        console.log(err);
    }

    if(!existingUser)
    {
        return res.status(404)
        .json({message: "User does not exists."});
    }

    
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect)
    {
        return res.status(400).json({message: "Password is incorrect" });
    }
    //If email and paswword are correct, generate token
    const token = jwt.sign({userId : existingUser._id}, 'secretkey', {expiresIn: '1h'});
    return res.status(200).json({message: "Login Successful", token: token});


};

/**
 * Display Current Logged in User
 */
export const currentUser = async(req,res,next)=>{
    res.json(req.user);
};


/**
 * Logout User
 */
export const logout = async (req, res, next) => {
  const token = req.headers.authorization?.split(" "[1]);
  if (!token) {
    return res.status(400).json({ message: "Token not provided" });
  }
  try {
    await BlacklistToken.create({ token });
    return res.status(500).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Failed User Logout" });
  }
};
