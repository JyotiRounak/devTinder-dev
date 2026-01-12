import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser} from '../utils/userSlice';
import { useNavigate } from "react-router";
import {BASE_URL} from '../utils/constant';

const Login = () => {
  const dispatch = useDispatch();
 const navigate = useNavigate();
 const[emailId, setEmailId] = useState("Simran@gmail.com");
 const [password, setPassword] = useState("Simran@123");
 const [error, setError] = useState("");


 const handleLogin = async()=>{
    try{
      const response =  await axios.post(`${BASE_URL}login`, {
        emailId,
        password
     }, {withCredentials: true});
     dispatch(addUser(response.data));
     navigate("/")
    }
    catch(error: any){
        setError(error.response?.data || "Something went wrong")
    }
 }
  return (
    <div className="flex justify-center m-20">
    <div className="card bg-base-300  w-96 shadow-sm">
        <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <div className="p-2">
                <label className="form-control">
  <div className="label">
    <span className="label-text">Email Id</span>
  </div>
  <input type="text"  className="input" 
  value={emailId} 
  onChange={(e)=> setEmailId(e.target.value)}/>
</label>
<label className="form-control">
  <div className="label">
    <span className="label-text">password</span>
  </div>
  <input type="password" className="input" 
  value={password}
  onChange={(e)=> setPassword(e.target.value)}
  />
</label>
            </div>
           {error && <p className="text-red-300">{error}</p>}
  
            <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login