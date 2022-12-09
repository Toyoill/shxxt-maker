import { combineReducers, configureStore } from "@reduxjs/toolkit";
import PropsListReducer from "./propsReducer";
const rootReducer = combineReducers({
  PropsListReducer,
});

const store = configureStore({ reducer: rootReducer });
store.getState();
export default store;
export type RootState = ReturnType<typeof rootReducer>;
