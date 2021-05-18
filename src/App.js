import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import firebase from "firebase";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyC13dhProRqafi7YzoAPE3E9Cwa695Yx6Q",
  authDomain: "chat-app-e554f.firebaseapp.com",
  projectId: "chat-app-e554f",
  storageBucket: "chat-app-e554f.appspot.com",
  messagingSenderId: "1079674620892",
  appId: "1:1079674620892:web:e2d7c2307046753e7cdd19",
  measurementId: "G-9QLKEY2C2K",
});

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <section>{user ? <HomePage user={user} /> : <SignIn />}</section>
    </div>
  );
}

export default App;
