import React, { useState } from "react";
import chatIcon from "../assets/chat.png";
import toast from "react-hot-toast";
import { createRoomApi, joinChatApi } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const JoinCreateChat = () => {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });

  const { setRoomId, setCurrentUser, setConnected } = useChatContext();
  const navigate = useNavigate();

  function handleFormInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    if (detail.roomId === "" || detail.userName === "") {
      toast.error("Invalid Input !!");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      try {
        const room = await joinChatApi(detail.roomId);
        toast.success("Joined successfully 🎉");
        setCurrentUser(detail.userName);
        setRoomId(room.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        if (error.status === 400) {
          toast.error(error.response.data);
        } else {
          toast.error("Error in joining room");
        }
        console.log(error);
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      try {
        const response = await createRoomApi(detail.roomId);
        toast.success("Room Created Successfully 🎊");
        setCurrentUser(detail.userName);
        setRoomId(response.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        console.log(error);
        if (error.status === 400) {
          toast.error("Room already exists !!");
        } else {
          toast("Error in creating room");
        }
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-950 px-4">
      {/* Animated Card with breathing effect */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        className="relative p-10 w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-lg border border-transparent shadow-2xl flex flex-col gap-6 
        animate-[breathing_6s_ease-in-out_infinite]"
      >
        {/* Animated glowing border */}
        <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-[glow_8s_linear_infinite]"></div>

        {/* Inside card content */}
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <motion.img
              initial={{ rotate: -20, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              src={chatIcon}
              className="w-24 drop-shadow-lg"
              alt="chat-icon"
            />
          </div>

          <h1 className="text-4xl font-extrabold text-center text-blue-900 dark:text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.7)]">
  Join or Create a Room 🚀
</h1>


          {/* Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label
              htmlFor="name"
              className="block font-medium mb-2 text-black mt-4"
            >
              Your name
            </label>
            <input
              onChange={handleFormInputChange}
              value={detail.userName}
              type="text"
              id="name"
              name="userName"
              placeholder="Enter the name"
              className="w-full px-4 py-3 rounded-full bg-black/40 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition focus:shadow-[0_0_10px_#ec4899]"
            />
          </motion.div>

          {/* Room Id */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label
              htmlFor="roomId"
              className="block font-medium mb-2 text-black mt-4"
            >
              Room ID / New Room ID
            </label>
            <input
              name="roomId"
              onChange={handleFormInputChange}
              value={detail.roomId}
              type="text"
              id="roomId"
              placeholder="Enter the room id"
              className="w-full px-4 py-3 rounded-full bg-black/40 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition focus:shadow-[0_0_10px_#3b82f6]"
            />
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex justify-center gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={joinChat}
              className="px-5 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-md hover:shadow-[0_0_15px_#3b82f6] transition animate-pulse"
            >
              Join Room
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={createRoom}
              className="px-5 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-md hover:shadow-[0_0_15px_#f97316] transition animate-pulse"
            >
              Create Room
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Tailwind custom animations */}
      <style>{`
        @keyframes breathing {
          0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(255,165,0,0.3); }
          50% { transform: scale(1.02); box-shadow: 0 0 25px rgba(255,165,0,0.6); }
        }
        @keyframes glow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default JoinCreateChat;
