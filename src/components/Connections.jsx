import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getConnection } from "../utils/connectionSlice";
import { useEffect } from "react";
import { Link } from "react-router";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnection = async () => {
    try {
      const response = await axios.get(`${BASE_URL}user/connections`, {
        withCredentials: true,
      });
      dispatch(getConnection(response.data.data));
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    fetchConnection();
  }, []);
  if (!connections) return;
  if (connections.length === 0) return <h2>No Connections found</h2>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-10 px-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
        👩🏻‍💻 My Connections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="card bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <figure className="px-6 pt-6">
              <img
                src={connection.photoUrl}
                alt={`${connection.firstName} ${connection.lastName}`}
                className="rounded-full w-32 h-32 object-cover ring-4 ring-pink-400 shadow-lg"
              />
            </figure>

            <div className="card-body items-center text-center">
              <h2 className="text-xl font-bold text-gray-800">
                {connection.firstName} {connection.lastName}
              </h2>

              {connection.about && (
                <p className="text-sm opacity-80 line-clamp-2">
                  {connection.about}
                </p>
              )}

              {connection.skills && (
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {connection.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-pink-100 text-pink-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <Link to={/chat/ + connection._id}>
              <button class="btn btn-primary btn-circle fixed bottom-6 right-6 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.2-3.6A7.7 7.7 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
