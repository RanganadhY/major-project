const mongoose=require("mongoose");
const logsSchema = new mongoose.Schema({
    userTouchedBy:{
        type:String
    },
    actionPerformed:{
        type:String
    },
    newIpfsHash:{
        type:String
    },
    newFileHash:{
        type:String
    },
    prevIpfsHash:{
        type:String
    },
    prevFileHash:{
        type:String
    }
},{timestamps:true})

const filesSchema=new mongoose.Schema({
    fileName:{
        type:String,
        required:true
    },
    viewAcces:[String],

    editAcces:[String],

    ownerShip:{
        type:String
    },
    ipfsHash:[
        String
    ],
    fileHash:[
        String
    ],
    uniqueNumber:{
        type:Number
    },
    logs:[logsSchema]
},{timestamps:true})

module.exports=mongoose.model("filesSchema",filesSchema);
