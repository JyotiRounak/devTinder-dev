import { Outlet, useNavigate } from "react-router";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const fetchusers = async () => {
    if (userData) return;
    try {
      const response = await axios.get(`${BASE_URL}profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.error(error);
    }
  };
  useEffect(() => {
    fetchusers();
  }, [userData]);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
