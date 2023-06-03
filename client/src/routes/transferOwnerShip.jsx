import React,{useState,useEffect} from 'react'
import { useParams,useLocation } from 'react-router'
import axios from "../axiois/axios";
import Select from "react-select"
import { contractABI,contractAddress } from '../env/env';
import Web3 from "web3"

import "../css/tranferOwnerShip.css"

function TransferOwnerShip() {
const {state} = useLocation()

const {userName,fileNumber,fileName} = useParams()

const [membersOptions, setmembersOptions] = useState()
const [newOwner, setnewOwner] = useState()

    useEffect(()=>{
        
        const getAllUsers = async()=>{
            const response = await axios.get("/member/fetch-members/");
            const arr = []
            response.data.userDetails.map((data)=>{
                arr.push({value:data.userName,label:data.userName})
                return 0;
            })
            setmembersOptions(arr)
            
        }
        getAllUsers()
    },[])

        const handleTransfer = async()=>{
            try{
                const freshOwner = newOwner.value
                console.log(userName,freshOwner)
                await window.ethereum.request({method:'eth_requestAccounts'});
                window.web3 = new Web3(window.ethereum);
                const accounts = await window.ethereum.enable()
                const contract = await new window.web3.eth.Contract(JSON.parse(contractABI()),contractAddress())
                const mesage = await contract.methods.transferOwnership(userName,freshOwner).send({from :accounts[0]})
                const response = await axios.post("/file/transfer-owner/",{fileNumber,"newOwner":newOwner.value})
                alert(`Ownership transfered to ${newOwner.value} Sucessfully  `)
            }catch(e){
                console.log(e)
                alert("Something went wrong")
            }
        }

    return (
        <>
            <div className="to-main-container">
                <div className="to-heading">
                    <h3>Transfer Ownership</h3>
                </div>

                <div className="to-file-number">
                    <h4>{fileName}</h4>
                </div>

                <div className="to-container">
                    <div className='to-select' style={{margin:20,width:200}}>
                        <label htmlFor="">Users</label>
                        <Select 
                            options={membersOptions}
                            defaultValue={"-select-"}
                            placeholder="Select the Viewrs"
                            onChange={setnewOwner}
                            isSearchable
                            noOptionsMessage={()=>"No Viewrs Found"}
                        />
                    </div>

                    <div className='transfer-button'>
                        <button onClick={handleTransfer} >Transfer</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransferOwnerShip