import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todos = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setAllTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { setAllTodos } = todos.actions;
export default todos.reducer;
