import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

export default function useUser() {
   const [activeUser, setActiveUser] = useState({});
   const { user } = useContext(UserContext);

   useEffect(() => {
      const getUserObjByUserId = async () => {
         // We need a function that we can call (Firebase service) that gets the user data based on the ID
         const [response] = await getUserByUserId(user.uid);
         setActiveUser(response);
      };
      if (user?.uid) {
         getUserObjByUserId();
      }
   }, [user]);

   return { user: activeUser };
}
