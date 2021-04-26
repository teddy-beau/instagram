import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

const SignUp = () => {
   const history = useHistory();
   const { firebase } = useContext(FirebaseContext);

   const [username, setUsername] = useState("");
   const [fullName, setFullName] = useState("");
   const [emailAddress, setEmailAddress] = useState("");
   const [password, setPassword] = useState("");

   const [error, setError] = useState("");
   const isInvalid = password === "" || emailAddress === "";

   const handleSignUp = async (event) => {
      event.preventDefault();
      try {
         const usernameExists = await doesUsernameExist(username);
      } catch (error) {
         // setEmailAddress("");
         // setPassword("");
         // setError(error.message);
      }
   };

   useEffect(() => {
      document.title = "Sign Up - Instagram";
   }, []);

   return (
      <div className="container flex mx-auto max-w-screen-md items-center h-screen">
         <div className="flex w-3/5">
            <img
               src="/images/iphone-with-profile.jpg"
               alt="iPhone with Instagram"
            />
         </div>
         <div className="flex flex-col w-2/5">
            <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
               <h1 className="flex justify-center w-full">
                  <img
                     src="images/logo.png"
                     alt="Instagram"
                     className="mt-2 w-6/12 mb-4"
                  />
               </h1>

               {error && (
                  <p className="bm-4 text-xs text-red-primary">{error}</p>
               )}

               <form onSubmit={handleSignUp} method="POST">
                  <input
                     type="text"
                     aria-label="Enter your username"
                     placeholder="Username"
                     className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                     onChange={(event) => setUsername(event.target.value)}
                     value={username}
                  />
                  <input
                     type="text"
                     aria-label="Enter your full name"
                     placeholder="Full name"
                     className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                     onChange={(event) => setFullName(event.target.value)}
                     value={fullName}
                  />
                  <input
                     type="text"
                     aria-label="Enter your email address"
                     placeholder="Email address"
                     className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                     onChange={(event) => setEmailAddress(event.target.value)}
                     value={emailAddress}
                  />
                  <input
                     type="password"
                     aria-label="Enter your password"
                     placeholder="Password"
                     className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                     onChange={(event) => setPassword(event.target.value)}
                     value={password}
                  />
                  <button
                     disabled={isInvalid}
                     type="submit"
                     className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                        isInvalid && `opacity-50`
                     }`}
                  >
                     Sign Up
                  </button>
               </form>
            </div>
            <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
               <p className="text-sm">
                  Have an account yet?{` `}
                  <Link
                     to={ROUTES.LOGIN}
                     className="font-bold text-blue-medium"
                  >
                     Login
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
};
export default SignUp;
