import {UserModel} from '../models/UserModel';
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config();


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET_KEY 

export const handleSignupUser = async (req:any , res: any) =>{
    const {name, email, password} = req.body;
    try {
        const userDoc = await UserModel.create({
            name : name,
            email : email,
            password : bcrypt.hashSync(password, bcryptSalt)})
            jwt.sign({email:userDoc.email,id:userDoc._id,name:userDoc.name},jwtSecret,{},(err:any,token:any)=>{
                if(err) throw err;
                res.status(200).json({token,userDoc});                      
            })
    } catch (error) {
        res.status(422).json(error);
    }
}

export const handleLogin = async (req:any , res:any) => {
    const {email,password} = req.body;
    try {
        const userDoc= await UserModel.findOne({email});
        if(userDoc){
            const passOk =bcrypt.compareSync(password,userDoc.password);
            if(passOk){
                jwt.sign({email:userDoc.email,id:userDoc._id,name:userDoc.name},jwtSecret,{},(err:any ,token:any)=>{
                    if(err) res.json(err);
                    res.status(200).json({token,userDoc});                        
                })
            }else{
                res.status(422).json("pass not ok");
            }
        }else{
            res.status(401).json("user not found");
        }
    } catch (error) {
    }
}

export const handleProfile = async (req:any, res:any) => {
    const token = req.headers.authorization.split(" ")[1].replace(/"/g,"");
    if(token){
        jwt.verify(token,jwtSecret,{},async (err:any,user:{email:string,id:string,name:string})=>
        {
            try {
                const userDoc = await UserModel.findById(user.id)
                res.json(userDoc)
            } catch (error) {
            }
        })
    }
    else {
        res.json(null);
    }
}

