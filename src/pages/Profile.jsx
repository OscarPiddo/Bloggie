import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import Sidebar from "../components/SideBar";
import ProfilePicture from "../assets/Images/Avatars/ProfileUser.png";
import axios from "axios";

function ProfilePage() {
  // User info (can be replaced with props/context if dynamic)
  const [userInfo] = useState({
    name: "Oliver Twist",
    username: "callmeoliver",
    bio: "It's Me, Hi!!! I'm the problem, it's ME!!!",
    profilePicture: ProfilePicture,
    joinedDate: "January 2023",
  });

  // State for posts, loading, and error handling
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts and filter by username
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://davidwaga.pythonanywhere.com/api/v1/post"
        );

        // Log the response for debugging
        console.log("API Response:", response.data);

        // Filter posts by the current user's username
        const filteredPosts = response.data.filter(
          (post) => post.author === userInfo.username
        );

        setUserPosts(filteredPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userInfo.username]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 flex-1 bg-gray-50 min-h-screen">
        <div className="container mx-auto py-8 px-4">
          {/* Profile Header */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-4">
              <img
                src={userInfo.profilePicture}
                alt={`${userInfo.name}'s profile`}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {userInfo.name}
                </h1>
                <p className="text-sm text-gray-500">@{userInfo.username}</p>
                <p className="text-gray-700 text-sm mt-2">{userInfo.bio}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Joined {userInfo.joinedDate}
                </p>
              </div>
            </div>
          </div>

          {/* User Posts */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Your Posts</h2>
            {loading ? (
              <p className="text-gray-600">Loading posts...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : userPosts.length > 0 ? (
              userPosts.map((post) => (
                <Post
                  key={post.id} // Use unique ID from API
                  author={post.author}
                  date={post.created_at} // Adjust to match API field
                  content={post.content}
                  images={post.images || []} // Default to empty array if missing
                  profilePicture={userInfo.profilePicture} // Assume user's own picture
                />
              ))
            ) : (
              <p className="text-gray-600">You haven't created any posts yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
