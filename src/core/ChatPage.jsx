import React, { useEffect, useState, useRef } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef(null);

  // get old messages
  useEffect(()=> {
    getOldMessages()
  }, [])

  const getOldMessages = async () => {
    try {
        const url = process.env.REACT_APP_BACKEND_ENDPOINT + "/api/old-messages"
   await fetch(url).then(response => response.json()).then(data => {
    setMessages([...messages, ...data])
   })
   
    // to json
  
    } catch (error) {
        
    }
  }

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <div className="chat">
    <ChatBar socket={socket} />
    <div className="chat__main">
      <ChatBody
        messages={messages}
        typingStatus={typingStatus}
        lastMessageRef={lastMessageRef}
      />
      <ChatFooter socket={socket} />
    </div>
  </div>
  );
};

export default ChatPage;