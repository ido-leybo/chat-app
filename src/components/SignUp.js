import firebase from "firebase";
import "firebase/storage";
import "firebase/auth";
import { useRef, useState } from "react";

function SignUp({ signUpWithEmail, setImageUrl }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [imageFile, setImageFile] = useState();

  //TODO fix thw upload the profile image to firebase storage
  const storage = firebase.storage();

  const uploadToStorage = () => {
    const upload = storage
      .ref()
      .child("images/" + imageFile.name)
      .put(imageFile);

    upload.on("state_changed", () => {
      storage
        .ref()
        .child(imageFile.name)
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          setImageUrl(url);
        });
    });

    // console.log(firebase.auth().currentUser);
    // firebase.auth().currentUser.photoURL = imageUrl;
  };

  return (
    <form className="loggin-form">
      <label className="label-fields">
        Email:
        <input
          className="form-input"
          type="email"
          ref={emailRef}
          placeholder="Enter email"
          required
        />
      </label>

      <label className="label-fields">
        Password:
        <input
          className="form-input"
          type="password"
          ref={passwordRef}
          placeholder="Enter password"
          required
        />
      </label>

      <label>
        <input
          type="file"
          onChange={(e) => {
            setImageFile(e.target.files[0]);
          }}
        />
      </label>
      <button
        className="loggin-btn"
        onClick={(e) => {
          e.preventDefault();
          signUpWithEmail(emailRef.current.value, passwordRef.current.value);
          {
            /*uploadToStorage();*/
          }
        }}
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUp;
