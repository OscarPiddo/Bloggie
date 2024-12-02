import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import Home from "./pages/Home";
import Feeds from "./components/Feeds";
import ProfilePage from "./pages/Profile";
import { UserProvider } from "./context/UserContext"; 
import ProtectedRoute from "./components/ProtectedRoute"; 

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
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Feeds",
    element: (
      <ProtectedRoute>
        <Feeds />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <UserProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
