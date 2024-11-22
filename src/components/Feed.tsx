import React,{  useId, useMemo } from "react";
import PostCard from "./PostCard";
import useStore from "../store/useStore";

const Feed: React.FC = () => {
  const posts = useStore((state) => state.posts);

  const postCount = useMemo(() => {
    return posts.length
  },[posts])
  
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-gray-900 dark:text-gray-200 font-bold mb-4 ">Posts ({postCount})</h1>{" "}
        <div className=" sm:columns-2 gap-2 sx:columns-1">
          {posts.map((post) => (
            <PostCard
            key={post.id}
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
