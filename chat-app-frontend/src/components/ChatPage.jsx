import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { baseURL } from "../config/AxiosHelper";
import { getMessagess } from "../services/RoomService";
import { timeAgo } from "../config/helper";

const ChatPage = () => {
  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, currentUser]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await getMessagess(roomId);
        setMessages(messages);
      } catch (error) {}
    }
    if (connected) {
      loadMessages();
    }
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        toast.success("Connected ✅");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };

    if (connected) {
      connectWebSocket();
    }
  }, [roomId]);

  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };

      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }
  };

  function handleLogout() {
    stompClient.disconnect();
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white">
      {/* Header */}
      <header className="fixed w-full top-0 z-10 bg-white/10 backdrop-blur-lg border-b border-gray-700 py-4 px-6 flex justify-between items-center shadow-lg">
        <h1 className="text-lg font-bold">
          Room: <span className="text-yellow-400">{roomId}</span>
        </h1>
        <h1 className="text-lg font-bold">
          User: <span className="text-green-400">{currentUser}</span>
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white font-medium shadow-md transition"
        >
          Leave Room
        </button>
      </header>

      {/* Chat Box */}
      <main
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto px-6 pt-24 pb-28 space-y-3"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start gap-3 max-w-lg px-4 py-3 rounded-2xl shadow-md ${
                message.sender === currentUser
                  ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white"
                  : "bg-white/10 backdrop-blur-lg border border-gray-700"
              }`}
            >
              <img
                className="h-10 w-10 rounded-full shadow-md"
                src={"https://avatar.iran.liara.run/public/43"}
                alt="avatar"
              />
              <div>
                <p className="font-semibold text-sm text-yellow-300">
                  {message.sender}
                </p>
                <p className="text-base">{message.content}</p>
                <p className="text-xs text-gray-300 mt-1">
                  {timeAgo(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Input Box */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center">
        <div className="flex items-center w-2/3 bg-white/10 backdrop-blur-md border border-gray-700 rounded-full px-4 py-2 shadow-lg">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-3"
          />
          <button className="p-2 rounded-full hover:bg-gray-700 transition">
            <MdAttachFile size={22} />
          </button>
          <button
            onClick={sendMessage}
            className="ml-2 bg-green-500 hover:bg-green-600 p-2 rounded-full shadow-md transition"
          >
            <MdSend size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
