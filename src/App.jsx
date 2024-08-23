import { useState } from "react";
import {
  ArrowLeft,
  MessagesSquare,
  NotebookText,
  Search,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import Inbox from "./components/Inbox";
import Task from "./components/Task";
import InboxChat from "./components/InboxChat";

function App() {
  const [showButtons, setShowButtons] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  const handleInboxChat = () => {
    setIsInboxOpen(true);
    setShowInbox(false);
  };

  const handleChat = () => {
    setIsInboxOpen(false);
    setShowInbox(true);
  };

  const handleClick = () => {
    setShowButtons(!showButtons);
  };

  const handleClickBack = () => {
    setShowInbox(false);
    setShowTask(false);
    setShowButtons(false);
    setIsInboxOpen(false);
  };

  const handleInboxClick = () => {
    setShowInbox(true);
    setShowTask(false);
    setShowButtons(false);
    setIsInboxOpen(false);
  };

  const handleTaskClick = () => {
    setShowTask(true);
    setShowInbox(false);
    setShowButtons(false);
    setIsInboxOpen(false);
  };

  return (
    <>
      <div className="absolute bottom-7 right-8 ">
        <div className="flex flex-row-reverse items-end gap-6">
          {showInbox ? (
            <div className="relative flex">
              <button
                onClick={handleClickBack}
                className="absolute right-3 h-[68px] w-[68px] rounded-full bg-[#4F4F4F]"
              ></button>
              <button
                onClick={handleClick}
                className="flex h-[68px] w-[68px] items-center justify-center text-center rounded-full bg-[#8785FF] z-10"
              >
                <MessagesSquare className="size-10 text-white" />
              </button>
            </div>
          ) : showTask ? (
            <div className="relative flex">
              <button
                onClick={handleClickBack}
                className="absolute right-3 h-[68px] w-[68px] rounded-full bg-[#4F4F4F]"
              ></button>
              <button
                onClick={handleClick}
                className="flex h-[68px] w-[68px] items-center justify-center text-center rounded-full bg-[#F8B76B] z-10"
              >
                <NotebookText className="size-10 text-white" />
              </button>
            </div>
          ) : (
            <button
              className="flex h-[68px] w-[68px] items-center justify-center text-center rounded-full bg-[#2F80ED]/80 hover:bg-[#2F80ED] z-10"
              onClick={handleClick}
            >
              <Zap className="size-10 text-white fill-white" />
            </button>
          )}

          {showButtons && (
            <div className="flex flex-row justify-center items-center gap-6">
              {showInbox ? (
                <div className="relative flex">
                  <button className="flex h-[68px] w-[68px] items-center justify-center text-center rounded-full bg-[#F8B76B] z-10">
                    <NotebookText
                      onClick={handleTaskClick}
                      className="size-10 text-white"
                    />
                  </button>
                </div>
              ) : showTask ? (
                <div className="relative flex">
                  <button className="flex h-[68px] w-[68px] items-center justify-center text-center rounded-full bg-[#8785FF] z-10">
                    <MessagesSquare
                      onClick={handleInboxClick}
                      className="size-10 text-white"
                    />
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
                      onClick={handleInboxClick}
                    >
                      <MessagesSquare className="h-20 text-[#8785FF]" />
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
                      onClick={handleTaskClick}
                    >
                      <NotebookText className="h-20 text-[#F8B76B]" />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {showTask && <Task />}
      {showInbox && <Inbox handleInboxChat={handleInboxChat} />}
      {isInboxOpen && (
        <InboxChat handleChat={handleChat} setIsInboxOpen={setIsInboxOpen} />
      )}
    </>
  );
}

export default App;
