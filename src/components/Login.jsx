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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-orange-400">
    <div className="card w-[380px] bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl">
        <div className="card-body">
            <div className="flex flex-col items-center mb-4">
  <h1 className="text-3xl font-extrabold text-pink-500 tracking-wide">
    DevConnect
  </h1>
  <p className="text-sm text-gray-500">
    {isLogInForm ? "Welcome back 👋" : "Create your account"}
  </p>
</div>
            <div className="p-2">
                {!isLogInForm && <>
                <label className="form-control">
                    <div className="label">
                      <span className="label-text">First Name</span>
                    </div>
                    <input type="text"  className="input input-bordered w-full bg-white focus:ring-2 focus:ring-pink-400" 
                    value={firstName} 
                    onChange={(e)=> setFirstName(e.target.value)}/>
                  </label>
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Last Name</span>
                    </div>
                    <input type="text"  className="input input-bordered w-full bg-white focus:ring-2 focus:ring-pink-400"
                    value={lastName} 
                    onChange={(e)=> setLastName(e.target.value)}/>
                  </label>
                  </>
                  }
                <label className="form-control">
                    <div className="label">
                      <span className="label-text">Email Id</span>
                    </div>
                    <input type="text"  className="input input-bordered w-full bg-white focus:ring-2 focus:ring-pink-400"
                    value={emailId} 
                    onChange={(e)=> setEmailId(e.target.value)}/>
                  </label>
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">password</span>
                    </div>
                    <input type="password" className="input input-bordered w-full bg-white focus:ring-2 focus:ring-pink-400" 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                  </label>
            </div>
           {error && <p className="text-red-300">{error}</p>}
            <div className="card-actions justify-center">
            <button className="btn w-full bg-gradient-to-r from-pink-500 to-red-500 text-white border-none hover:scale-[1.02] transition"
             onClick={isLogInForm ? handleLogin: handleSignup}>{isLogInForm ? "Login" : "SignUp"}</button>
            </div>
            <div  className="text-center text-sm text-gray-500 mt-4 cursor-pointer hover:text-pink-500 transition"
             onClick={()=> setIsLogInForm((value)=> !value)}>
           {isLogInForm ? "New User? Signup here": "Existing User? Login here"}
           </div>
        </div>
    </div>
    

</div>
  )
}

export default Login