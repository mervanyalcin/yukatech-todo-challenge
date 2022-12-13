import store from "./store";
import { setUser } from "./store/auth";
import { setAllTodos } from "./store/todos";
import { setStateNumber } from "./store/useeffectrender";

export const userHandle = (data) => {
  store.dispatch(setUser(data)); 
};


export const todosHandle = (data) => {
  store.dispatch(setAllTodos(data));  
};

export const useEffectHandle = (data) => {
  store.dispatch(setStateNumber(data));  
};
