import './App.css';
import {useState,useEffect} from "react"
import {Routes,Route } from "react-router-dom"
import Web3 from "web3";

import AdminsLogin from './routes/auth/memberLogin';
import MemberRegister from './routes/auth/memberRegister';


import ViewMyDocs from './routes/viewMyDocs';
import ViewEligibleDocs from './routes/viewEligibleDocs';
import ViewLogs from './routes/viewLogs';
import TransferOwnerShip from './routes/transferOwnerShip';

import PublicFiles from './routes/publicFiles';

//importing routes
import FileUpload from "./routes/memberHomePage"

function App() {
  const contractABI = '[{"inputs":[{"internalType":"string","name":"_ipfsHash","type":"string"},{"internalType":"string","name":"_contentHash","type":"string"},{"internalType":"address[]","name":"_viewers","type":"address[]"},{"internalType":"address[]","name":"_editors","type":"address[]"}],"name":"addDocument","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"documentId","type":"uint256"}],"name":"DocumentAdded","type":"event"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"documentCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"documents","outputs":[{"internalType":"string","name":"ipfsHash","type":"string"},{"internalType":"string","name":"contentHash","type":"string"},{"internalType":"address","name":"uploader","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_documentId","type":"uint256"}],"name":"getDocument","outputs":[{"internalType":"string","name":"ipfsHash","type":"string"},{"internalType":"string","name":"contentHash","type":"string"},{"internalType":"address[]","name":"viewers","type":"address[]"},{"internalType":"address[]","name":"editors","type":"address[]"},{"internalType":"address","name":"uploader","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_uploader","type":"address"}],"name":"getUploaderDocuments","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]';
  const contractAddress ="0xF94eDD70af2e2FE5a81186d935Db6CC04BF557dE"

  useEffect(() => {
    getconst()
    async function getconst() {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.enable()
        console.log(accounts[0])
        const contract = new window.web3.eth.Contract(JSON.parse(contractABI), contractAddress)
        console.log(contract)
      } else {
        console.log('Please install MetaMask!');
      }
    }
  }, [])
  
  


  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<PublicFiles/>}/>
        <Route path = "/member-home-page/:userName" element={<FileUpload/>}/>
        <Route path='/member-login' element={<AdminsLogin/>}/>
        <Route path='/member-register' element={<MemberRegister/>}/>
        <Route path="/view-my-docs/:userName" element={<ViewMyDocs/>}/>
        <Route path="/view-eligible-docs/:userName" element={<ViewEligibleDocs/>}/>
        <Route path='/view-logs/:userName/:ipfsHash/:fileHash/:uniqueNumber' element={<ViewLogs/>}/>
        <Route path="/ownership-tranfer/:userName/:fileNumber/:fileName" element={<TransferOwnerShip/>}/>
      </Routes>
    </div>
  );
}

export default App;
