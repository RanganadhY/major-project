import React, { useState,useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import Web3 from "web3";
import { contractABI,contractAddress } from '../../env/env';
import axios from "../../axiois/axios"
import "../../css/adminLogoin.css"

function AdminLogin() {
    const navigate = useNavigate();
    
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [metamaskAddress, setmetamaskAddress] = useState()
    useEffect(()=>{
        getconst()
        async function getconst(){
            await window.ethereum.request({method:'eth_requestAccounts'});
            window.web3 = new Web3(window.ethereum);
            // const accounts = await window.web3.eth.getAccounts()
            const accounts = await window.ethereum.enable()
            setmetamaskAddress(accounts[0])
            console.log(accounts[0])
            const contract = await new window.web3.eth.Contract(JSON.parse(contractABI()),contractAddress())
        }
    
    },[])
    const handleLogin = async()=>{
        const response = await axios.post("/auth/member-login",{
            email,
            password
        })
        console.log(response)        
        navigate(`/member-home-page/${response.data.userDetails.userName}`,{state:{"userDetails":response.data.userDetails}})
    }
    const handleRegister = async()=>{
        navigate("/member-register")
    }
    return (
        <div className='adminLogin-main-conatiner'>
            <div className='al-heading'>
                <h2>Admin Login</h2>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                    id='email'
                    value={email}
                    onChange={(e)=>setemail(e.target.value)}
                    type="email"  />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input 
                    id='password'
                    value={password}
                    onChange={(e)=>setpassword(e.target.value)}
                    type="text" />
            </div>
            <div>
                <label htmlFor="walletAddress">Wallet Address</label>
                <input 
                    value={metamaskAddress}
                    readOnly
                    type="text" />
            </div>
            <div>
                <button onClick={handleLogin}>Submit</button>
            </div>
            <div>
                <Link className='register-button' to="/member-register">Register</Link>
            </div>
        </div>  
    );
}

export default AdminLogin