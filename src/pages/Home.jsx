import React from "react";
import Sidebar from "../components/SideBar";
import Feeds from "../components/Feeds";

const Home = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 flex-1 bg-gray-50 min-h-screen">
        <div className="container mx-auto py-8 px-4">
          <Feeds />
        </div>
      </div>
    </div>
  );
};

export default Home;
