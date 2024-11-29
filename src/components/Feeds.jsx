import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/Post";
import ProfilePicture from "../assets/Images/Avatars/ProfileUser.png";

function Feeds() {
  const [apiPosts, setApiPosts] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://davidwaga.pythonanywhere.com/api/v1/post"
        );
        setApiPosts(response.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts from the API.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Create a new post
  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("Post content cannot be empty!");
      return;
    }

    const newPost = {
      title: "My New Post", // Add a default title or prompt user for one
      content,
    };

    try {
      const response = await axios.post(
        "https://davidwaga.pythonanywhere.com/api/v1/post",
        newPost
      );

      setApiPosts([response.data, ...apiPosts]);
      alert("Post created successfully!");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post. Please try again.");
    }

    // Reset form
    setContent("");
  };

  return (
    <div className="pt-4 px-2">
      {/* Create Post Form */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Create a Post</h2>
        <form onSubmit={handleCreatePost} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full bg-gray-100 rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-[#ff5722] text-white font-medium hover:bg-[#e64a19]"
          >
            Post
          </button>
        </form>
      </div>

      {/* Posts Container */}
      <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
        {loading && <p className="text-gray-600">Loading posts...</p>}

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        {apiPosts.map((post) => (
          <Post
            key={post.id}
            author="API User"
            date={new Date(post.created_at).toLocaleDateString()}
            title={post.title}
            content={post.content}
            profilePicture={ProfilePicture}
          />
        ))}
      </div>
    </div>
  );
}

export default Feeds;
