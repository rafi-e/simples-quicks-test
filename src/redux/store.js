import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./slice/taskSlice";
import inboxSlice from "./slice/inboxSlice";

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    conversations: inboxSlice.reducer,
  },
});

export default store;
