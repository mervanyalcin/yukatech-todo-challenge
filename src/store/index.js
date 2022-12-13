import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import todos from "./todos";
import useeffectrender from "./useeffectrender";

const store = configureStore({
  reducer: {
    auth,
    todos,
    useeffectrender,
  },
});

export default store;
