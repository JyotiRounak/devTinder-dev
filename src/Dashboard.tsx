import { Outlet } from "react-router"
import Navbar from "./navbar/Navbar"
import Footer from "./Footer"

export const Dashboard = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
