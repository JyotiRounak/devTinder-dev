import axios from "axios";
import {useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL} from '../../utils/constant';
import { removeUser } from '../../utils/userSlice';

const Navbar = () =>{
    const user = useSelector((store)=> store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async()=>{
      try {

        await axios.post(`${BASE_URL}logout`, {}, { withCredentials: true});
        dispatch(removeUser());
        navigate("/login")

      } catch (error) {
        console.error(error)
      }

    }
    return (
        <>
        <div className="navbar bg-base-100/80 backdrop-blur-md shadow-md sticky top-0 z-50">
  <div className="flex-1">
    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-pink-500">
  <span className="text-2xl">👩🏻‍💻</span> DevConnect
</Link>
  </div>
  {user && (<div className="flex gap-2">
    <div className="dropdown dropdown-end mx-5 flex item-center">
      <div className="hidden sm:block text-right mr-2">
  <p className="text-sm text-gray-500">Welcome</p>
  <p className="font-semibold">{user?.firstName}</p>
</div>

      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full ring-2 ring-pink-400">
          <img
            alt={user.firtName}
            src={user.photoUrl}/>
        </div>
      </div>
      <ul
       // tabIndex="-1"
        className="menu menu-sm dropdown-content mt-3 w-52 rounded-xl bg-white shadow-lg border border-gray-100">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><Link to="/premium">Premium Plan </Link></li>
        <li>
  <button onClick={logoutHandler} className="text-red-500 hover:bg-red-50">
    Logout
  </button>
</li>
      </ul>
    </div>
  </div>)}
</div>
        </>
    )
}

export default Navbar;