import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";

import TodoListContainer from "./pages/TodoList/container/TodoListContainer";

import "./static/styles/normalize.scss";
import "./static/styles/styles.scss";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <TodoListContainer />
    </Provider>
  </StrictMode>
);
