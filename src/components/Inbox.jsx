import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Search, UserRound } from "lucide-react";

export default function Inbox({ handleInboxChat }) {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.conversations);

  return (
    <div className="absolute bottom-28 right-8 w-[734px] h-[737px] flex flex-col justify-start items-center py-8 px-6 border bg-white rounded-md shadow-md">
      <div className="relative w-full h-auto pb-3 mx-auto bg-white rounded-lg">
        <input
          placeholder="Search"
          className="w-full py-2 px-14 text-lg outline-none rounded-lg border-2 border-gray-300 hover:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          type="text"
        />
        <button
          type="submit"
          className="absolute inline-flex items-center px-4 right-14 top-3"
        >
          <Search />
        </button>
      </div>
      <div className="flex flex-col w-full divide-y divide-[#828282]">
        {conversations.map((conversation, index) => {
          const lastMessage =
            conversation.messages[conversation.messages.length - 1];
          const lastUser = conversation.users.find(
            (user) => user.id === lastMessage.senderId
          );

          const hasUnreadMessages = conversation.messages.some(
            (message) => message.unread
          );

          return (
            <div
              key={index}
              onClick={handleInboxChat}
              className="relative flex w-full gap-4 items-center my-3 py-5 flex-row hover:bg-gray-200 cursor-pointer"
            >
              <div className="flex">
                <div className="w-9 h-9 flex justify-center items-center rounded-full bg-[#E0E0E0] ">
                  <UserRound className="text-[#4f4f4f] " />
                </div>
                <div className="w-9 h-9 flex justify-center items-center -ml-4 rounded-full bg-[#2f80ed] ">
                  <UserRound className=" text-[#ffff]" />
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex gap-4">
                  <h1 className="font-bold text-[#2F80ED] pb-1 max-w-[450px]">
                    {conversation.groupName}
                  </h1>
                  <span className="text-[14px] text-[#4F4F4F] self-start">
                    {moment(lastMessage.createdAt).format("MMMM D, YYYY")}
                  </span>
                </div>
                <span className="font-bold text-[14px] text-[#4F4F4F]">
                  {lastUser.name} :
                </span>
                <span className="text-[14px] text-[#4F4F4F]">
                  {lastMessage.content}
                </span>
              </div>
              {hasUnreadMessages && (
                <div className="absolute right-10 bottom-5">
                  <div className="h-[10px] w-[10px] bg-red-700 rounded-full"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
