import axios from "axios";
import { BASE_URL} from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import {getRequest, removeRequest} from '../utils/requestSlice';
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store)=> store.request);
  const dispatch = useDispatch();
  // review the connection
  const reviewConnectionRequest = async(status, _id)=>{
    await axios.post(`${BASE_URL}request/review/${status}/${_id}`,{}, {withCredentials: true});
    dispatch(removeRequest(_id));

  }
  const fetchRequestRecieved = async()=>{
    try {
    const response = await axios.get(`${BASE_URL}user/requests/recieved`, {withCredentials: true});
    dispatch(getRequest(response.data.data));
    } catch (error) {
        console.warn(error)
    }
    
  }
  useEffect(()=>{
    fetchRequestRecieved();
  }, []);
  if(!requests) return;
  if(requests.length === 0) return <h2 className="text-2xl font-extrabold mb-10 text-gray-800 text-center m-10">No Request found</h2>
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-10 px-6 flex flex-col items-center">
  <h1 className="text-4xl font-extrabold mb-10 text-gray-800">
  👩🏻‍💻 Connection Requests
</h1>


  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
    {requests.map((request) => (
      <div
        key={request._id}
        className="card bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <figure className="px-6 pt-6">
          <img
            src={request.fromUserId.photoUrl}
            alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
            className="rounded-full w-32 h-32 object-cover ring-4 ring-purple-400 shadow-lg"
          />
        </figure>

        <div className="card-body items-center text-center">
          <h2 className="text-xl font-bold text-gray-800">
            {request.fromUserId.firstName} {request.fromUserId.lastName}
          </h2>

          {request.fromUserId.about && (
            <p className="text-sm opacity-80 line-clamp-2">
              {request.fromUserId.about}
            </p>
          )}

          <div className="flex gap-4 mt-4">
            <button className="btn flex-1 bg-red-100 text-red-600 border-none hover:bg-red-200 hover:scale-105 transition"
             onClick={()=> reviewConnectionRequest("rejected", request._id)}>Reject</button>
            <button className="btn flex-1 bg-red-100 text-red-600 border-none hover:bg-red-200 hover:scale-105 transition"  onClick={()=> reviewConnectionRequest("accepted", request._id)}>Accept</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default Requests