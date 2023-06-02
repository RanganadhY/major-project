const mongoose=require("mongoose");
const memberSchema=new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        unique:true,
        sparse:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        trim:true
    },
    metamaskAddress:{
        type:[String],
        trime:true
    },
    viewAccess:[String],
    editAccess:[String],
    ownerShip:[String]
})

module.exports=mongoose.model("memberSchema",memberSchema);