import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	apiKey: "AIzaSyDlwIT_hApBacm3y6J9nbnB74n8JetHPp0",
	authDomain: "vue3-todo-c31f1.firebaseapp.com",
	projectId: "vue3-todo-c31f1",
	storageBucket: "vue3-todo-c31f1.appspot.com",
	messagingSenderId: "749734961076",
	appId: "1:749734961076:web:6ce595c0288ead63879ce1",
	measurementId: "G-9TLY66ZL9Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { app, analytics, db, auth, provider };
