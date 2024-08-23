import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";

export default function InboxChat({ handleChat, setIsInboxOpen }) {
  const [userInput, setUserInput] = useState("");
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const [chatMessages, setChatMessages] = useState([
    {
      isUser: true,
      sender: "You",
      content:
        "No worries. It will be completed ASAP. I've asked him yesterday.",
      timestamp: "19:32",
      date: "2024-08-18",
      unread: false,
    },
    {
      isUser: false,
      sender: "Mary Hilda",
      content:
        "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
      timestamp: "19:32",
      date: "2024-08-18",
      unread: false,
    },
    {
      isUser: true,
      sender: "You",
      content:
        "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
      timestamp: "19:32",
      date: "2024-08-19",
      unread: false,
    },
    {
      isUser: false,
      sender: "Mary Hilda",
      content: "Sure thing, Claren",
      timestamp: "19:32",
      date: "2024-08-19",
      unread: false,
    },
    {
      isUser: false,
      sender: "Obaidullah Amarkhil",
      content: "Morning. I'll try to do them. Thanks",
      timestamp: "19:32",
      date: "2024-08-20",
      unread: false,
    },
    {
      isUser: true,
      sender: "You",
      content: "Yeah, I got them. Thanks for sending!",
      timestamp: "10:10",
      date: "2024-08-20",
      unread: false,
    },
    {
      isUser: false,
      sender: "Obaidullah Amarkhil",
      content: "Awesome! Let me know if you need anything else.",
      timestamp: "10:15",
      date: "2024-08-20",
      unread: false,
    },
    {
      isUser: false,
      sender: "Mary Hilda",
      content: "Hi, I need help with my case. Can someone assist me?",
      timestamp: "11:00",
      date: "2024-08-20",
      unread: false,
    },
    {
      isUser: false,
      sender: "Obaidullah Amarkhil",
      content: "Hey, I'd be happy to help. What's going on with your case?",
      timestamp: "11:05",
      date: "2024-08-20",
      unread: false,
    },
    {
      isUser: false,
      sender: "Mary Hilda",
      content: "Thanks for the help!",
      timestamp: "12:00",
      date: "2024-08-20",
      unread: false,
    },
    {
      isUser: false,
      sender: "Obaidullah Amarkhil",
      content: "No problem, Glad I could assist.",
      timestamp: "12:05",
      date: "2024-08-20",
      unread: false,
    },
    {
      isUser: false,
      sender: "Obaidullah Amarkhil",
      content: "Hi, I have an important news...",
      timestamp: "14:00",
      date: "2024-08-20",
      unread: true,
    },
    {
      isUser: false,
      sender: "Mary Hilda",
      content: "What is the news?.",
      timestamp: "14:00",
      date: "2024-08-20",
      unread: true,
    },
  ]);

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const currentDate = new Date().toLocaleDateString("en-US");
      addMessage(userInput, true, currentTime, currentDate);
      respondToUser(userInput);
      setUserInput("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const addMessage = (message, isUser, timestamp, date, unread = false) => {
    setChatMessages((prevMessages) => {
      prevMessages.forEach((msg) => (msg.unread = false));
      return [
        ...prevMessages,
        {
          content: message,
          isUser,
          sender: isUser ? "You" : "Mary Hilda",
          timestamp,
          date,
          unread: false,
        },
      ];
    });
  };

  const respondToUser = (userMessage) => {
    setTimeout(() => {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const currentDate = new Date().toLocaleDateString("en-US");

      let response;
      if (userMessage.toLowerCase().includes("hello")) {
        response = "Hello";
      } else if (userMessage.toLowerCase().includes("thanks")) {
        response = "You're welcome!";
      } else {
        response = "Sorry, I'mm bussy";
      }

      addMessage(response, false, currentTime, currentDate, true);
    }, 500);
  };

  return (
    <div className="absolute bottom-28 right-8 w-[734px] h-[737px] flex flex-col justify-start items-center bg-white border rounded-md shadow-md">
      <div className="flex items-center w-full h-20 justify-around border-b shadow">
        <button onClick={handleChat}>
          <ArrowLeft />
        </button>
        <div className="flex flex-col w-[520px]">
          <h1 className="font-bold text-[#2F80ED] pb-1 max-w-[450px]">
            I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]
          </h1>
          <span className="text-[14px] text-[#333333] ">3 Participants</span>
        </div>
        <button
          onClick={() => {
            setIsInboxOpen(false);
          }}
        >
          <X />
        </button>
      </div>
      <div className="w-full flex-1 overflow-auto px-2">
        <div className="py-2 px-3">
          {chatMessages
            .filter((message) => !message.unread)
            .map((message, index) => {
              const date = new Date(message.date);
              if (
                index === 0 ||
                date.toDateString() !==
                  new Date(chatMessages[index - 1].date).toDateString()
              ) {
                if (date.toDateString() === today.toDateString()) {
                  return (
                    <div key={index}>
                      <div className="flex justify-center py-5">
                        <div class="flex items-center w-full gap-3">
                          <span className="flex-grow bg-gray-300 rounded h-1" />
                          <span className="mx-3 text-lg text-gray-500 font-bold">
                            Today{" "}
                            {date.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex-grow bg-gray-300 rounded h-1" />
                        </div>
                      </div>
                      <div
                        className={`flex ${
                          message.isUser ? "justify-end mb-2" : "mb-2"
                        }`}
                      >
                        <div className="flex flex-col gap-1">
                          <p
                            className={`${
                              message.isUser ? "text-sm text-right" : "text-sm"
                            } text-cyan-500`}
                          >
                            {message.sender}
                          </p>
                          <div className="flex">
                            <div
                              className="rounded py-2 px-3"
                              style={
                                message.isUser
                                  ? { backgroundColor: "#E2F7CB" }
                                  : { backgroundColor: "#F2F2F2" }
                              }
                            >
                              <p className="text-sm text-pretty mt-1 max-w-[440px] pb-2">
                                {message.content}
                              </p>
                              <p className="text-left text-xs text-gray-500">
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else if (date.toDateString() === yesterday.toDateString()) {
                  return (
                    <div key={index}>
                      <div className="flex justify-center py-5">
                        <div class="flex items-center w-full gap-3">
                          <span className="flex-grow bg-gray-300 rounded h-1" />
                          <span className="mx-3 text-lg text-gray-500 font-bold">
                            Yesterday{" "}
                            {date.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex-grow bg-gray-300 rounded h-1" />
                        </div>
                      </div>
                      <div
                        className={`flex ${
                          message.isUser ? "justify-end mb-2" : "mb-2"
                        }`}
                      >
                        <div className="flex flex-col gap-1">
                          <p
                            className={`${
                              message.isUser ? "text-sm text-right" : "text-sm"
                            } text-cyan-500`}
                          >
                            {message.sender}
                          </p>
                          <div className="flex">
                            <div
                              className="rounded py-2 px-3"
                              style={
                                message.isUser
                                  ? { backgroundColor: "#E2F7CB" }
                                  : { backgroundColor: "#F2F2F2" }
                              }
                            >
                              <p className="text-sm text-pretty mt-1 max-w-[440px] pb-2">
                                {message.content}
                              </p>
                              <p className="text-left text-xs text-gray-500">
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index}>
                      <div className="flex justify-center py-5">
                        <div class="flex items-center w-full gap-3">
                          <span className="flex-grow bg-gray-300 rounded h-1" />
                          <span className="mx-3 text-lg text-gray-500 font-bold">
                            {date.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex-grow bg-gray-300 rounded h-1" />
                        </div>
                      </div>
                      <div
                        className={`flex ${
                          message.isUser ? "justify-end mb-2" : "mb-2"
                        }`}
                      >
                        <div className="flex flex-col gap-1">
                          <p
                            className={`${
                              message.isUser ? "text-sm text-right" : "text-sm"
                            } text-cyan-500`}
                          >
                            {message.sender}
                          </p>
                          <div className="flex">
                            <div
                              className="rounded py-2 px-3"
                              style={
                                message.isUser
                                  ? { backgroundColor: "#E2F7CB" }
                                  : { backgroundColor: "#F2F2F2" }
                              }
                            >
                              <p className="text-sm text-pretty mt-1 max-w-[440px] pb-2">
                                {message.content}
                              </p>
                              <p className="text-left text-xs text-gray-500">
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              } else {
                return (
                  <div key={index}>
                    <div
                      className={`flex ${
                        message.isUser ? "justify-end mb-2" : "mb-2"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <p
                          className={`${
                            message.isUser ? "text-sm text-right" : "text-sm"
                          } text-cyan-500`}
                        >
                          {message.sender}
                        </p>
                        <div className="flex">
                          <div
                            className="rounded py-2 px-3"
                            style={
                              message.isUser
                                ? { backgroundColor: "#E2F7CB" }
                                : { backgroundColor: "#F2F2F2" }
                            }
                          >
                            <p className="text-sm text-pretty mt-1 max-w-[440px] pb-2">
                              {message.content}
                            </p>
                            <p className="text-left text-xs text-gray-500">
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          {chatMessages.filter((message) => message.unread).length > 0 && (
            <>
              <div className="flex justify-center items-center py-5">
                <span className="flex-grow bg-red-300 rounded h-1" />
                <span className="mx-3 text-lg text-red-500 font-bold">
                  New Message
                </span>
                <span className="flex-grow bg-red-300 rounded h-1" />
              </div>
              {chatMessages
                .filter((message) => message.unread)
                .map((message, index) => (
                  <div key={index}>
                    <div
                      className={`flex ${
                        message.isUser ? "justify-end mb-2" : "mb-2"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <p
                          className={`${
                            message.isUser ? "text-sm text-right" : "text-sm"
                          } text-cyan-500`}
                        >
                          {message.sender}
                        </p>
                        <div className="flex">
                          <div
                            className="rounded py-2 px-3"
                            style={
                              message.isUser
                                ? { backgroundColor: "#E2F7CB" }
                                : { backgroundColor: "#F2F2F2" }
                            }
                          >
                            <p className="text-sm text-pretty mt-1 max-w-[440px] pb-2">
                              {message.content}
                            </p>
                            <p className="text-left text-xs text-gray-500">
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
      <div className="w-full p-4 border-t flex gap-5">
        <input
          id="user-input"
          type="text"
          placeholder="Type a new message"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full px-3 py-2 border border-gray-400 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          id="send-button"
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-7 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}
