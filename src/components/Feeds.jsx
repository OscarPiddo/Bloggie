import React from "react";
import Post from "../components/Post";
import Avatar1 from "../assets/Images/Avatars/Greg.png";
import Avatar2 from "../assets/Images/Avatars/John.png";
import Avatar3 from "../assets/Images/Avatars/Stella.png";
import Avatar4 from "../assets/Images/Avatars/Resty.png"

function Feeds() {
  const feedData = [
    {
      author: "Greg Ssema",
      date: "September 21, 2024",
      content: "Had a great day exploring the city!",
      images: ["https://source.unsplash.com/random/400x300?city"],
      profilePicture: Avatar1,
    },
    {
      author: "John Otim",
      date: "September 20, 2024",
      content: "Loving this new recipe I tried today. 🍳",
      images: ["https://source.unsplash.com/random/400x300?food"],
      profilePicture: Avatar2,
    },
    {
      author: "Stella Nankya",
      date: "September 18, 2024",
      content: "Nature always calms my soul. 🌿",
      images: ["https://source.unsplash.com/random/400x300?nature"],
      profilePicture: Avatar3,
    },
  ];

  return (
    <div className="pt-4 px-2">
      {/* Posts Container */}
      <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
        {feedData.map((post, index) => (
          <Post
            key={index}
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
