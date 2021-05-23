import "../styles/ChatRoom.css";
import firebase from "firebase";
import { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import AddUser from "./AddUser";
import ChatMessage from "./ChatMessage";

function ChatRoom({ chat }) {
  const [newUser, setNewUser] = useState(false);
  const messagesRef = firebase.firestore().collection("messages");
  const messageQuery = messagesRef
    .where("chat_id", "==", chat[0].chat_id)
    .orderBy("createdAt", "desc")
    .limit(25);
  const [messages, loading, queryError] = useCollectionData(messageQuery);
  const [formValue, setFormValue] = useState("");
  const dummy = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = firebase.auth().currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      chat_id: chat[0].chat_id,
    });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const addUser = () => {
    setNewUser(true);
  };
  const closeAddUser = () => {
    setNewUser(false);
  };
  return (
    <>
      <div>
        <h2 className="chat-name">{chat[0].chat_name}</h2>
        <button className="add-user" onClick={addUser}>
          Add user to '{chat[0].chat_name}'
        </button>
        {newUser && <AddUser chat={chat[0]} />}
        {newUser && (
          <button className="close-add-user" onClick={closeAddUser}>
            ❌
          </button>
        )}
      </div>
      <main className="messages-container">
        <div ref={dummy}></div>
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.createdAt} message={msg} />
          ))}
      </main>
      <form className="send-message" onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">✈</button>
      </form>
    </>
  );
}

export default ChatRoom;
