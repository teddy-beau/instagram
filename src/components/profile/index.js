import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import ProfileHeader from "./ProfileHeader";
import Photos from "./Photos";
import { getUserPhotosByUsername } from "../../services/firebase";

const UserProfile = ({ user }) => {
   const reducer = (state, newState) => ({ ...state, ...newState });
   const initialState = {
      profile: {},
      photosCollection: [],
      followerCount: 0,
   };

   const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
      reducer,
      initialState
   );

   useEffect(() => {
      const getProfileInfoAndPhotos = async () => {
         const photos = await getUserPhotosByUsername(user.username);

         dispatch({
            profile: user,
            photosCollection: photos,
            followerCount: user.followers.length,
         });
      };

      getProfileInfoAndPhotos();
   }, [user]);

   return (
      <>
         <ProfileHeader
            photosCount={photosCollection ? photosCollection.length : 0}
            profile={profile}
            followerCount={followerCount}
            setFollowerCount={dispatch}
         />
         <Photos photos={photosCollection} />
      </>
   );
};
export default UserProfile;

UserProfile.propTypes = {
   user: PropTypes.shape({
      dateCreated: PropTypes.number.isRequired,
      emailAddress: PropTypes.string.isRequired,
      followers: PropTypes.array.isRequired,
      following: PropTypes.array.isRequired,
      fullName: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
   }).isRequired,
};
