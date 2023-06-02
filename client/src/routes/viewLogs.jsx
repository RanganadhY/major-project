import React,{useState,useEffect} from 'react'
import { useParams,useLocation } from 'react-router'
import axios from "../axiois/axios"
import { contractABI,contractAddress } from '../env/env';
import Web3 from "web3";
import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = "2LZpmyIoPzM4PAbxxnaedfnxhTs";
const projectSecret = "20bf09a93834ab63789f53dbfe140aa8";
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
function ViewLogs() {

    const {userName,ipfsHash,fileHash,uniqueNumber} = useParams();
    const [viewLogs, setviewLogs] = useState();
    const [editLogs, seteditLogs] = useState();
    const [fileData, setfileData] = useState();
    const {state} = useLocation();

    useEffect(()=>{
        const fetchFiles = async()=>{
            const response = await axios.get(`/file/fetch-logs/${uniqueNumber}`)
            console.log(response)
            
            setviewLogs(response.data.logsdata.logs)
            seteditLogs(response.data.logsdata.logs)
            let editedLogs = [];
            let viewdLogs = [];
            for (let i=0;i<response.data.logsdata.logs.length;i++){
                if(response.data.logsdata.logs[i].actionPerformed==="Viewed"){
                    console.log(response.data.logsdata.logs[i])
                    viewdLogs.push(response.data.logsdata.logs[i])
                }
                if(response.data.logsdata.logs[i].actionPerformed==="Edited"){
                    editedLogs.push(response.data.logsdata.logs[i])
                }
            }
            setviewLogs(viewdLogs)
            seteditLogs(editedLogs)
        }
        fetchFiles()
    },[])

    return (
        <>
            <div className="vmd-main-conatiner">
            <div className="vmd-username">
                <div>
                    <h3>{userName.toUpperCase()}</h3>
                </div>
            </div>
            <div className="vmd-username">
                <div>
                    <h3>{state.fileName}</h3>
                </div>
            </div>
                <div className='mydocs'>
                    <h4>View Logs</h4>
                    {viewLogs?
                        <table >
                            <thead>
                                <tr>
                                    <th>Viewd By</th>
                                    <th>Viewed At</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {viewLogs&&viewLogs.map((data)=>{
                                        return(
                                            <>
                                                <ViewSingleRow 
                                                    fileData={data}
                                                    uniqueNumber={uniqueNumber}
                                                />
                                            </>
                                        )
                                    })}
                            </tbody>
                        </table>
                        :
                        <p>{"No Edit Access Available"}</p>
                    }

                </div>

                <div className='mydocs'>
                    <h4>Edit Levels Access Docs</h4>
                    {editLogs?
                        <table >
                            <thead>
                                <tr>
                                    <th>Edited By</th>
                                    <th>Edited At</th>
                                    <th>Previous File Hash</th>
                                    <th>View previous File</th>
                                    <th>Edited File Hash</th>
                                    <th>View Edited File</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {editLogs&&editLogs.map((data)=>{
                                        return(
                                            <>
                                                <EditSingleRow 
                                                    fileData={data}
                                                    uniqueNumber={uniqueNumber}
                                                />
                                            </>
                                        )
                                    })}
                            </tbody>
                        </table>
                        :
                        <p>{"No Edit Access Available"}</p>
                    }
                </div>
            </div>
        </>
    )
}


function ViewSingleRow({fileData,uniqueNumber}){
    const {state} = useLocation();
    
    return (
        <>

                <tr>
                    <td>{fileData.userTouchedBy}</td>
                    <td>{fileData.createdAt}</td>
                </tr>
                        
        </>
    )
}

function EditSingleRow({fileData,uniqueNumber}){
    const {state} = useLocation();
    const handleViewPrevFile = async(filepath,uniqueNumber)=>{
        window.location.replace(`https://sitdocumentupoload.infura-ipfs.io/ipfs/${filepath}`);
        // try{
        //     await window.ethereum.request({method:'eth_requestAccounts'});
        //     window.web3 = new Web3(window.ethereum);
        //     const accounts = await window.ethereum.enable()
        //     const contract = await new window.web3.eth.Contract(JSON.parse(contractABI()),contractAddress())
        //     const randomNum = Math.floor(Math.random() * 90000) + 10000;
        //     await contract.methods.addUniqueId(randomNum).send({from :accounts[0]})
        //         .then(async(response)=>{
        //             await axios.post("/file/view-logged/",{
        //                 "userTouchedBy":state.userName,
        //                 uniqueNumber
        //             })
        //             .then((response)=>{
        //                 console.log(response)
        //                 window.open(`https://sitdocumentupoload.infura-ipfs.io/ipfs/${filepath}`,'_blank');
        //             })
        //             .catch((error)=>{
        //                 throw(error)
        //             })
        //         })
        //         .catch((error)=>{
        //             throw(error)
        //         })
        // }catch(error){
        //     console.log(error)
        //     alert("Somethig went wrong")
        // }
    }
    const handleViewCurrFile = async(filepath,uniqueNumber)=>{
        window.location.replace(`https://sitdocumentupoload.infura-ipfs.io/ipfs/${filepath}`);
        // try{
        //     await window.ethereum.request({method:'eth_requestAccounts'});
        //     window.web3 = new Web3(window.ethereum);
        //     const accounts = await window.ethereum.enable()
        //     const contract = await new window.web3.eth.Contract(JSON.parse(contractABI()),contractAddress())
        //     const randomNum = Math.floor(Math.random() * 90000) + 10000;
        //     await contract.methods.addUniqueId(randomNum).send({from :accounts[0]})
        //         .then(async(response)=>{
        //             await axios.post("/file/view-logged/",{
        //                 "userTouchedBy":state.userName,
        //                 uniqueNumber
        //             })
        //             .then((response)=>{
        //                 console.log(response)
        //                 window.open(`https://sitdocumentupoload.infura-ipfs.io/ipfs/${filepath}`,'_blank');
        //             })
        //             .catch((error)=>{
        //                 throw(error)
        //             })
        //         })
        //         .catch((error)=>{
        //             throw(error)
        //         })
        // }catch(error){
        //     console.log(error)
        //     alert("Somethig went wrong")
        // }
    }
    
    return (
        <>

                <tr>
                    <td>{fileData.userTouchedBy}</td>
                    <td>{fileData.createdAt}</td>
                    <td>{fileData.prevFileHash}</td>
                    <td><button onClick={()=>handleViewPrevFile(fileData.prevIpfsHash)}>View Previous File</button></td>
                    <td>{fileData.newFileHash}</td>
                    <td><button onClick={()=>handleViewCurrFile(fileData.newIpfsHash)}>View Edited File</button></td>
                </tr>
                        
        </>
    )
}

export default ViewLogs