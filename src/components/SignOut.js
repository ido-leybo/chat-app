import firebase from "firebase";
import "../styles/SignOut.css";
function SignOut() {
  return (
    firebase.auth().currentUser && (
      <button className="sign_out" onClick={() => firebase.auth().signOut()}>
        Sign Out
      </button>
    )
  );
}

export default SignOut;
