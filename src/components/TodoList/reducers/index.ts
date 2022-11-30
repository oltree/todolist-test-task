import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

import { fnParse, fnStringify } from "../../../helpers";

import { ITodo } from "../../../types";

interface InitialState {
  todos: string;
}

interface SaveTodoPayloadActions {
  id: string;
  updatedText: string;
}

const initialState: InitialState = {
  todos: "[]",
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    createTodo: (state, { payload: todoText }: PayloadAction<string>) => {
      const todoItem: ITodo = {
        id: uuid(),
        text: todoText,
        isCompleted: false,
        isEditMode: false,
        tags: [],
      };

      const todoTextUpdated = todoItem.text
        .split(" ")
        .map((item) => {
          const tag = item.toLowerCase();
          const foundTag = todoItem.tags.includes(item);

          if (item[0] === "#") {
            if (!foundTag) {
              todoItem.tags.unshift(tag);
            } else {
              return (item = "");
            }

            return item.slice(1);
          }

          return item;
        })
        .join(" ");

      todoItem.text = todoTextUpdated;
      const todos = fnParse(state.todos);
      todos.unshift(todoItem);

      state.todos = fnStringify(todos);
    },

    removeTodo: (state, { payload: id }: PayloadAction<string>) => {
      const todos = fnParse(state.todos);
      const todoIndexToRemove = todos.findIndex(
        (todo: ITodo) => todo.id === id
      );

      todos.splice(todoIndexToRemove, 1);

      state.todos = fnStringify(todos);
    },

    editTodo: (state, { payload: id }: PayloadAction<string>) => {
      const todos = fnParse(state.todos);
      const foundTodo = todos.find((todo) => todo.id === id);

      if (foundTodo) {
        foundTodo.isEditMode = !foundTodo.isEditMode;

        const foundTodoTags = foundTodo.tags.map((tag) => tag.slice(1));
        const todoText = foundTodo.text
          .split(" ")
          .map((item) => (foundTodoTags.includes(item) ? `#${item}` : item))
          .join(" ");

        foundTodo.text = todoText;
      }

      state.todos = fnStringify(todos);
    },

    saveTodo: (state, { payload }: PayloadAction<SaveTodoPayloadActions>) => {
      const { id, updatedText } = payload;

      const todos = fnParse(state.todos);
      const foundTodo = todos.find((todo: ITodo) => todo.id === id);

      if (foundTodo) {
        foundTodo.tags.length = 0;
        foundTodo.text = updatedText
          .split(" ")
          .map((item) => {
            const tag = item.toLowerCase();
            const foundTag = foundTodo.tags.includes(item);

            if (item[0] === "#") {
              if (!foundTag) {
                foundTodo.tags.unshift(tag);
              }

              return item.slice(1);
            }

            return item;
          })
          .join(" ");

        foundTodo.isEditMode = false;
      }

      state.todos = fnStringify(todos);
    },

    completeTodo: (state, { payload: id }: PayloadAction<string>) => {
      const todos = fnParse(state.todos);
      const foundTodo = todos.find((todo: ITodo) => todo.id === id);

      if (foundTodo) {
        foundTodo.tags.length = 0;
        foundTodo.isCompleted = true;
      }

      state.todos = fnStringify(todos);
    },

    removeAllTodo: () => initialState,
  },
});

export const {
  createTodo,
  removeTodo,
  editTodo,
  saveTodo,
  completeTodo,
  removeAllTodo,
} = todoListSlice.actions;

export default todoListSlice.reducer;
