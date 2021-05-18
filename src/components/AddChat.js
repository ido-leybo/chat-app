import firebase from "firebase";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/AddChat.css";

function AddChat() {
  const [inputText, setInputText] = useState("");
  const chatNameRef = firebase.firestore().collection("chats");

  const saveChatToFirestore = (name) => {
    chatNameRef.add({
      chat_id: uuidv4(),
      chat_name: name,
      users: [firebase.auth().currentUser.uid],
    });
  };

  const inputValue = (e) => {
    let value = e.target.value;
    setInputText(value);
  };

  return (
    <>
      <input className="add-input" type="text" onChange={inputValue} />
      <button
        className="add-button"
        onClick={() => saveChatToFirestore(inputText)}
      >
        Add
      </button>
    </>
  );
}

export default AddChat;
