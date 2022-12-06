import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import TodoListLayout from "../components/TodoListLayout";

import {
  createTodo,
  removeTodo,
  editTodo,
  saveTodo,
  completeTodo,
  removeAllTodo,
} from "../reducers";

import { useForm } from "../../../hooks";

import { todosSelector } from "../selectors";

import { IForm, ITodoEdit } from "../../../types";

const TodoListContainer = (): JSX.Element => {
  const dispatch = useDispatch();

  const todos = useSelector(todosSelector);

  const [form, handleFormChange, handleFormReset] = useForm<IForm>({
    todoText: "",
  });

  const handleTodoCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedValue = form.todoText.trim();

    if (trimmedValue.length > 2) {
      dispatch(createTodo(form.todoText));
    }

    handleFormReset();
  };

  const handleTodoRemove = useCallback(
    (id: string) => {
      dispatch(removeTodo(id));
    },
    [dispatch]
  );

  const handleTodoEdit = useCallback(
    (id: string) => {
      dispatch(editTodo(id));
    },
    [dispatch]
  );

  const handleTodoEditSave = useCallback(
    ({ id, updatedText }: ITodoEdit) => {
      if (updatedText.trim().length > 2) {
        dispatch(saveTodo({ id, updatedText }));
      }
    },
    [dispatch]
  );

  const handleTodoComlete = useCallback(
    (id: string) => {
      dispatch(completeTodo(id));
    },
    [dispatch]
  );

  const handleTodoRemoveAll = () => {
    dispatch(removeAllTodo());
  };

  return (
    <TodoListLayout
      todos={todos}
      form={form}
      onFormChange={handleFormChange}
      onTodoCreate={handleTodoCreate}
      onTodoRemove={handleTodoRemove}
      onTodoEdit={handleTodoEdit}
      onTodoEditSave={handleTodoEditSave}
      onTodoComlete={handleTodoComlete}
      onTodoRemoveAll={handleTodoRemoveAll}
    />
  );
};

export default TodoListContainer;
