//importing modules
import jwt from "jsonwebtoken";
import BlacklistToken from "../model/blacklistToken.js";

//after logout
export const validateToken = async(req,res,next)=>
{
    //Bearer ma token
    const authHeader = req.headers.authorization;

    if(! authHeader && !authHeader.startsWith("Bearer")){
     return res.status(401).json({message: "User is not authorized"});
    }

    //headers ma token
    const token = authHeader.split(" ")[1];
    if(!token)
    {
        return res.status(401).json({message: "User is not authorized"});

    }

    //erro handling
    try{
        //synchronous code for expiring code
        const isTokenBlackListed = await BlacklistToken.findOne({token});
        if(isTokenBlackListed)
        {
            return res.status(401).json({message: "Access denied. Token revoked"});
        }
        //upto here for token expire
        jwt.verify(token , secretkey,(err, decoded)=>{
            if(err)
            {
                return res.status(401).json({message: "Invalid token"});
            }
            req.user = decoded.user;
            next();
        });
    }
    catch(err)
    {
        //handle throw error
        return res.status(500).json({message: "Error verifying token"});
    }

};
