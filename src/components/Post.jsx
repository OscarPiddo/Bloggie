import React from "react";

function Post({ author, date, content, images, profilePicture }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 space-y-3">
      {/* Post Header */}
      <div className="flex items-center space-x-3">
        {/* Profile Picture */}
        <img
          src={profilePicture || "https://via.placeholder.com/50?text=User"}
          alt={`${author}'s profile`}
          className="w-10 h-10 rounded-full object-cover"
        />
        {/* Author Info */}
        <div>
          <p className="font-bold text-gray-800 text-sm">{author}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-sm text-gray-800">{content}</p>

      {/* Post Images */}
      {images && images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {images.map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`Post image ${idx + 1}`}
              className="w-full h-32 object-cover rounded-lg"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found")
              }
            />
          ))}
        </div>
      )}

      {/* Post Footer (Reaction Bar) */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs">
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 text-gray-600 hover:text-[#ff5722]">
            <span>👍</span>
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-[#ff5722]">
            <span>💬</span>
            <span>Comment</span>
          </button>
        </div>
        <button className="text-gray-600 hover:text-[#ff5722]">❤️ React</button>
      </div>
    </div>
  );
}

export default Post;
