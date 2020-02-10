import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBE8n2crimd3XiYQO86estY8_dZjglz3Nw",
  authDomain: "ukee-tast-test.firebaseapp.com",
  databaseURL: "https://ukee-tast-test.firebaseio.com",
  projectId: "ukee-tast-test",
  storageBucket: "ukee-tast-test.appspot.com",
  messagingSenderId: "989903984153",
  appId: "1:989903984153:web:c133acd266fc353c2bfc88",
  measurementId: "G-Y2X353G5J4"
});

export default app;