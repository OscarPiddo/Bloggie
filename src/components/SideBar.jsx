import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; 
import Logo from "../assets/Images/Bloggie.png";
import Avatar1 from "../assets/Images/Avatars/Greg.png";
import Avatar2 from "../assets/Images/Avatars/Stella.png";
import Avatar3 from "../assets/Images/Avatars/Resty.png";

const Sidebar = () => {
  const { logout } = useContext(UserContext); // Access logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear token and logout
    navigate("/", { state: { message: "Successfully logged out!" } });
  };

  // Suggestions data for display in the sidebar
  const suggestions = [
    { name: "Ivan Rasta", profilePic: Avatar1 },
    { name: "Martha Apio", profilePic: Avatar2 },
    { name: "Recky Siima", profilePic: Avatar3 },
  ];

  return (
    <div className="bg-white shadow h-screen w-64 fixed top-0 left-0 z-10 flex flex-col justify-between">
      {/* Top Section */}
      <div className="p-6">
        {/* Logo */}
        <Link to="/Home" className="mb-8 flex justify-center group">
          <img
            src={Logo}
            alt="Bloggie Logo"
            className="h-12 w-auto transition-transform transform group-hover:scale-110 group-hover:rotate-6 duration-300"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          {["Home", "Profile"].map((item) => (
            <Link
              key={item}
              to={`/${item}`}
              className="text-gray-600 hover:text-brand hover:bg-gray-100 py-2 px-4 rounded transition-transform transform hover:translate-x-2 hover:scale-105 duration-300"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-6 space-y-8">
        {/* Suggestions Section */}
        <div>
          <h2 className="text-gray-800 font-semibold mb-4">Suggestions</h2>
          <ul className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={suggestion.profilePic}
                    alt={`${suggestion.name}'s profile`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-gray-600">{suggestion.name}</span>
                </div>
                <button className="text-sm text-brand hover:underline">Follow</button>
              </li>
            ))}
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
