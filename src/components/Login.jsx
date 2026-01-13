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
 const[firstName, setFirstName] = useState("");
 const [lastName, setLastName] = useState("");
 const[isLogInForm, setIsLogInForm] = useState(true);
 const [error, setError] = useState("");


 const handleLogin = async()=>{
    try{
      const response =  await axios.post(`${BASE_URL}login`, {
        emailId,
        password
     }, {withCredentials: true});
     dispatch(addUser(response.data.data));
     navigate("/")
    }
    catch(error){
        setError(error.response?.data?.error || error.response?.data || "Something went wrong");

    }
 }
 const handleSignup = async()=>{
  try {
    const response = await axios.post(`${BASE_URL}signup`, 
      {firstName, lastName, emailId, password}, 
      {withCredentials: true});
    dispatch(addUser(response.data.data));
    navigate("/profile");
    
  } catch (error) {
    setError(error.response?.data?.error || error.response?.data || "Something went wrong");
  }
 }
  return (
    <div className="flex justify-center m-20">
    <div className="card bg-base-300  w-96 shadow-sm">
        <div className="card-body">
            <h2 className="card-title justify-center">{isLogInForm ? "Login" : "SignUp"}</h2>
            <div className="p-2">
                {!isLogInForm && <>
                <label className="form-control">
                    <div className="label">
                      <span className="label-text">First Name</span>
                    </div>
                    <input type="text"  className="input" 
                    value={firstName} 
                    onChange={(e)=> setFirstName(e.target.value)}/>
                  </label>
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Last Name</span>
                    </div>
                    <input type="text"  className="input" 
                    value={lastName} 
                    onChange={(e)=> setLastName(e.target.value)}/>
                  </label>
                  </>
                  }
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
            <button className="btn btn-primary" onClick={isLogInForm ? handleLogin: handleSignup}>{isLogInForm ? "Login" : "SignUp"}</button>
            </div>
            <div  className="card-actions justify-center cursor-pointer" onClick={()=> setIsLogInForm((value)=> !value)}>
           {isLogInForm ? "New User? Signup here": "Existing User? Login here"}
           </div>
        </div>
    </div>
    
</div>
  )
}

export default Login