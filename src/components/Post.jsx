import React from "react";

function Post({ id, author, date, content, title, profilePicture, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 space-y-3">
      {/* Post Header */}
      <div className="flex items-center space-x-3">
        <img
          src={profilePicture || "https://via.placeholder.com/50?text=User"}
          alt={`${author}'s profile`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-bold text-gray-800 text-sm">{author}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>

      {/* Post Content */}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-800">{content}</p>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 mt-4">
        <button
          onClick={onEdit}
          className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Post;
