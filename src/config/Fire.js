import firebase from "firebase";

const config = {
  apiKey: "AIzaSyD4JPJ5R7vJX56QpJQAL5ndR7YaGerCyic",
  authDomain: "reactauthsample-fa381.firebaseapp.com",
  databaseURL: "https://reactauthsample-fa381.firebaseio.com",
  projectId: "reactauthsample-fa381",
  storageBucket: "reactauthsample-fa381.appspot.com",
  messagingSenderId: "378516103400",
  appId: "1:378516103400:web:5fe883dedaacdb6acfe95d",
};

const fire = firebase.initializeApp(config);

export default fire;
