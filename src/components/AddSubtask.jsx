import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Button,
  Checkbox,
} from "@headlessui/react";
import {
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Ellipsis,
  Pencil,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import tasksSlice from "./../redux/slice/taskSlice";

export default function AddSubtask({ isSubtaskSaved, setIsSubtaskSaved }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [isSubtaskDropdownOpen, setIsSubtaskDropdownOpen] = useState(true);

  const handleSubtaskDropdownToggle = () => {
    setIsSubtaskDropdownOpen(!isSubtaskDropdownOpen);
  };

  const handleAddSubtask = () => {
    if (!deadline) {
      alert("Please select a Date");
      return;
    }
    dispatch(
      tasksSlice.actions.addSubtask({
        title,
        deadline,
        description,
      })
    );
    setIsSubtaskSaved(true);
    resetForm();
  };

  const handleCancelTask = () => {
    setIsSubtaskSaved(true);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDeadline("");
    setDescription("");
  };

  return (
    <div
      className={`${
        isSubtaskSaved ? "hidden" : "flex"
      } w-full py-5  flex-col gap-5`}
    >
      <div className="flex px-5 items-center text-start justify-between">
        <div className="flex w-2/3 items-center gap-5">
          <Checkbox className="group flex items-center justify-center size-7 border-2 border-black rounded bg-white/10 p-0.5 data-[checked]:bg-white cursor-pointer">
            <Check className="hidden size-auto font-extrabold group-data-[checked]:block" />
          </Checkbox>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Type Task Title"
            className="w-full p-2 border-2 border-gray-500 rounded-lg focus:outline-[#2F80ED] cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-500 cursor-default"></span>
          <button onClick={handleSubtaskDropdownToggle}>
            {isSubtaskDropdownOpen ? (
              <ChevronUp className="size-7" />
            ) : (
              <ChevronDown className="size-7" />
            )}
          </button>

          <Menu>
            <MenuButton>
              <Ellipsis className="size-7" />
            </MenuButton>
            <MenuItems
              anchor="bottom end"
              className="border-2 rounded-md divide-y-2"
            >
              <MenuItem
                onClick={handleAddSubtask}
                className="block py-2 pl-3 pr-12 text-start text-[#2F80ED] hover:text-white font-bold bg-white hover:bg-[#2F80ED] cursor-pointer"
              >
                <span>Save</span>
              </MenuItem>
              <MenuItem
                onClick={handleCancelTask}
                className="block py-2 pl-3 pr-12 text-start text-red-500 hover:text-white font-bold bg-white hover:bg-red-500 cursor-pointer"
              >
                <span>Cancel</span>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
      {isSubtaskDropdownOpen && (
        <div className="flex flex-col gap-5">
          <div className="flex relative items-center px-12 gap-5">
            <Clock className="size-7 text-gray-500" />
            <DatePicker
              minDate={new Date()}
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              className="py-3 pl-2 text-gray-700 border-2 border-gray-500 rounded-lg focus:outline-[#2F80ED] cursor-pointer"
              showPopperArrow={false}
              placeholderText="Set Date"
              required
            />
            <Calendar className="absolute left-60 size-5 text-gray-600" />
          </div>
          <div className="flex items-start px-12 gap-5">
            <Pencil className="mt-2 size-7 text-gray-500" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="No Description"
              className="p-2 w-full max-h-32 h-fit resize rounded-md focus:outline-[#2F80ED]"
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
}
