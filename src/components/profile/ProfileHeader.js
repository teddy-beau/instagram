import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

const ProfileHeader = () => {
   const [isFollowingProfile, setIsFollowingProfile] = useState(false);

   return <div className="container">This is the ProfileHeader component.</div>;
};
export default ProfileHeader;
