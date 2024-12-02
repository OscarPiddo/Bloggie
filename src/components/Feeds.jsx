import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Post from "../components/Post";
import ProfilePicture from "../assets/Images/Avatars/ProfileUser.png";

function Feeds() {
  const [apiPosts, setApiPosts] = useState([]);
  const [title, setTitle] = useState(""); // For new post
  const [content, setContent] = useState(""); // For new post
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPost, setEditPost] = useState(null); // Track the post being edited

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

    if (!title.trim() || !content.trim()) {
      toast.error("Both title and content are required!", { position: "top-center" });
      return;
    }

    const newPost = { title, content };

    try {
      const response = await axios.post(
        "https://davidwaga.pythonanywhere.com/api/v1/post",
        newPost
      );

      setApiPosts([response.data, ...apiPosts]);
      toast.success("Post created successfully!", { position: "top-center" });
    } catch (err) {
      console.error("Error creating post:", err);
      toast.error("Failed to create post. Please try again.", {
        position: "top-center",
      });
    }

    // Reset form
    setTitle("");
    setContent("");
  };

  // Open delete confirmation modal
  const openDeleteModal = (id) => {
    setDeletePostId(id);
    setIsModalOpen(true);
  };

  // Confirm and delete the post
  const handleDeletePost = async () => {
    try {
      await axios.delete(
        `https://davidwaga.pythonanywhere.com/api/v1/post/${deletePostId}`
      );

      setApiPosts(apiPosts.filter((post) => post.id !== deletePostId));
      toast.success("Post deleted successfully!", { position: "top-center" });
    } catch (err) {
      console.error("Error deleting post:", err);
      toast.error("Failed to delete post. Please try again.", {
        position: "top-center",
      });
    } finally {
      setIsModalOpen(false);
      setDeletePostId(null);
    }
  };

  // Open edit modal
  const handleEditPost = (postId) => {
    const postToEdit = apiPosts.find((post) => post.id === postId);
    if (postToEdit) {
      setEditPost(postToEdit);
    }
  };

  // Save edited post
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `https://davidwaga.pythonanywhere.com/api/v1/post/${editPost.id}`,
        { title: editPost.title, content: editPost.content }
      );

      setApiPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editPost.id ? { ...post, ...response.data } : post
        )
      );

      toast.success("Post updated successfully!", { position: "top-center" });
      setEditPost(null); // Close modal
    } catch (err) {
      console.error("Error updating post:", err);
      toast.error("Failed to update post. Please try again.", {
        position: "top-center",
      });
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditPost(null);
  };

  return (
    <div className="pt-4 px-2">
      {/* Create Post Form */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Create a Post</h2>
        <form onSubmit={handleCreatePost} className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="w-full bg-gray-100 rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
            type="text"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full bg-gray-100 rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-[#ff5722] text-white font-medium transform hover:scale-105 hover:shadow-lg transition-transform duration-300 active:scale-95"
          >
            Post
          </button>
        </form>
      </div>

      {/* Posts Container */}
      <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
        {loading && <p className="text-gray-600">Loading posts...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {apiPosts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author="API User"
            date={new Date(post.created_at).toLocaleDateString()}
            title={post.title}
            content={post.content}
            profilePicture={ProfilePicture}
            onEdit={() => handleEditPost(post.id)}
            onDelete={() => openDeleteModal(post.id)}
          />
        ))}
      </div>

      {/* Edit Modal */}
      {editPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Edit Post
            </h3>
            <input
              type="text"
              value={editPost.title}
              onChange={(e) =>
                setEditPost({ ...editPost, title: e.target.value })
              }
              className="w-full bg-gray-100 rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff5722] mb-3"
            />
            <textarea
              value={editPost.content}
              onChange={(e) =>
                setEditPost({ ...editPost, content: e.target.value })
              }
              className="w-full bg-gray-100 rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff5722] mb-4"
              rows="4"
            ></textarea>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-800">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePost}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feeds;
