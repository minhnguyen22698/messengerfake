import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/app'

var firebaseConfig = {
    apiKey: "AIzaSyCa8-PWSnYTX0nJuHLbSh2ZpNUz6p0vL4Y",
    authDomain: "chatchit-3d720.firebaseapp.com",
    databaseURL: "https://chatchit-3d720.firebaseio.com",
    projectId: "chatchit-3d720",
    storageBucket: "chatchit-3d720.appspot.com",
    messagingSenderId: "905834591041",
    appId: "1:905834591041:web:f2452d7c54cb7d4fce67c0",
    measurementId: "G-N75PGEXHT3"
};
    const fire = firebase.initializeApp(firebaseConfig);

export default fire