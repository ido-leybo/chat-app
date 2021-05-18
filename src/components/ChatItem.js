import "../styles/ChatItem.css";

function ChatItem({ chat, setOpen, setChatRoomId }) {
  const openChat = () => {
    setChatRoomId(chat.chat_id);
    setOpen(true);
  };
  return (
    <>
      <button className="chat-button" onClick={openChat}>
        {chat.chat_name}
      </button>
    </>
  );
}

export default ChatItem;
