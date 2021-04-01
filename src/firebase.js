import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import 'firebase/storage'

console.log(process.env)
const app = firebase.initializeApp({
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID
    apiKey: "AIzaSyDW6DGXxyW8k8jW6yPVw2_Qnl5XZqOiZTw",
    authDomain: "menu-app-a18fb.firebaseapp.com",
    databaseURL: "https://menu-app-a18fb-default-rtdb.firebaseio.com",
    projectId: "menu-app-a18fb",
    storageBucket: "menu-app-a18fb.appspot.com",
    messagingSenderId: "866737924724",
    appId: "1:866737924724:web:19e3200abc1b6883e27f21"
})

export const auth = app.auth();
export const storage = app.storage()
export default app;

