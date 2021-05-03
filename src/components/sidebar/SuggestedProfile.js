import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { updateLoggedInUserFollowing } from "../../services/firebase";
import { updateFollowedUserFollowers } from "../../services/firebase";

const SuggestedProfile = ({
   profileDocId,
   loggedInUserDocId,
   username,
   profileId,
   userId,
}) => {
   const [followed, setFollowed] = useState(false);

   const handleFollowUser = async () => {
      setFollowed(true);
      // Update the following array of the logged in user and update the followers array of the user who has been followed
      await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
      await updateFollowedUserFollowers(profileDocId, userId, false);
   };

   return !followed ? (
      <div className="flex flex-row items-center align-items justify-between">
         <div className="flex items-center justify-between">
            <img
               src={`/images/avatars/${username}.jpg`}
               alt={username}
               className="rounded-full w-8 flex mr-3"
            />
            <Link to={`/p/${username}`}>
               <p className="font-bold text-sm">{username}</p>
            </Link>
         </div>
         <button
            className="text-sm font-bold text-blue-medium"
            type="button"
            onClick={handleFollowUser}
         >
            Follow
         </button>
      </div>
   ) : null;
};
export default SuggestedProfile;

SuggestedProfile.propTypes = {
   profileDocId: PropTypes.string.isRequired,
   username: PropTypes.string.isRequired,
   profileId: PropTypes.string.isRequired,
   userId: PropTypes.string.isRequired,
   loggedInUserDocId: PropTypes.string.isRequired,
};
