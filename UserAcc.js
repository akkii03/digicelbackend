const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    token:{
        type:String
    }
 
});

const UserModel = mongoose.model('users',UserSchema);
module.exports = UserModel;