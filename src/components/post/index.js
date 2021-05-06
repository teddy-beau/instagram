import { useRef } from "react";
import PropTypes from "prop-types";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import PostFooter from "./PostFooter";

const Post = ({ content }) => {
   const commentInput = useRef(null);

   const handleFocus = () => commentInput.current.focus();

   // header, image, like & comment buttons, footer, comments
   return (
      <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
         <PostHeader username={content.username} />
         <PostImage src={content.imageSrc} caption={content.caption} />
         <PostActions
            docId={content.docId}
            totalLikes={content.likes.length}
            likedPhoto={content.userLikedPhoto}
            handleFocus={handleFocus}
         />
         <PostFooter caption={content.caption} username={content.username} />
      </div>
   );
};
export default Post;

Post.propTypes = {
   content: PropTypes.shape({
      username: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      docId: PropTypes.string.isRequired,
      userLikedPhoto: PropTypes.bool.isRequired,
      likes: PropTypes.array.isRequired,
      comments: PropTypes.array.isRequired,
      dateCreated: PropTypes.number.isRequired,
   }),
};
