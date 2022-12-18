import { combineReducers, configureStore } from "@reduxjs/toolkit";
import PropsListReducer from "./propsReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  PropsListReducer,
});

const store = configureStore({ reducer: rootReducer, devTools: true });
store.getState();
export default store;
export type RootState = ReturnType<typeof rootReducer>;
