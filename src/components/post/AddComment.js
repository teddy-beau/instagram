import { useState, useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../../context/user";
import FirebaseContext from "../../context/firebase";

const AddComment = ({ docId, comments, setComments, commentInput }) => {
   const [comment, setComment] = useState("");
   const { firebase, FieldValue } = useContext(FirebaseContext);
   const {
      user: { displayName },
   } = useContext(UserContext);

   const handleSubmitComment = (event) => {
      event.preventDefault();

      setComments([{ displayName, comment }, ...comments]);
      setComment(""); // clear the input field

      return firebase
         .firestore()
         .collection("photos")
         .doc(docId)
         .update({ comments: FieldValue.arrayUnion({ displayName, comment }) });
   };

   return (
      <div className="border-t border-gray-primary">
         <form
            method="POST"
            className="flex justify-between pl-0 pr-5"
            onSubmit={(event) =>
               comment.length >= 1
                  ? handleSubmitComment(event)
                  : event.preventDefault()
            }
         >
            <input
               type="text"
               aria-label="Add a comment"
               autoComplete="off"
               className="text-sm text-gray-base w-full mr-3 py-5 px-4"
               name="add-comment"
               placeholder="Add a comment..."
               value={comment}
               onChange={({ target }) => setComment(target.value)}
               ref={commentInput}
            />
            <button
               className={`text-sm font-bold text-blue-medium ${
                  !comment && "opacity-25"
               }`}
               type="button"
               disabled={comment.length < 1}
               onClick={handleSubmitComment}
            >
               Post
            </button>
         </form>
      </div>
   );
};
export default AddComment;

AddComment.propTypes = {
   docId: PropTypes.string.isRequired,
   comments: PropTypes.array.isRequired,
   setComment: PropTypes.func,
   commentInput: PropTypes.object,
};
