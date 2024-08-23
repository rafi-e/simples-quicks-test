import { useState } from "react";
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
import TaskDetails from "./TaskDetails";
import { useDispatch, useSelector } from "react-redux";
import tasksSlice from "../redux/slice/taskSlice";

export default function Task() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const [isAddTaskButtonClicked, setIsAddTaskButtonClicked] = useState(false);
  const [isSubtaskSaved, setIsSubtaskSaved] = useState(false);

  const activeTask = tasks?.find((task) => task.isActive);
  if (!activeTask && tasks?.length > 0) {
    dispatch(tasksSlice.actions.setTaskActive({ index: 0 }));
  }

  const handleAddTaskButtonClick = () => {
    setIsAddTaskButtonClicked(true);
    setIsSubtaskSaved(false);
  };

  
  return (
    <div className="absolute bottom-28 right-8 w-[734px] h-[737px] flex flex-col justify-start items-center py-8 px-6 border rounded-md shadow-md">
      {tasks?.length > 0 ? (
        <>
          <div className="relative flex justify-around w-full h-auto mx-auto bg-white rounded-lg">
            <Menu>
              <MenuButton className="flex py-3 px-4 font-bold rounded-md border border-black data-[active]:border-[#2F80ED] data-[active]:bg-blue-200 gap-3">
                My Task ({tasks?.length})
                <ChevronDown />
              </MenuButton>
              <MenuItems
                anchor="bottom"
                className="border border-gray-500 rounded-md divide-y divide-gray-500"
              >
                {tasks?.map((task, index) => (
                  <MenuItem
                    key={index}
                    className="block py-2 pl-3 pr-12 text-start font-bold bg-white data-[focus]:bg-slate-200"
                    onClick={() => {
                      dispatch(tasksSlice.actions.setTaskActive({ index }));
                    }}
                  >
                    <span className="cursor-pointer">{task.name}</span>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
            <Button
              className="px-5 py-3 text-white font-bold bg-[#2F80ED]/80 rounded-md hover:bg-[#2F80ED]"
              onClick={handleAddTaskButtonClick}
            >
              New Task
            </Button>
          </div>
          <TaskDetails
            isAddTaskButtonClicked={isAddTaskButtonClicked}
            isSubtaskSaved={isSubtaskSaved}
            setIsSubtaskSaved={setIsSubtaskSaved}
          />
        </>
      ) : (
        <div>There is no Task</div>
      )}
    </div>
  );
}
