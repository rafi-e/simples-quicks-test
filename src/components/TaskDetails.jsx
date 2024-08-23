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
import Subtask from "./Subtask";
import AddSubtask from "./AddSubtask";

export default function TaskDetails({
  isAddTaskButtonClicked,
  isSubtaskSaved,
  setIsSubtaskSaved,
}) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const task = tasks.find((task) => task.isActive === true);

  return (
    <div className="w-full h-full flex flex-col divide-y py-2 overflow-y-auto">
      {task.subtasks.map((subtask, index) => (
        <Subtask key={index} index={index} />
      ))}
      {isAddTaskButtonClicked && (
        <AddSubtask
          isSubtaskSaved={isSubtaskSaved}
          setIsSubtaskSaved={setIsSubtaskSaved}
        />
      )}
    </div>
  );
}
