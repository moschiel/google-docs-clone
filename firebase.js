import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCxKQHOe1CFdgdU1CrEsuGWZAlZTa487Kw",
    authDomain: "docs-clone-2ae4c.firebaseapp.com",
    projectId: "docs-clone-2ae4c",
    storageBucket: "docs-clone-2ae4c.appspot.com",
    messagingSenderId: "563912191346",
    appId: "1:563912191346:web:916709360c2f5dadf881eb"
};

//if it wasnt initialized, init new firevase app, else use current app
const app = !firebase.apps.length 
            ? firebase.initializeApp(firebaseConfig) 
            : firebase.app();

const db = app.firestore();

export { db }; //database reference export