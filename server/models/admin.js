const mongoose=require("mongoose");
const adminSchema=new mongoose.Schema({
    eamil:{
        type:String,
        trim:true,
        unique:true,
        sparse:true
    },
    password:{
        type:String,
        trim:true
    },
    metamaskAddress:{
        type:[String],
        trime:true
    }
})

module.exports=mongoose.model("adminSchema",adminSchema);