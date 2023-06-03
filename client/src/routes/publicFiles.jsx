import React,{useState,useEffect} from 'react'
import axios from "../axiois/axios";
function PublicFiles() {


    const [publicFiles, setpublicFiles] = useState()
    useEffect(()=>{
        getAllPublicFiles()
        async function getAllPublicFiles(){
            const response = await axios.get("/file/fetch-public-files/")
            console.log(response.data.files)
            setpublicFiles(response.data.files)
        }
    },[])
    return (
        <>
            
        </>
    )
}

export default PublicFiles