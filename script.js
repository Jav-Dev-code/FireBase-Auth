import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyAaOt70vqRkM21qXQRFHpGTD-W2Y0UaIsE",
    authDomain: "auth-app-86da9.firebaseapp.com",
    projectId: "auth-app-86da9",
    storageBucket: "auth-app-86da9.firebasestorage.app",
    messagingSenderId: "317252864080",
    appId: "1:317252864080:web:7b1b2dcb130282b3e7e955",
    measurementId: "G-PDCKRY95Q3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Function to handle signup
function signUp() {
    const email = document.getElementById("signupEmail")?.value;
    const password = document.getElementById("signupPassword")?.value;

    if (email && password) {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Signup Successful");
                window.location.href = "welcome.html";
            })
            .catch(error => document.getElementById("message").innerText = error.message);
    }
}

// Function to handle login
function login() {
    const email = document.getElementById("loginEmail")?.value;
    const password = document.getElementById("loginPassword")?.value;

    if (email && password) {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Login Successful");
                window.location.href = "welcome.html";
            })
            .catch(error => document.getElementById("message").innerText = error.message);
    }
}

// Function to handle Google login
function googleLogin() {
    
    signInWithPopup(auth, provider)
        .then(() => {
            alert("Google Login Successful");
            window.location.href = "welcome.html";
        })
        .catch(error => document.getElementById("message").innerText = error.message);
}

// Function to handle logout
function logout() {
    signOut(auth)
        .then(() => {
            alert("Logged out");
            window.location.href = "index.html";
        })
        .catch(error => console.error("Logout Error:", error));
}

// Function to check authentication state
function checkAuthState() {
    auth.onAuthStateChanged(user => {
        const userEmailElement = document.getElementById("userEmail");
        if (user && userEmailElement) {
            userEmailElement.innerText = "Logged in as: " + user.email;
        } else if (window.location.pathname.includes("welcome.html")) {
            window.location.href = "index.html";
        }
    });
}

// Attach event listeners
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signupBtn")?.addEventListener("click", signUp);
    document.getElementById("loginBtn")?.addEventListener("click", login);
    document.getElementById("googleLoginBtn")?.addEventListener("click", googleLogin);
    document.getElementById("logoutBtn")?.addEventListener("click", logout);
    
    checkAuthState();
});
