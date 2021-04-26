import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import { seedDatabase } from "../seed";

// here is where the seed file is imported

const config = {
   apiKey: "AIzaSyDA2et-Y8SgjjK3nUYs4pqjiSLGej9XS90",
   authDomain: "instagram-605d8.firebaseapp.com",
   projectId: "instagram-605d8",
   storageBucket: "instagram-605d8.appspot.com",
   messagingSenderId: "605308923690",
   appId: "1:605308923690:web:2aa409ebf5c63af787b853",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// here is where the seed file is called (only once)
// seedDatabase(firebase);

export { firebase, FieldValue };
