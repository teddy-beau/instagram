import { useEffect } from "react";

const NotFound = () => {
   useEffect(() => {
      document.title = "Not found - Instagram";
   }, []);

   return (
      <div className="bg-gray-background">
         <div className="mx-auto max-w-screen-lg">
            <p className="text-center text-2xl">Not found!</p>
         </div>
      </div>
   );
};
export default NotFound;
