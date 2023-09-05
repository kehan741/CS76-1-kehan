// import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Forget from "./pages/Forget";
import Change from "./pages/Change";
import EquipmentRegister from "./pages/EquipmentRegister";
import Search from "./pages/Search";
import Notification from "./pages/Notification";
import Usercenter from "./pages/Usercenter";
import NavSection from "./components/Navbar/navbar";

import {
  createBrowserRouter,
} from "react-router-dom";
const routers = createBrowserRouter([
  {
    path: "/",
    element: <div><NavSection /></div>,
    errorElement: <p>404 !</p>
    },  {
      path: "/dashboard",
      element: <Dashboard />,
    },  {
      path: "/login",
      element: <Login />,
    },  {
      path: "/register",
      element: <Register />
    },{
      path: "/forgetpwd",
      element: <Forget />
    },{
      path: "/changepwd",
      element: <Change />
  },{
      path: "/equipmentregister",
      element: <EquipmentRegister />
  },{
      path: "/search",
      element: <Search />
  },{
      path: "/notification",
      element: <Notification />
  },{
      path: "/usercenter",
      element: <Usercenter />
  }
  
  
  
]);


export default routers

