


//FROM V9 FIREBASE IS IMPORTED LIKE THIS---

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyBVTPd44qH55H66eCeYGmEHcWcB485mbtc",
    authDomain: "whatsappclone-e8d0f.firebaseapp.com",
    projectId: "whatsappclone-e8d0f",
    storageBucket: "whatsappclone-e8d0f.appspot.com",
    messagingSenderId: "299107567134",
    appId: "1:299107567134:web:26007603ce1daa6991500f",
    measurementId: "G-36L5MFMHR3"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);


const db = firebaseApp.firestore();

const auth =  firebase.auth();

const provider =  new firebase.auth.GoogleAuthProvider();


export {auth,provider} ;
export default db;

