import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth} from "firebase/auth";
var app=null;
const firebaseConfig = {
  apiKey: "AIzaSyDTQI2QSIfDnT2JleQiICYFfXTPSvaC8kM",
  authDomain: "rentnearn-80339.firebaseapp.com",
  projectId: "rentnearn-80339",
  storageBucket: "rentnearn-80339.appspot.com",
  messagingSenderId: "847532875175",
  appId: "1:847532875175:web:95ad25aa4e02300b702a82",
  measurementId: "G-TE3RJFZV0C"
};
if(!app){
  app=initializeApp(firebaseConfig);
}
else{
  app=initializeApp();
}

export const auth=getAuth(app)
export const db = getFirestore(app);


