// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb_T_kCWBvPt-bxI9GurYUx5PSx8SzBEU",
  authDomain: "authentication-3c349.firebaseapp.com",
  databaseURL: "https://authentication-3c349-default-rtdb.firebaseio.com",
  projectId: "authentication-3c349",
  storageBucket: "authentication-3c349.firebasestorage.app",
  messagingSenderId: "971438571463",
  appId: "1:971438571463:web:27ccf2e7fb06ab5188e3e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

login.addEventListener('click',(e) => {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const dt = new Date();
    set(ref(database, 'users/' + user.uid),{
      Last_login: dt,
      
      
  })
    alert('user logged in')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage);
  });


});
