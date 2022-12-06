import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import todoListSlice from "../pages/TodoList/reducers";

export const store = configureStore({
  reducer: {
    todosManager: todoListSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
