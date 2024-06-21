import {  handleLogin,handleProfile,handleSignupUser } from "../controllers/userControllers";
import { checkAuthenticity } from "../middlewares/Authentication";

const express = require('express');
const UserRouter = express.Router();

UserRouter.post('/signup', handleSignupUser)
UserRouter.post('/login',handleLogin)
UserRouter.get('/profile',handleProfile)


export  {UserRouter}