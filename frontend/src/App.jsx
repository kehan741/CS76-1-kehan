import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Outlet } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routers from "./router"
function App() {
  const [count, setCount] = useState(0);

  return (
<RouterProvider router={routers} />
  );
}

export default App;
