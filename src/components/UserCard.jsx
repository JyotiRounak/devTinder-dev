import axios from "axios";
import { BASE_URL} from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
const UserCard = ({ user, editPage }) => {
  const dispatch = useDispatch();
  if (!user) return null;
  const { _id, firstName, lastName, gender, age, photoUrl, about} = user;

  const handleSendRequest = async(status, userId)=>{
    try {
      await axios.post(`${BASE_URL}request/send/${status}/${userId}`, {}, { withCredentials: true});
      dispatch(removeFeed(userId));
    } 
    catch (error) {
      console.warn(error);
    }
  }

  return (
    <div className="card bg-white w-96 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <figure className="relative h-96">
        <img
          src={photoUrl}
          alt={firstName}
          className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6">
          <h2 className="card-title text-white text-3xl">
            {firstName + " " + lastName} 
          </h2>
          <div className="flex gap-2 text-gray-300 text-sm mb-2">
           {age && <span className="badge bg-pink-500 border-none text-white">{age} years</span> }
            {gender && <span className="badge bg-purple-500 border-none text-white">{gender}</span> }
          </div>
          <p className="text-gray-200">{about}</p>
        </div>
      </figure>
      
      {!editPage && <div className="card-actions justify-center gap-4 p-6">
        <button className="btn btn-circle btn-lg bg-white shadow-md hover:bg-red-50 border-none hover:scale-110 transition" 
        onClick={()=>handleSendRequest("ignored", _id)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <button className="btn btn-circle btn-lg bg-gradient-to-r from-pink-500 to-red-500 border-none shadow-lg hover:scale-110 transition" onClick={()=>handleSendRequest("interested", _id)}>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>}
    </div>
  );
};

export default UserCard