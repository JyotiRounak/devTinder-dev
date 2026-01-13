import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL} from '../utils/constant';
import { useDispatch } from "react-redux";
import {addUser} from '../utils/userSlice';

const EditProfile = ({user}) => {
  const dispatch = useDispatch();
  const[error, setError] = useState("");
  const [formData, setFormData] = useState({
  firstName: user.firstName || "",
  lastName: user.lastName || "",
  age: user.age || "",
  //gender: user.gender || "",
  about: user.about || "",
  photoUrl: user.photoUrl || "",
  skills: user.skills || "",
});

  
  const changeHandler = (event)=>{
    const { value, name} = event.target;
    setFormData((prev)=>({
      ...prev,
      [name]: value
    }));      
  }
  
  const { firstName, lastName, age, skills, about, photoUrl} = formData;
  const saveProfile = async(e)=>{
    e.preventDefault();
    setError("");
    try {
      const response = await axios.patch(`${BASE_URL}profile/edit`, {firstName, lastName, age: Number(age), skills, about, photoUrl},
        {withCredentials: true,
        });
      dispatch(addUser(response?.data.data));

    } catch (error) {
      setError(error.response?.data.message)
    }
       
       
  }
  return (
    <div className="flex justify-center my-10">
    <div className="flex justify-center mx-10">
      <div className="card bg-base-300 w-96 shadow-lg">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          
          <form onSubmit={saveProfile}>
            <label className="form-control">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input 
              type="text" 
              name="firstName"
              value={firstName} 
              placeholder="First Name" 
              className="input input-bordered"
              onChange={changeHandler}
               />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input 
              type="text" 
              name="lastName"
              value={lastName} 
              placeholder="Last Name" 
              className="input input-bordered"
              onChange={changeHandler}
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input 
              type="number"
              name="age"
               value={age} 
               placeholder="Age" 
               className="input input-bordered"
               onChange={changeHandler}
                />
            </label>

            {/* <label className="form-control">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <select className="select select-bordered">
                <option disabled>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label> */}

            <label className="form-control">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <textarea 
              name="about"
              value={about} 
              className="textarea textarea-bordered" 
              placeholder="Tell about yourself"
               onChange={changeHandler}
              ></textarea>
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Photo URL</span>
              </div>
              <input 
              type="text"
              name="photoUrl"
               placeholder="Photo URL"
                className="input input-bordered"
                value={photoUrl}
                 onChange={changeHandler}
                 />
            </label>

            <div className="card-actions justify-center gap-4 mt-6">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <UserCard user={{firstName, lastName, age, about, skills, photoUrl}}/>
    </div>
  )
}

export default EditProfile;