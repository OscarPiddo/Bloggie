import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import Home from "./pages/Home";
import Feeds from "./components/Feeds";
import ProfilePage from "./pages/Profile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Feeds",
    element: <Feeds />,
  },
  {
    path: "/Profile",
    element: <ProfilePage />,
  },
 
]);

function App() {
  return (
    <div>
      <ToastContainer />  
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
