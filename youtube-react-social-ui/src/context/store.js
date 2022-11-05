import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const authMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("auth")) {
    const authState = store.getState().user.currentUser;
    localStorage.setItem("auth", JSON.stringify(authState));
  }
  return result;
};
const reHydrateStore = () => {
  if (localStorage.getItem("auth") !== null) {
    return JSON.parse(localStorage.getItem("auth")); // re-hydrate the store
  }
};
export default configureStore({
  preloadedState: reHydrateStore(),
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

