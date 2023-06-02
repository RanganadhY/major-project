const memberModel = require("../models/members")
const register = async(req,res)=>{
    const {email,userName,password} = req.body;
    try{
        const userDetails = await memberModel.create({
            email,
            password,
            userName
        })
        res.status(200).json({'userDetails':userDetails})

    }catch(e){
        console.log(e)
        res.status(500).jons({"message":"Something went wrong"})
    }
}
const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const response = await memberModel.findOne({"email":email})
        if(!response){
            return res.status(404).josn({"message":"Admin Not Found"})
        }
        if(response.password !== password){
            return res.status(403).json({"message":"Password wrong"})
        }
        return res.status(200).json({"message":"Scuessfull","userDetails":response})
    }catch(e){
        console.log(e)
        res.status(500).jons({"message":"Something went wrong"})
    }
}
module.exports.login = login;
module.exports.register = register;