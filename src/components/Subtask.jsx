import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
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
import tasksSlice from "./../redux/slice/taskSlice";

export default function Subtask({ index }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const task = tasks.find((task, index) => task.isActive === true);
  const subtask = task.subtasks.find((subtask, i) => i === index);
  const deadlineDate = new Date(subtask.deadline);
  const checked = subtask.isCompleted;
  const [textareaValue, setTextareaValue] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [isSubtaskDropdownOpen, setIsSubtaskDropdownOpen] = useState(false);

  const onChange = (e) => {
    dispatch(tasksSlice.actions.setSubtaskCompleted({ index }));
  };

  const onDelete = (e) => {
    dispatch(tasksSlice.actions.deleteSubtask({ index }));
  };

  const handleSubtaskDropdownToggle = () => {
    setIsSubtaskDropdownOpen(!isSubtaskDropdownOpen);
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const calculateDaysLeft = () => {
    const currentDate = new Date();
    const difference = deadlineDate.getTime() - currentDate.getTime();
    if (difference < 0) {
      return "";
    } else {
      const daysLeft = Math.floor(difference / (1000 * 3600 * 24));
      if (daysLeft < 7) {
        return `${daysLeft} Days Left`;
      } else {
        return "";
      }
    }
  };

  return (
    <>
      <div className="w-full py-5 flex flex-col gap-5">
        <div className="flex px-5 items-center text-start justify-between">
          <div className="flex items-center gap-5">
            <Checkbox
              checked={checked}
              onChange={onChange}
              className="group flex items-center justify-center size-7 border-2 border-black rounded bg-white/10 p-0.5 data-[checked]:bg-white cursor-pointer"
            >
              <Check className="hidden size-auto font-extrabold group-data-[checked]:block" />
            </Checkbox>
            <h1
              className={
                checked
                  ? "line-through opacity-60 text-lg font-bold cursor-default"
                  : "text-lg font-bold cursor-default"
              }
            >
              {subtask.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-red-500 cursor-default">
              {calculateDaysLeft()}
            </span>
            <span className="text-sm font-bold text-gray-500 cursor-default">
              {deadlineDate.toLocaleDateString("en-US", {})}
            </span>
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
              <MenuItems anchor="bottom end" className="border-2 rounded-md">
                <MenuItem
                  onClick={onDelete}
                  className="block py-2 pl-3 pr-12 text-start text-red-500 hover:text-white font-bold bg-white hover:bg-red-500 cursor-pointer"
                >
                  <span>Delete</span>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
        {isSubtaskDropdownOpen && (
          <div className="flex flex-col gap-5">
            <div className="flex relative items-center px-12 gap-5">
              <Clock className="size-7 text-[#2F80ED]" />
              <DatePicker
                minDate={new Date()}
                selected={deadlineDate}
                onChange={(date) => setStartDate(date)}
                className="py-3 pl-2 text-gray-700 border-2 border-gray-500 rounded-lg focus:outline-[#2F80ED] cursor-pointer"
                showPopperArrow={false}
              />

              <Calendar className="absolute left-60 size-5 text-gray-600" />
            </div>
            <div className="flex items-start px-12 gap-5">
              <Pencil className="mt-2 size-7 text-[#2F80ED]" />
              <textarea
                value={subtask.description || "No Description"}
                onChange={handleTextareaChange}
                placeholder="No Description"
                className="p-2 w-full max-h-32 h-fit resize rounded-md focus:outline-[#2F80ED]"
              ></textarea>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
