import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./post";

const Timeline = () => {
   // 1) get logged in user's photos
   const { photos } = usePhotos();

   // 2) while loading use React Skeleton
   // 3) if there are photos render a post componentes
   // 4) if no photos, suggest to add one
   return (
      <div className="container col-span-2">
         {!photos ? (
            <Skeleton count={4} height={500} width={640} className="mb-5" />
         ) : photos?.length > 0 ? (
            photos.map((content) => (
               <Post key={content.docId} content={content} />
            ))
         ) : (
            <p className="text-center text-2xl">Follow people to seen photos</p>
         )}
      </div>
   );
};
export default Timeline;
