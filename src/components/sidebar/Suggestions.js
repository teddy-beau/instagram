import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./SuggestedProfile";

const Suggestions = ({ userId, following, loggedInUserDocId }) => {
   const [profiles, setProfiles] = useState(null);

   // Get suggested profiles using Firebase service (call the async function within useEffect), store it in a state and render.
   useEffect(() => {
      const suggestedProfiles = async () => {
         const response = await getSuggestedProfiles(userId, following);
         setProfiles(response);
      };
      if (userId) {
         suggestedProfiles();
      }
   }, [userId, following]);

   return !profiles ? (
      <Skeleton count={1} height={150} className="mt-5" />
   ) : profiles.length > 0 ? (
      <div className="rounded flex flex-col">
         <div className="text-sm flex items-center align-middle justify-between mb-2">
            <p className="font-bold text-gray-base">Suggestions for you</p>
         </div>
         <div className="mt-4 grid gap-5">
            {profiles.map((profile) => (
               <SuggestedProfile
                  key={profile.docId}
                  profileDocId={profile.docId}
                  username={profile.username}
                  profileId={profile.userId}
                  userId={userId}
                  loggedInUserDocId={loggedInUserDocId}
               />
            ))}
         </div>
      </div>
   ) : null;
};
export default Suggestions;

Suggestions.propTypes = {
   userId: PropTypes.string,
   following: PropTypes.array,
   loggedInUserDocId: PropTypes.string,
};
