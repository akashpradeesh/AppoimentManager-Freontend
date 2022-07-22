import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const firebaseConfig = ({
    apiKey: "AIzaSyAeem-BpRD1qcq7dzB2gT__JbTG0fPFVT0",
  authDomain: "auth-development-a4ecd.firebaseapp.com",
  projectId: "auth-development-a4ecd",
  storageBucket: "auth-development-a4ecd.appspot.com",
  messagingSenderId: "1094259937632",
  appId: "1:1094259937632:web:c4fb24554b450b01cb4e05"
})
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
export const signInWithGoogle = ()=>{ signInWithPopup(auth,provider) }
// export const signInWithGoogle = ()=>{
    
//     signInWithPopup(auth,provider).then((result)=>{
//         const name = result.user.displayName;
//         const email = result.user.email;
//         const profilePic = result.user.photoURL;
//         Cookies.set('googleUser',email.slice(0,-10))
//         console.log(Cookies.get('googleuser'))
//         useNavigate('/Welcome')
//     }).catch((error)=>{
//         console.log(error)
//     });
// };