import { useState } from "react";
import axios from "axios";

const Login = () => {
 const[emailId, setEmailId] = useState("");
 const [password, setPassword] = useState("");

 const handleLogin = async()=>{
    try{
        axios.post("http://localhost:3000/login", {
        emailId,
        password
     }, {withCredentials: true});
    }
    catch(err){
        console.log("Error:"+ err)
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
  <input type="text" className="input" 
  value={password}
  onChange={(e)=> setPassword(e.target.value)}
  />
</label>
            </div>
            <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login