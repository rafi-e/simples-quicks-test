import { useState } from "react";
import {
  MessagesSquare,
  NotebookText,
  Zap,
} from "lucide-react";
import Inbox from "./components/Inbox";
import Task from "./components/Task";
import InboxChat from "./components/InboxChat";

const App = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowButtons(false);
  };

  const handleInboxChat = () => {
    setIsInboxOpen(true);
    setActiveTab(null);
  };

  const handleBackClick = () => {
    setActiveTab(null);
    setShowButtons(false);
    setIsInboxOpen(false);
  };

  const handleButtonClick = () => {
    setShowButtons(!showButtons);
  };

  return (
    <>
      <div className="absolute bottom-7 right-8 ">
        <div className="flex flex-row-reverse items-end gap-6">
          {activeTab === "inbox" ? (
            <div className="relative flex">
              <button
                onClick={handleBackClick}
                className="absolute right-3 h-[68px] w-[68px] rounded-full bg-[#4F4F4F]"
              ></button>
              <button
                onClick={handleButtonClick}
                className="flex h-[68px] w-[68px] items-center justify-center text-center rounded-full bg-[#8785FF] z-10"
              >
                <MessagesSquare className="size-10 text-white" />
              </button>
            </div>
          ) : activeTab === "task" ? (
            <div className="relative flex">
              <button
                onClick={handleBackClick}
                className="absolute right-3 h-[68px] w-[68px] rounded-full bg-[#4F4F4F]"
              ></button>
              <button
                onClick={handleButtonClick}
                className="flex h-[68px] w-[68px] items-center justify-center text-center rounded-full bg-[#F8B76B] z-10"
              >
                <NotebookText className="size-10 text-white" />
              </button>
            </div>
          ) : (
            <button
              className="flex h-[68px] w-[68px] items-center justify-center text-center rounded-full bg-[#2F80ED]/80 hover:bg-[#2F80ED] z-10"
              onClick={handleButtonClick}
            >
              <Zap className="size-10 text-white fill-white" />
            </button>
          )}

          {showButtons && (
            <div className="flex flex-row justify-center items-center gap-6">
              {activeTab === "inbox" ? (
                <div className="relative flex">
                  <button
                    className="flex h-[68px] w-[68px] items-center justify-center text-center rounded-full bg-[#F8B76B] z-10"
                    onClick={() => handleTabClick("task")}
                  >
                    <NotebookText className="size-10 text-white" />
                  </button>
                </div>
              ) : activeTab === "task" ? (
                <div className="relative flex">
                  <button
                    className="flex h-[68px] w-[68px] items-center justify-center text-center rounded-full bg-[#8785FF] z-10"
                    onClick={() => handleTabClick("inbox")}
                  >
                    <MessagesSquare className="size-10 text-white" />
                  </button>
                </div>
              ) : (
                <>
                  <div
                    className={`flex flex-col justify-center items-center ${
                      showButtons
                        ? ` translate-x-0 opacity-100`
                        : `translate-x-20 opacity-0`
                    } transition ease-in-out duration-300 cursor-pointer`}
                  >
                    <h2>Inbox</h2>
                    <button
                      className="flex h-[60px] w-[60px] items-center justify-center text-center rounded-full hover:bg-gray-200 border"
                      onClick={() => handleTabClick("inbox")}
                    >
                      <MessagesSquare className="size-8 text-[#8785FF]" />
                    </button>
                  </div>
                  <div
                    className={`flex flex-col justify-center items-center ${
                      showButtons
                        ? ` translate-x-0 opacity-100`
                        : `translate-x-20 opacity-0`
                    } transition ease-in-out duration-300 cursor-pointer`}
                  >
                    <h2>Task</h2>
                    <button
                      className="flex h-[60px] w-[60px]  items-center justify-center text-center rounded-full hover:bg-gray-200 border"
                      onClick={() => handleTabClick("task")}
                    >
                      <NotebookText className="size-8 text-[#F8B76B]" />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {activeTab === "task" && <Task />}
      {activeTab === "inbox" && <Inbox handleInboxChat={handleInboxChat} />}
      {isInboxOpen && (
        <InboxChat
          setIsInboxOpen={setIsInboxOpen}
          setShowInbox={setActiveTab}
        />
      )}
    </>
  );
};

export default App;
