import "../styles/SignIn.css";
import firebase from "firebase";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import facebook_icon from "../images/facebook_icon.jpg";
import google_icon from "../images/google_icon.jpg";
import SignUp from "./SignUp";

function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [signUp, setSignUp] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    addUser();
  };

  const signInWithFacebook = async () => {
    const provider2 = new firebase.auth.FacebookAuthProvider();
    await firebase.auth().signInWithPopup(provider2);
    console.log(firebase.auth().currentUser);
    addUser();
  };

  const addUser = () => {
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    userRef.set(
      {
        uid: firebase.auth().currentUser.uid,
        profileImg: firebase.auth().currentUser.photoURL,
      },
      {
        merge: true,
      }
    );
  };

  // const sendEmail = async (email) => {
  //   const actionCodeSettings = {
  //     url: "https://www.sendlink.com",
  //     handleCodeInApp: true,
  //   };
  //   console.log(email);
  //   await firebase
  //     .auth()
  //     .sendSignInLinkToEmail(email, actionCodeSettings)
  //     .then((res) => {
  //       console.log(res);
  //       window.localStorage.setItem("emailForSignIn", email);
  //     })
  //     .catch((error) => {
  //       const errorMessage = error.message;
  //       console.log(errorMessage);
  //     });
  // };

  const signUpWithEmail = async (email, password) => {
    console.log(imageUrl);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.updateProfile({ photoURL: imageUrl });
      })
      .catch((e) => console.log(e));
    addUser();
    setSignUp(false);
  };

  // firebase.auth().onAuthStateChanged((user) => {
  //   user && console.log(user);
  // });

  const signInWithEmail = async (email, password) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const goToSignUp = () => {
    setSignUp(true);
  };

  return (
    <>
      <header>
        <h1>Live Chat 💬</h1>
      </header>
      <div>
        {signUp ? (
          <SignUp signUpWithEmail={signUpWithEmail} setImageUrl={setImageUrl} />
        ) : (
          <form
            className="loggin-form"
            onSubmit={(e) => {
              e.preventDefault();
              signInWithEmail(
                emailRef.current.value,
                passwordRef.current.value
              );
            }}
          >
            <label className="label-fields">
              Email:
              <input className="form-input" type="email" ref={emailRef} />
            </label>

            <label className="label-fields">
              Password:
              <input className="form-input" type="password" ref={passwordRef} />
            </label>
            <button className="loggin-btn" type="submit">
              Log In
            </button>
            <button onClick={goToSignUp}>Sign Up</button>
          </form>
        )}
      </div>
      <div>
        <button className="sign-btn" onClick={signInWithGoogle}>
          Sign in with Google
          <img width="50" src={google_icon} alt="google logo" />
        </button>
        <button className="sign-btn" onClick={signInWithFacebook}>
          Sign in with Facebook
          <img width="50" src={facebook_icon} alt="facebook logo" />
        </button>
      </div>
    </>
  );
}

export default SignIn;
