import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

const Photos = ({ photos }) => {
   return <div className="container">This is the Photos component.</div>;
};
export default Photos;

Photos.propTypes = {
   photos: PropTypes.array.isRequired,
};
