import React,{useState,useEffect,useRef} from 'react'
import { useLocation,useParams } from 'react-router';
import axios from "../axiois/axios"
import { contractABI,contractAddress } from '../env/env';
import Web3 from "web3";
import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = "2LZpmyIoPzM4PAbxxnaedfnxhTs";
const projectSecret = "20bf09a93834ab63789f53dbfe140aa8";
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

function ViewEligibleDocs() {

    const {state} = useLocation();
    const {userName} = useParams();
    console.log(state)
    const [viewAccessFiles, setviewAccessFiles] = useState();
    const [editAccessFiles, seteditAccessFiles] = useState();
    useEffect(()=>{
        const fetchFiles = async()=>{
            const response = await axios.get(`/member/fetch-eligible-docs/${userName}`)
            console.log(response)
            seteditAccessFiles(response.data.editAccessFiles)
            setviewAccessFiles(response.data.viewAccessFiles)
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
                <div className='mydocs'>
                    <h4>View Level Access Docs</h4>
                    
                        <table >
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>OwnerShip</th>
                                    <th>Ipfs hash</th>
                                    <th>File Hash</th>
                                    <th>Created At</th>
                                    <th>View</th>

                                </tr>
                            </thead>
                            <tbody>
                                    {viewAccessFiles&&viewAccessFiles.map((data)=>{
                                        return(
                                            <>
                                                <ViewSingleFile fileData={data}/>
                                            </>
                                        )
                                    })}
                            </tbody>
                        </table>

                </div>

                <div className='mydocs'>
                    <h4>Edit Levels Access Docs</h4>
                    {editAccessFiles?
                        <table >
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>OwnerShip</th>
                                    <th>Ipfs hash</th>
                                    <th>File Hash</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {editAccessFiles&&editAccessFiles.map((data)=>{
                                        return(
                                            <>
                                                <EditSingleFile fileData={data}/>
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

function ViewSingleFile({fileData}){
    const {state} = useLocation();
    const {userName} = useParams();
    const handleView = async(filepath,uniqueNumber)=>{
        try{
            await window.ethereum.request({method:'eth_requestAccounts'});
            window.web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.enable()
            const contract = await new window.web3.eth.Contract(JSON.parse(contractABI()),contractAddress())
            const randomNum = Math.floor(Math.random() * 90000) + 10000;
            await contract.methods.storeRandomNumber(randomNum).send({from :accounts[0]})
                .then(async(response)=>{
                    await axios.post("/file/view-logged/",{
                        "userTouchedBy":userName,
                        uniqueNumber
                    })
                    .then((response)=>{
                        console.log(response)
                        window.location.replace(`https://sitdocumentupoload.infura-ipfs.io/ipfs/${filepath}`);
                    })
                    .catch((error)=>{
                        throw(error)
                    })
                })
                .catch((error)=>{
                    throw(error)
                })
        }catch(error){
            console.log(error)
            alert("Somethig went wrong")
        }
    }
    return (
        <>

                <tr>
                    <td>{fileData.fileName}</td>
                    <td>{fileData.ownerShip}</td>
                    <td>{fileData.ipfsHash[fileData.ipfsHash.length-1]}</td>
                    <td>{fileData.fileHash[fileData.fileHash.length -1]}</td>
                    <td>{fileData.createdAt}</td>
                    <td>
                        <button onClick={()=>handleView(fileData.ipfsHash[fileData.ipfsHash.length-1],fileData.uniqueNumber)}>View</button>
                    </td>
                </tr>
                        
        </>
    )
}

function EditSingleFile({fileData}){
    const {state} = useLocation();
    const {userName} = useParams();
    const fileInputRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [newFile, setnewFile] = useState()

    const ipfs = ipfsHttpClient({
        url: "https://ipfs.infura.io:5001/api/v0",
        headers:{
            authorization
        }
    })

    const handleView = async(filepath,uniqueNumber)=>{
        try{
            await window.ethereum.request({method:'eth_requestAccounts'});
            window.web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.enable()
            const contract = await new window.web3.eth.Contract(JSON.parse(contractABI()),contractAddress())
            const randomNum = Math.floor(Math.random() * 90000) + 10000;
            await contract.methods.storeRandomNumber(randomNum).send({from :accounts[0]})
                .then(async(response)=>{
                    await axios.post("/file/view-logged/",{
                        "userTouchedBy":userName,
                        uniqueNumber
                    })
                    .then((response)=>{
                        console.log(response)
                        window.location.replace(`https://sitdocumentupoload.infura-ipfs.io/ipfs/${filepath}`)
                    })
                    .catch((error)=>{
                        throw(error)
                    })
                })
                .catch((error)=>{
                    throw(error)
                })
        }catch(error){
            console.log(error)
            alert("Somethig went wrong")
        }
    }
    const handleButtonClick = () => {
        fileInputRef.current.click();
        
    };
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFileName(file ? file.name : '');
        setnewFile(file)
    };

    async function getContentHash(file) {
        const fileBuffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', fileBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        console.log(hashHex)
        return hashHex;
    }

    const handleEditFile = async(uniqueNumber,prevIpfsHash,prevFileHash)=>{
        try{
            const {path}= await ipfs.add(newFile)

            await window.ethereum.request({method:'eth_requestAccounts'});
            window.web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.enable()
            const contract = await new window.web3.eth.Contract(JSON.parse(contractABI()),contractAddress())
            const randomNum = Math.floor(Math.random() * 90000) + 10000;

            await contract.methods.storeRandomNumber(randomNum).send({from :accounts[0]})

            const contentHash = await getContentHash(newFile)
            await axios.post("/file/edit-logged",{
                "userTouchedBy":userName,
                uniqueNumber,
                "newIpfsHash":path,
                "newFileHash":contentHash,
                prevIpfsHash,
                prevFileHash
            })
            .then((response)=>{
                alert("Edit logged sucessfully")
            })
            .catch((err)=>{
                console.log(err)
                throw(err)
            })
        }catch(error){
            console.log(error)
            alert("Something went wrong")
        }
    }
    return (
        <>

                <tr>
                    <td>{fileData.fileName}</td>
                    <td>{fileData.ownerShip}</td>
                    <td>{fileData.ipfsHash[fileData.ipfsHash.length-1]}</td>
                    <td>{fileData.fileHash[fileData.fileHash.length -1]}</td>
                    <td>{fileData.createdAt}</td>
                    <td><button onClick={()=>handleView(fileData.ipfsHash[fileData.ipfsHash.length-1],fileData.uniqueNumber)}>View</button></td>
                    <td>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        {
                        newFile?
                        <>
                            <button onClick={()=>handleEditFile(fileData.uniqueNumber,fileData.ipfsHash[fileData.ipfsHash.length-1],fileData.fileHash[fileData.fileHash.length -1])}>Upload File</button>
                            <div>{selectedFileName && `Selected file: ${selectedFileName}`}</div>
                        </>
                        :
                        <>
                            <button onClick={handleButtonClick}>Edit File</button>
                            <div>{selectedFileName && `Selected file: ${selectedFileName}`}</div>
                        </>
                        }
                        
                    </td>
                </tr>
                        
        </>
    )
}

export default ViewEligibleDocs