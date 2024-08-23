import { createSlice } from "@reduxjs/toolkit";
import data from "../../assets/data/dataMessage.json";

const inboxSlice = createSlice({
  name: "inbox",
  initialState: data.conversations,
  reducers: {
    addMessage: (state, action) => {
      const isActive = state.length > 0 ? false : true;
      const payload = action.payload;
      const conversation = {
        groupName: payload.groupName,
        isActive,
        users: [],
        messages: [],
      };
      conversation.users = payload.newUsers;
      conversation.messages = payload.message;
      state.push(conversation);
    },
    updateMessage: (state, action) => {
      const { conversationId, messageId, updates } = action.payload;
      const conversation = state.find(
        (conversation) => conversation.id === conversationId
      );
      if (conversation) {
        const message = conversation.messages.find(
          (message) => message.id === messageId
        );
        if (message) {
          Object.assign(message, updates);
        }
      }
    },
    deleteMessage: (state, action) => {
      const { conversationId, messageId } = action.payload;
      const conversation = state.find(
        (conversation) => conversation.id === conversationId
      );
      if (conversation) {
        conversation.messages = conversation.messages.filter(
          (message) => message.id !== messageId
        );
      }
    },
  },
});

export default inboxSlice;
