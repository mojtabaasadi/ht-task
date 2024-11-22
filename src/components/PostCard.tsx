import React,{ memo, SyntheticEvent } from "react";
import useStore from "../store/useStore";
const NO_IMAGE_URL = "https://placehold.co/600x600?text=No+Image"
interface PostCardProps {
  id: number;
  author: string;
  content: string;
  image: string;
  liked: boolean;
}

const PostCard = (props:PostCardProps) => {
  const {
    id,
    author,
    content,
    image,
    liked
  } = props
  const toggleLike = useStore((state) => state.toggleLike);
  const onImageNotFound = (e:SyntheticEvent<HTMLImageElement>)=>{
    if(e.currentTarget.src !== NO_IMAGE_URL){
      e.currentTarget.src = NO_IMAGE_URL
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-4 mb-4 ">
       <h2 className="font-bold text-lg">{author}</h2>
        <p className="my-2">{content}</p>
        <img
          src={image ?? NO_IMAGE_URL}
          alt="Post"
          className="w-full h-96 object-cover mb-2 rounded"
          onError={onImageNotFound} 
          />

      <button
        onClick={() => toggleLike(id)}
        className={`px-4 py-2 rounded ${
          liked ? "bg-red-500 text-white" : "bg-gray-200 dark:bg-gray-700"
        }`}
      >
        {liked ? "Unlike" : "Like"}
      </button>
    </div>
  );
};

export default memo(PostCard);
