
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  userId?: string;
}

interface ChatState {
  chatHistory: ChatMessage[];
  isTyping: boolean;
  error: string | null;
  lastMessage: string | null;
  unreadMessages: number;
}

const initialState: ChatState = {
  chatHistory: [],
  isTyping: false,
  error: null,
  lastMessage: null,
  unreadMessages: 0,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessageStart: (state, action: PayloadAction<{ message: string; userId?: string }>) => {
      const { message, userId } = action.payload;
      state.chatHistory.push({
        id: Date.now().toString(),
        content: message,
        sender: 'user',
        timestamp: new Date().toISOString(),
        userId,
      });
      state.isTyping = true;
      state.error = null;
    },
    sendMessageSuccess: (state, action: PayloadAction<{ content: string }>) => {
      state.chatHistory.push({
        id: Date.now().toString(),
        content: action.payload.content,
        sender: 'assistant',
        timestamp: new Date().toISOString(),
      });
      state.isTyping = false;
      state.lastMessage = action.payload.content;
      state.unreadMessages += 1;
    },
    sendMessageFailure: (state, action: PayloadAction<string>) => {
      state.isTyping = false;
      state.error = action.payload;
    },
    markMessagesAsRead: (state) => {
      state.unreadMessages = 0;
    },
    clearChatHistory: (state) => {
      state.chatHistory = [];
      state.lastMessage = null;
      state.unreadMessages = 0;
    },
  },
});

export const {
  sendMessageStart,
  sendMessageSuccess,
  sendMessageFailure,
  markMessagesAsRead,
  clearChatHistory,
} = chatSlice.actions;

export const selectChat = (state: RootState) => state.chat;
export const selectChatHistory = (state: RootState) => state.chat.chatHistory;
export const selectUnreadMessages = (state: RootState) => state.chat.unreadMessages;
export const selectIsTyping = (state: RootState) => state.chat.isTyping;

export default chatSlice.reducer;
