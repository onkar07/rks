import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCw83gjh98Qsw0u02SpcDkG32CYRHV-iHs",
  authDomain: "rkskop-a8c49.firebaseapp.com",
  projectId: "rkskop-a8c49",
  storageBucket: "rkskop-a8c49.appspot.com",
  messagingSenderId: "904173541802",
  appId: "1:904173541802:web:0d6e21e2d1d885082db3d3",
  measurementId: "G-K8NPDPHJJ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)