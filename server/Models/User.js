const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{type:String},
    mail:{type:String},
    password:{type:String},
    tasks:[{type:mongoose.Schema.Types.ObjectId,ref:'Task'}]
});

module.exports=mongoose.model('User',userSchema);
