const fileModel = require("../models/files")

const viewLogged = async(req,res)=>{
    const {userTouchedBy,uniqueNumber} = req.body;
    console.log(userTouchedBy,uniqueNumber)
    try{
        const response = await fileModel.findOneAndUpdate(
            {uniqueNumber},
            {
                $push:{
                    logs:{
                        userTouchedBy,
                        "actionPerformed":"Viewed"
                    }
                }
                
            },
            {new:true}
            )
            console.log(response)
            return res.status(200).json({"message":"Succesfully logged"})
    }catch(error){
        return res.status(500).json({
            "message":"Something went wrong"
        })
    }
}

const editLogged = async(req,res)=>{
    const {userTouchedBy,uniqueNumber,newIpfsHash,newFileHash,prevIpfsHash,prevFileHash} = req.body;
    try{
        const response = await fileModel.findOneAndUpdate(
            {uniqueNumber},
            {
                $push:{
                    logs:{
                        userTouchedBy,
                        "actionPerformed":"Edited",
                        newIpfsHash,
                        newFileHash,
                        prevIpfsHash,
                        prevFileHash
                    },
                    "ipfsHash":newIpfsHash,
                    "fileHash":newFileHash,
                    
                }
                

            }
            )
            return res.status(200).json({"message":"Succesfully logged"})
    }catch(error){
        return res.status(500).json({
            "message":"Something went wrong"
        })
    }
}
const fetchAFileLogs = async(req,res)=>{
    const {uniqueNumber} = req.params;
    try{
        const logsData = await fileModel.findOne({uniqueNumber})
        // for(let i=0 ; i<logs)
        return res.status(200).json({"logsdata":logsData})
        console.log(logsData)
    }catch(error){
        console.log(error)
        return res.status(500).json({"message":"Something went wrong"})
    }
}
module.exports.viewLogged = viewLogged;
module.exports.editLogged =editLogged;
module.exports.fetchAFileLogs = fetchAFileLogs;
