import "../App.css";
import firebase from "firebase";

function ChatMessage({ message }) {
  const { text, uid, photoURL } = message;
  const messageClass =
    uid === firebase.auth().currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
}

export default ChatMessage;
