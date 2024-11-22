import React,{  useId, useMemo } from "react";
import PostCard from "./PostCard";
import useStore from "../store/useStore";

const Bookmarks: React.FC = () => {
  const posts = useStore((state) => state.posts);
  const bookmarks = useStore((state) => state.bookmarks);
  const bkmarks = useMemo(() => {
    return posts.filter(post => bookmarks.includes(post.id))
  },[bookmarks,posts])
  
  
  return (
    <div className="container mx-auto p-4 min-h-dvh">
      <h1 className="text-2xl text-gray-900 dark:text-gray-200 font-bold mb-4 ">Bookmarks ({bookmarks.length})</h1>
        <div className="  flex gap-2 flex-row flex-wrap">
          {bkmarks.map((post) => (
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

export default Bookmarks;
