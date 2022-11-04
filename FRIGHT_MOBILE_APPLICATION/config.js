import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAgKUyydPLy6sqc4ulnh5FXdq6kMUMqbq0",
    authDomain: "fright-aa234.firebaseapp.com",
    projectId: "fright-aa234",
    storageBucket: "fright-aa234.appspot.com",
    messagingSenderId: "993795761918",
    appId: "1:993795761918:web:770f10f2d7b149d9e067af",
    measurementId: "G-96XXS50Z1V"
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};