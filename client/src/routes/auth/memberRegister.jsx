import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import "../../css/memberRegister.css"
import axios from "../../axiois/axios"

function MemberRegister() {
    const [userName, setuserName] = useState();
    const [password, setpassword] = useState();
    const [email, setemail] = useState();

    const handleRegister = async()=>{
        try{
            const response = await axios.post("/auth/member-register",{email,userName,password})
            alert("Registration sucesafull")
        }catch(e){
            alert("something went wrong")
        }
    }

    return (
        <>
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
                <label htmlFor="text">User Name</label>
                <input 
                    id='password'
                    value={userName}
                    onChange={(e)=>setuserName(e.target.value)}
                    type="text" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input 
                    id='password'
                    value={password}
                    onChange={(e)=>setpassword(e.target.value)}
                    type="password" />
            </div>
            <div>
                <button onClick={handleRegister} >Register</button>
            </div>
            <div>
                <Link to="/member-login" className = "register-button" >Login</Link>
            </div>
        </div> 
        </>
    )
}

export default MemberRegister