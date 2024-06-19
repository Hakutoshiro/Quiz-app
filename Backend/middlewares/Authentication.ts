const jwt = require ('jsonwebtoken')
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET_KEY 
import {UserModel} from '../models/UserModel';

export const checkAuthenticity = (req:any, res:any, next:any) => {
  const token = req.headers.authorization.split(" ")[1].replace(/"/g,"");
    if(token){
        jwt.verify(token,jwtSecret,{},async (err:any,user:{email:string,id:string,name:string})=>
        {
            try {
                const userDoc = await UserModel.findById(user.id)
                if(!userDoc){
                    res.status(401).json("User not found");
                }
                next()
            } catch (error) {
              res.status(401).json("User not found");
            }
        })
    }

    
}

