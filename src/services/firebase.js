import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyBcQAyCuL_PnK0AgZTX1v-ctdYXPR63VqI",
  authDomain: "fugiro-5c10c.firebaseapp.com",
  projectId: "fugiro-5c10c",
  storageBucket: "fugiro-5c10c.appspot.com",
  messagingSenderId: "184997169754",
  appId: "1:184997169754:web:aa98f7ca5d4b3969216663",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
