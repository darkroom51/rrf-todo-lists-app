import firebase from "firebase";

const config = {
    apiKey: "AIzaSyAQhF4AB0Gz41z-mlehova7aPhMINh1FS4",
    authDomain: "wld-todolists.firebaseapp.com",
    databaseURL: "https://wld-todolists.firebaseio.com",
    projectId: "wld-todolists",
    storageBucket: "wld-todolists.appspot.com",
    messagingSenderId: "66439859490"
};
firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const facebookProvider = new firebase.auth.FacebookAuthProvider()
export const database = firebase.database()
export const auth = firebase.auth()