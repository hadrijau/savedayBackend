// Import the functions you need from the SDKs you need
import "firebase/storage";
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB45e1_hpAhGvw4d7nCguneBlGJqJY9KlA",
    authDomain: "saveday-fd62e.firebaseapp.com",
    projectId: "saveday-fd62e",
    storageBucket: "saveday-fd62e.appspot.com",
    messagingSenderId: "175251380980",
    appId: "1:175251380980:web:324eefc6ff1757de289ca1",
    measurementId: "G-9TPXLZZ1N4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();


export { storage, firebase as default };
