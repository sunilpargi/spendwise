import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRYyuvvfy7srYoVet0qP5FsXefI371BQI",
  authDomain: "hackthon-2--expense-tracker.firebaseapp.com",
  projectId: "hackthon-2--expense-tracker",
  storageBucket: "hackthon-2--expense-tracker.appspot.com",
  messagingSenderId: "366815777595",
  appId: "1:366815777595:web:13f8cc9b81271e95565d1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Export the auth module
export { auth };