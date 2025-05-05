// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn0pHcBoyGLpGRb1s4hRXWSZPqQ_U8zm4",
  authDomain: "cyclic-fd8e1.firebaseapp.com",
  projectId: "cyclic-fd8e1",
  storageBucket: "cyclic-fd8e1.firebasestorage.app",
  messagingSenderId: "616440431642",
  appId: "1:616440431642:web:de645911b0234f56e83da3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

//  const password = document.getElementById('confirmpassword').Value;

//submit button

const submit = document.getElementById('signupBtn');
submit.addEventListener("click", (event)=> {
    event.preventDefault();

//inputs
const text = document.getElementById('fullname').value;
const tel = document.getElementById('phone').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

const auth=getAuth();
const db=getFirestore();


    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    const userData = {
        email: email,
        text: fullname,
        tel: phone

    }
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
)
