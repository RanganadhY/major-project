import React ,{useState,useEffect} from 'react'
import {Link,useLocation,useParams,useNavigate} from "react-router-dom"
import "../css/fileUpload.css"
//importing required components
import { create as ipfsHttpClient } from "ipfs-http-client";
import { contractABI,contractAddress } from '../env/env';
import Web3 from "web3";
import axios from "../axiois/axios";

import Select from "react-select"

// import { contractABI,contractAddress } from '../env/env';

import Header from "../components/header/header"
const projectId = "2LZpmyIoPzM4PAbxxnaedfnxhTs";
const projectSecret = "20bf09a93834ab63789f53dbfe140aa8";
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);




function FileUpload() {

    const [rows, setrows] = useState([{"key":"1"}])

    const handleAddMoreRows = async()=>{
        const newRow = {"key":"1"}
        setrows([...rows,newRow])
    }
    const {state} = useLocation();
    console.log(state)
    
    const navigate = useNavigate()
    
    // const handleVeiwfile = async()=>{
    //     window.location.replace(`https://sitdocumentupoload.infura-ipfs.io/ipfs/${filepath}`);
    //         }

    const {userName} = useParams();
    console.log(userName)
    const viewMyDocs = async()=>{
        navigate("/view-my-docs",{state:{userName}})
    }
    const viewEligibleMyDocs = ()=>{
        navigate("/view-eligible-docs",{state:{userName}})
    }
    return (
        <>
            {/* <Header/> */}
            <div className='header-wrapper' >
                <div className="username">
                    <h3 style={{letterSpacing:"0.09rem"}}>{state.userDetails.userName.toUpperCase()}</h3>
                </div>
                <div className='mj-header'>

                    <div >
                        <button className='button-9' onClick={viewMyDocs}>View My Docs</button>
                    </div>
                    <div>
                        <button className='button-9' onClick={viewEligibleMyDocs}>View Eligible Docs</button>
                    </div>
                </div>
            </div>
            <div className="file-uploader-main-container">
                {rows.map((index)=>{
                    return(
                        <UploadFile/>
                    )
                })}
                <div>
                    <button onClick={handleAddMoreRows}>Add More</button>
                </div>
                </div>
                    
        </>
    )
}

function UploadFile(){

    const {userName} = useParams()
    const [file, setfile] = useState()
    const [viewers, setViewers] = useState();
    const [editors, setEditors] = useState();
    const [members, setmembers] = useState();

    const [membersOptions, setmembersOptions] = useState()

    useEffect(()=>{
        
        const getAllUsers = async()=>{
            const response = await axios.get("/member/fetch-members/");
            console.log(response.data.userDetails)
            const arr = []
            response.data.userDetails.map((data)=>{
                arr.push({value:data.userName,label:data.userName})
                return 0;
            })
            setmembers(response.data.userDetails);
            setmembersOptions(arr)
            
        }
        getAllUsers()
    },[])

    const ipfs = ipfsHttpClient({
        url: "https://ipfs.infura.io:5001/api/v0",
        headers:{
            authorization
        }
    })
    const handleFileUpload = async()=>{
        const viewAcces =[]
        viewers&&viewers.map((data)=>{
            viewAcces.push(data.value)
            return 0;
        })
        const editAcces =[]
        editors&&editors.map((data)=>{
            editAcces.push(data.value)
            return 0;
        })
        try{
            
            const {path}= await ipfs.add(file)
            await window.ethereum.request({method:'eth_requestAccounts'});
            window.web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.enable()
            console.log(accounts[0])
            const contract = await new window.web3.eth.Contract(JSON.parse(contractABI()),contractAddress())
            console.log(contract)
    
            const contentHash = await getContentHash(file)
            console.log({
                "ipfsHash":path,
                "fileHash":contentHash,
                viewAcces,
                editAcces,
                "ownerShip":userName,
                "fileName":file.name
            })
            
            const message = await contract.methods.addFile(contentHash,path).send({from :accounts[0]})
            console.log(message)
            await axios.post("/member/post-file",{
                "ipfsHash":path,
                "fileHash":contentHash,
                "viewAcces":viewers,
                "editAcces":editors,
                "ownerShip":userName,
                "fileName":file.name
            }).then((response)=>{
                console.log(response)
                alert("Tx sucessfull")
            })
            .catch((error)=>{
                throw(error)
            })
        }catch(err){
            console.log(err)
                alert("Some thing went wrong")
        }
        
    }

    async function getContentHash(file) {
        const fileBuffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', fileBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        console.log(hashHex)
        return hashHex;
    }
    return (
        <>
            <div className="file-uploader-wrapper">
                <div>
                    <label htmlFor="" className='custom-file-upload'>
                        <input 
                            type="file"
                            onChange={(e)=>setfile(e.target.files[0])}
                            />
                    </label>
                </div>
                <div style={{margin:20,width:200}}>
                    <label htmlFor="">Viewrs</label>
                    <Select 
                        options={membersOptions}
                        defaultValue={"-select-"}
                        placeholder="Select the Viewrs"
                        onChange={setViewers}
                        isMulti
                        isSearchable
                        noOptionsMessage={()=>"No Viewrs Found"}
                    />
                </div>
                <div>
                    <label htmlFor="">Editors</label>
                    <Select 
                        options={membersOptions}
                        defaultValue={"-select-"}
                        placeholder="Select the Editors"
                        onChange={setEditors}
                        isMulti
                        isSearchable
                        noOptionsMessage={()=>"No Editors Found"}
                    />
                </div>
                <button
                    onClick={handleFileUpload}
                >Upload
                </button>
                <div>
                    
                </div>
            </div>
            
        </>
    )
}
export default FileUpload