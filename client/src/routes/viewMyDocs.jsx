import React,{useState,useEffect} from 'react'
import axios from "../axiois/axios";
import { useLocation,useNavigate } from 'react-router';
import "../css/viewMyDocs.css"

function ViewMyDocs() {

    const {state} = useLocation();
    console.log(state)
    const [userFiles, setuserFiles] = useState()
    useEffect(()=>{
        const fetchFiles = async()=>{
            const response = await axios.post("/member/fetch-my-docs",{"ownerShip":state.userName})
            console.log(response)
            setuserFiles(response.data.fileDetails)
        }
        fetchFiles()
    },[])
    return (
        <>
            <div className="vmd-header">
                <div>
                    <h2>View My Docs</h2>
                </div>
            </div>
            <div className="vmd-username">
                <div>
                    <h3>{state.userName.toUpperCase()}</h3>
                </div>
            </div>
            <div className="vmd-main-conatiner">
                <div className='mydocs'>
                <table >
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>Ipfs hash</th>
                            <th>File Hash</th>
                            <th>view Acces</th>
                            <th>Edit Acces</th>
                            <th>Created At</th>
                            <th>View log</th>
                        </tr>
                    </thead>
                    <tbody>
                            {userFiles&&userFiles.map((data)=>{
                                return(
                                    <>
                                        <SingleFile fileData={data}/>
                                    </>
                                )
                            })}
                    </tbody>    
                    </table>
                </div>
            </div>
        </>
    )
}

function SingleFile({fileData}){
    const {state} = useLocation()
    const navigate = useNavigate();
    const handleViewLogs = async(fileIpfsHash,fileHash,uniqueNumber,fileName)=>{
        navigate(`/view-logs/${state.userName}/${fileIpfsHash}/${fileHash}/${uniqueNumber}`,{state:{fileName}})
    }
    return (
        <>

                <tr>
                    <td>{fileData.fileName}</td>
                    <td>{fileData.ipfsHash[fileData.ipfsHash.length-1]}</td>
                    <td>{fileData.fileHash[fileData.fileHash.length-1]}</td>
                    <td>{fileData.viewAcces.join(", ")}</td>
                    <td>{fileData.editAcces.join(", ")}</td>    
                    <td>{fileData.createdAt}</td>
                    <td><button onClick={
                        ()=>handleViewLogs(
                            fileData.ipfsHash[fileData.ipfsHash.length-1],
                            fileData.fileHash[fileData.fileHash.length-1],
                            fileData.uniqueNumber,
                            fileData.fileName
                            )}>View Logs</button></td>
                </tr>
                        
        </>
    )
}
export default ViewMyDocs