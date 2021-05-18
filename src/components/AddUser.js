import firebase from "firebase";
import "firebase/database";
import { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "../styles/AddUser.css";

function AddUser({ chat }) {
  const inputValue = useRef();
  const [docId, setDocId] = useState("");
  const chatsRef = firebase.firestore().collection("chats");
  const query = chatsRef.where("chat_id", "==", chat.chat_id);
  const [currentChat] = useCollectionData(query);
  const users = currentChat && currentChat[0].users;

  useEffect(() => {
    chatsRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().chat_id === chat.chat_id) {
          setDocId(doc.id);
        }
      });
    });
  }, [chat]);

  const addUserToFirebase = (uid) => {
    users.push(uid.current.value);
    chatsRef.doc(docId).update({ users: users });
  };
  return (
    <>
      <input
        type="text"
        ref={inputValue}
        className="add-input"
        placeholder="Enter uid"
      />
      <button
        className="add-button"
        onClick={() => addUserToFirebase(inputValue)}
      >
        Add
      </button>
    </>
  );
}

export default AddUser;
