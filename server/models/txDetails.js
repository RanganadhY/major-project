const mongoose=require("mongoose");
const txDetails=new mongoose.Schema({
    ipfsHash:{
        type:String,
        trim:true,
        unique:true,
        sparse:true
    },
    contentHash:{
        type:String,
        trim:true
    },
    viewers:{
        type:String,
        trime:true
    },
    editors:{
        type:String
    },
    owner:{
        type:String
    }
})

module.exports=mongoose.model("txDetails",txDetails);