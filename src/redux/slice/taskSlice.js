import { createSlice } from "@reduxjs/toolkit";
import data from "../../assets/data/data.json";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: data.tasks,
  reducers: {
    addTask: (state, action) => {
      const isActive = state.length > 0 ? false : true;
      const payload = action.payload;
      const task = {
        name: payload.name,
        isActive,
        subtasks: [],
      };
      task.subtasks = payload.newSubtasks;
      state.push(task);
    },
    editTask: (state, action) => {
      const payload = action.payload;
      const task = state.find((task) => task.isActive);
      task.name = payload.name;
      task.subtasks = payload.newSubtasks;
    },
    deleteTask: (state, action) => {
      const task = state.find((task) => task.isActive);
      state.splice(state.indexOf(task), 1);
    },
    setTaskActive: (state, action) => {
      state.map((task, index) => {
        index === action.payload.index
          ? (task.isActive = true)
          : (task.isActive = false);
        return task;
      });
    },
    addSubtask: (state, action) => {
      const { title, deadline, description } = action.payload;
      const subtask = { title, deadline, description, isCompleted: false };
      const task = state.find((task) => task.isActive);
      task.subtasks.push(subtask);
    },
    editSubtask: (state, action) => {
      const { title, deadline, description, taskIndex, subtaskIndex } =
        action.payload;
      const task = state.find((task, index) => index === taskIndex);
      const subtask = task.subtasks.find(
        (subtask, index) => index === subtaskIndex
      );
      subtask.title = title;
      subtask.deadline = deadline;
      subtask.description = description;
    },
    deleteSubtask: (state, action) => {
      const payload = action.payload;
      const task = state.find((task) => task.isActive);
      task.subtasks = task.subtasks.filter(
        (subtask, index) => index !== payload.index
      );
    },
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const task = state.find((task) => task.isActive);
      const subtask = task.subtasks.find((subtask, i) => i === payload.index);
      subtask.isCompleted = !subtask.isCompleted;
    },
  },
});

export default tasksSlice;
