import { memo, SyntheticEvent, useState, MouseEvent } from "react";
import useStore from "../store/useStore";
import { createPortal } from "react-dom";
import { useToaster } from "./Toasts";
const NO_IMAGE_URL = "https://placehold.co/600x600?text=No+Image"
interface PostCardProps {
  id: number;
  author: string;
  content: string;
  image: string;
  liked: boolean;
}

const PostCard = (props: PostCardProps) => {
  const {
    id,
    author,
    content,
    image,
    liked
  } = props
  const toggleLike = useStore((state) => state.toggleLike);
  const toggleSave = useStore((state) => state.toggleSave);
  const saved = useStore((state) => state.bookmarks.includes(id));
  const [showReportModal, setShowReportModal] = useState(false)
  const showToast = useToaster()

  const onImageNotFound = (e: SyntheticEvent<HTMLImageElement>) => {
    if (e.currentTarget.src !== NO_IMAGE_URL) {
      e.currentTarget.src = NO_IMAGE_URL
    }
  }

  const dismissModal = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.isSameNode(e.target as HTMLElement)) {
      setShowReportModal(false)
    }
  }
  const sendReport = (reason: string) => {
    showToast(`Reported ${reason}`)
    setShowReportModal(false)
  }

  return (<>
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md shadow-md p-4 mb-4 sm:w-[49%] lg:w-[32%] w-full">
      <h2 className="font-bold text-lg ">{author}</h2>
      <p className="my-2">{content}</p>
      <img
        src={image ?? NO_IMAGE_URL}
        alt="Post"
        className="w-full h-96 object-cover mb-2 rounded"
        onError={onImageNotFound}
      />
      <div className="flex flex-row justify-between" >
        <button
          onClick={() => toggleLike(id)}
          className={`px-4 py-2 rounded ${liked ? "bg-red-500 text-white" : "bg-gray-200 dark:bg-gray-700"
            }`}
        >
          {liked ? "Unlike" : "Like"}
        </button>
        <button
          onClick={() => {
            toggleSave(id)
            if (!saved)
              showToast(`Bookmarked ${author}'s post`)
          }}
          className={`px-4 py-2 rounded ${saved ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
            }`}
        >
          {saved ? "Unsave" : "Save"}
        </button>
        <button
          onClick={() => setShowReportModal(prev => !prev)}
          className={`px-4 py-2 rounded bg-gray-200 dark:bg-gray-700`}
        >
          Report it
        </button>
      </div>
    </div>
    
    {showReportModal && createPortal(<div
      onClick={dismissModal}
      className="fixed top-0 left-0 h-dvh w-dvw flex flex-col items-center justify-center dimmer">
      <dialog open className="bg-white dark:bg-gray-800 rounded-lg text-black dark:text-white p-3 min-w-1/2">
        <h4 className="text-2xl">Reporting {author}'s post</h4>
        <p>why do you want to report this post?</p>
        <div className="flex flex-col">
          <button
            onClick={() => sendReport("Misinformaion")}
            className="bg-blue-200 dark:bg-blue-800 p-3 rounded-sm my-1">Misinformaion</button>
          <button
            onClick={() => sendReport("Fake news")}
            className="bg-blue-200 dark:bg-blue-800 p-3 rounded-sm my-1">Fake news</button>
          <button
            onClick={() => sendReport("Hate Speech")}
            className="bg-blue-200 dark:bg-blue-800 p-3 rounded-sm my-1">Hate Speech</button>
        </div>
        <button onClick={() => setShowReportModal(false)}
          className="bg-gray-200 dark:bg-gray-800 p-2 rounded-md my-1">Close</button>
      </dialog>
    </div>, document.body)}
  </>
  );
};

export default memo(PostCard);
