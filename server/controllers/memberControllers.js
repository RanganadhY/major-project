const memberModel = require("../models/members");
const fileModel = require("../models/files")

const fetchAllMembers = async(req,res)=>{
    try{
        const response = await memberModel.find()
        res.status(200).json({"userDetails":response})
        console.log(response)
    }catch(e){
        console.log(e)
        res.status(500).json({"message":"Something went wrong"})
    }
}

const uploadFile = async(req,res)=>{
    try{
        const {fileHash,ipfsHash,viewAcces,editAcces,fileName,ownerShip} = req.body;
        console.log(viewAcces)
        const vaccess = []
        viewAcces.map((data)=>{
            vaccess.push(data.value)
        })
        const eaccess = []
        editAcces.map((data)=>{
            eaccess.push(data.value)
        })
        const randomNum = Math.floor(Math.random() * 90000) + 10000;
        for(let i =0;i<vaccess.length;i++){
            await memberModel.findOneAndUpdate(
                {"userName":vaccess[i]},
                {$push:{viewAccess:randomNum}})
        }
        for(let i =0;i<eaccess.length;i++){
            await memberModel.findOneAndUpdate(
                {"userName":eaccess[i]},
                {$push:{editAccess:randomNum}})
        }
        
        const createObj = {
            fileHash,
            ipfsHash,
            fileName,
            ownerShip,
            "viewAcces":vaccess,
            "editAcces":eaccess,
            "uniqueNumber":randomNum
        }

        await fileModel.create(createObj)
            .then((response)=>{
                return res.status(200).json({"fileDetails":response});
            })
            .catch((err)=>{
                throw(err)
            })
    }catch(e){
        console.log(e)
        res.status(500).json({"message":"Something went wrong"})
    }
}

const fetchMyDocs= async(req,res)=>{
    try{
        const {ownerShip} = req.body;
        const response = await fileModel.find({ownerShip})
        return res.status(200).json({"fileDetails":response})
    }catch(e){
        console.log(e)
        return res.status(500).json({"message":"Something went wrong"})
    }
}

const fetchEligibleDocs = async(req,res)=>{
    const {userName} = req.params;
    try{
        const editAccessFiles = await fileModel.find({ editAcces: { $elemMatch: { $eq: userName } } })
        const viewAccessFiles = await fileModel.find({ viewAcces: { $elemMatch: { $eq: userName } } })
        return res.status(200).json({
            editAccessFiles,
            viewAccessFiles
        })
        // console.log(editAccessFiles,viewAccessFiles)
    }catch(error){
        console.log(error)
        return res.status(500).json("Something went wrong")
    }
}

module.exports.fetchAllMembers = fetchAllMembers;
module.exports.uploadFile = uploadFile;
module.exports. fetchMyDocs = fetchMyDocs;
module.exports.fetchEligibleDocs= fetchEligibleDocs;
