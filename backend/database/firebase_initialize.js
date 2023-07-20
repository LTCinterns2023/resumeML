import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCR3A6WuCWT1R9LC5KqQODaY1QM1YA7oRA",
  authDomain: "resumeml.firebaseapp.com",
  projectId: "resumeml",
  storageBucket: "resumeml.appspot.com",
  messagingSenderId: "810879932791",
  appId: "1:810879932791:web:a5040da30590a3edf1e972",
  measurementId: "G-RKZ0XV04J6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

