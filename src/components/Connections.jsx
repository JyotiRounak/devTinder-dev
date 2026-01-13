import axios from "axios";
import { BASE_URL} from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import {getConnection} from '../utils/connectionSlice';
import { useEffect } from "react";

const Connections = () => {
  const connections = useSelector((store)=> store.connection);
  const dispatch = useDispatch();

  
  const fetchConnection = async()=>{
    try {
    const response = await axios.get(`${BASE_URL}user/connections`, {withCredentials: true});
    dispatch(getConnection(response.data.data));
    } catch (error) {
        console.warn(error)
    }
    
  }
  useEffect(()=>{
    fetchConnection();
  }, []);
  if(!connections) return;
  if(connections.length === 0) return <h2>No Connections found</h2>
  return (
    <div className="flex flex-col items-center my-10 px-6">
  <h1 className="text-3xl font-bold mb-8">My Connections</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
    {connections.map((connection) => (
      <div
        key={connection._id}
        className="card bg-base-200 shadow-md hover:shadow-xl transition-shadow"
      >
        <figure className="px-6 pt-6">
          <img
            src={connection.photoUrl}
            alt={`${connection.firstName} ${connection.lastName}`}
            className="rounded-full w-32 h-32 object-cover"
          />
        </figure>

        <div className="card-body items-center text-center">
          <h2 className="card-title">
            {connection.firstName} {connection.lastName}
          </h2>

          {connection.about && (
            <p className="text-sm opacity-80 line-clamp-2">
              {connection.about}
            </p>
          )}

          {connection.skills && (
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {connection.skills}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default Connections