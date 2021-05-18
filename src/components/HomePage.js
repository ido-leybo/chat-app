import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import SignOut from "./SignOut";
import ChatItem from "./ChatItem";
import AddChat from "./AddChat";
import { useState } from "react";
import ChatRoom from "./ChatRoom";
import "../styles/HomePage.css";

function HomePage() {
  const [newChat, setNewChat] = useState(false);
  const chatNameRef = firebase.firestore().collection("chats");
  const { uid } = firebase.auth().currentUser;
  const [open, setOpen] = useState(false);
  const [chatRoomId, setChatRoomId] = useState("");

  const chatNameQuery = chatNameRef
    .where("users", "array-contains", uid)
    .limit(20);
  const [name] = useCollectionData(chatNameQuery);
  const { photoURL } = firebase.auth().currentUser;

  const addNewChat = () => {
    setNewChat(true);
  };
  const closeAddNewChat = () => {
    setNewChat(false);
  };
  const getUid = () => {
    alert(uid);
  };
  const goToHomePage = () => {
    setOpen(false);
    setChatRoomId("");
  };
  return (
    <>
      <header>
        <SignOut />
        <img src={photoURL} onClick={getUid} />
        <button onClick={goToHomePage} className="home-header">
          Home Page
        </button>
      </header>
      <main>
        {open ? (
          <ChatRoom
            key={chatRoomId}
            chat={name.filter((chat) => chat.chat_id === chatRoomId)}
          />
        ) : (
          <>
            <button className="add-new-chat" onClick={addNewChat}>
              Add New Chat
            </button>
            {newChat && <AddChat />}
            {newChat && (
              <button className="close-add-chat" onClick={closeAddNewChat}>
                ❌
              </button>
            )}
            {name
              ? name.map((chat) => (
                  <ChatItem
                    key={chat.chat_id}
                    setOpen={setOpen}
                    setChatRoomId={setChatRoomId}
                    chat={chat}
                  />
                ))
              : "No Chats yet"}
          </>
        )}
      </main>
    </>
  );
}

export default HomePage;
