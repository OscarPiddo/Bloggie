import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/Post";
import Avatar1 from "../assets/Images/Avatars/Greg.png";
import Avatar2 from "../assets/Images/Avatars/John.png";
import Avatar3 from "../assets/Images/Avatars/Stella.png";
import City from "../assets/Images/city.jpg";
import City2 from "../assets/Images/city2.jpg";
import Food from "../assets/Images/food.jpg";
import Nature from "../assets/Images/nature.jpg";

function Feeds() {
  // Example posts with corrected image structure
  const examplePosts = [
    {
      author: "Greg Ssema",
      date: "September 21, 2024",
      content: "Had a great day exploring the city!",
      images: [City, City2],
      profilePicture: Avatar1,
    },
    {
      author: "John Otim",
      date: "September 20, 2024",
      content: "Loving this new recipe I tried today. 🍳",
      images: [Food],
      profilePicture: Avatar2,
    },
    {
      author: "Stella Nankya",
      date: "September 18, 2024",
      content: "Nature always calms my soul. 🌿",
      images: [Nature],
      profilePicture: Avatar3,
    },
  ];

  const [apiPosts, setApiPosts] = useState([]);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
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

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  // Cleanup image previews on unmount
  useEffect(() => {
    return () => images.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  // Create a new post
  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("Post content cannot be empty!");
      return;
    }

    const newPost = {
      author: "Current User", // Replace with logged-in user details
      date: new Date().toISOString(),
      content,
      images,
      profilePicture: "https://via.placeholder.com/50?text=User", // Replace dynamically
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
    setImages([]);
    e.target.reset();
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
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="text-sm"
            />
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
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
            {error}. However, example posts are shown below:
          </p>
        )}

        {/* API Posts */}
        {apiPosts.length > 0 &&
          apiPosts.map((post, index) => (
            <Post
              key={`api-${post.id || index}`}
              author={post.author || "Anonymous"}
              date={post.date || "Unknown Date"}
              content={post.content || ""}
              images={Array.isArray(post.images) ? post.images : []}
              profilePicture={post.profilePicture || "https://via.placeholder.com/50"}
            />
          ))}

        {/* Example Posts */}
        {examplePosts.map((post, index) => (
          <Post
            key={`example-${index}`}
            author={post.author}
            date={post.date}
            content={post.content}
            images={post.images}
            profilePicture={post.profilePicture}
          />
        ))}
      </div>
    </div>
  );
}

export default Feeds;
