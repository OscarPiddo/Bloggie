import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../assets/Images/Bloggie.png";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens or user data from local storage/session storage
    localStorage.removeItem("authToken");
    // Redirect to login page with a logout success message
    navigate("/", { state: { message: "Logged out successfully!" } });
  };

  return (
    <div className="bg-white shadow h-screen w-64 fixed top-0 left-0 z-10 flex flex-col justify-between">
      {/* Top Section */}
      <div className="p-6">
        {/* Logo */}
        <Link to="/Home" className="mb-8 flex justify-center">
          <img src={Logo} alt="Bloggie Logo" className="h-12 w-auto" />
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          <Link
            className="text-gray-600 hover:text-brand hover:bg-gray-100 py-2 px-4 rounded transition"
            to="/Home"
          >
            Home
          </Link>
          <Link
            className="text-gray-600 hover:text-brand hover:bg-gray-100 py-2 px-4 rounded transition"
            to="/create-post"
          >
            Create Post
          </Link>
          <Link
            className="text-gray-600 hover:text-brand hover:bg-gray-100 py-2 px-4 rounded transition"
            to="/profile"
          >
            Profile
          </Link>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-6 space-y-8">
        {/* Suggestions Section */}
        <div>
          <h2 className="text-gray-800 font-semibold mb-4">Suggestions</h2>
          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Ivan Rasta</span>
              <button className="text-sm text-brand hover:underline">Follow</button>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Opio Chris</span>
              <button className="text-sm text-brand hover:underline">Follow</button>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">Recky Siima</span>
              <button className="text-sm text-brand hover:underline">Follow</button>
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-brand text-white py-2 px-4 rounded shadow hover:bg-opacity-90 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
