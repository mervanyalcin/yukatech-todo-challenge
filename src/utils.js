import store from "./store";
import { setUser } from "./store/auth";
import { setAllTodos } from "./store/todos";

export const userHandle = (data) => {
  store.dispatch(setUser(data)); 
};


export const todosHandle = (data) => {
  store.dispatch(setAllTodos(data)); 
};
