import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyCw83gjh98Qsw0u02SpcDkG32CYRHV-iHs",
    authDomain: "rkskop-a8c49.firebaseapp.com",
    projectId: "rkskop-a8c49",
    storageBucket: "rkskop-a8c49.appspot.com",
    messagingSenderId: "904173541802",
    appId: "1:904173541802:web:0d6e21e2d1d885082db3d3",
    measurementId: "G-K8NPDPHJJ5"
  };


var fireDb = initializeApp(firebaseConfig);  

export default fireDb.database().ref();