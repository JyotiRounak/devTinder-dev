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
  if(requests.length === 0) return <h2>No Request found</h2>
  return (
    <div className="flex flex-col items-center my-10 px-6">
  <h1 className="text-3xl font-bold mb-8">My requests</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
    {requests.map((request) => (
      <div
        key={request._id}
        className="card bg-base-200 shadow-md hover:shadow-xl transition-shadow"
      >
        <figure className="px-6 pt-6">
          <img
            src={request.fromUserId.photoUrl}
            alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
            className="rounded-full w-32 h-32 object-cover"
          />
        </figure>

        <div className="card-body items-center text-center">
          <h2 className="card-title">
            {request.fromUserId.firstName} {request.fromUserId.lastName}
          </h2>

          {request.fromUserId.about && (
            <p className="text-sm opacity-80 line-clamp-2">
              {request.fromUserId.about}
            </p>
          )}

          <div>
            <button className="btn btn-soft btn-error mx-2" onClick={()=> reviewConnectionRequest("rejected", request._id)}>Reject</button>
            <button className="btn btn-soft btn-info"  onClick={()=> reviewConnectionRequest("accepted", request._id)}>Accept</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default Requests