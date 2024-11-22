import React from "react";
import PostCard from "./PostCard";
import useStore from "../store/useStore";

const Feed: React.FC = () => {
  const posts = useStore((state) => state.posts);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-gray-900 dark:text-gray-200 font-bold mb-4 ">Posts ({posts.length})</h1>
      <div className=" flex gap-2 flex-row flex-wrap">
        {posts.map((post) => (
          <PostCard
            key={`feed-post-${post.id}`}
            id={post.id}
            author={post.author}
            content={post.content}
            image={post.image}
            liked={post.liked}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
