
import {Schema , model} from  "mongoose";

const UserSchema = new Schema({
    name: String ,
    email: {type:String,unique: true},
    password: String ,
    role : {type:String,default:'user'}
})

const UserModel = model('User',UserSchema)

export { UserModel } 