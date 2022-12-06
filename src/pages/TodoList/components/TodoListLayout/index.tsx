import { useMemo, useState } from "react";

import FormForCreatingTodos from "../FormForCreatingTodos";
import TodoListHeader from "../TodoListHeader";
import TodoEditMode from "../TodoEditMode";
import TodoReadMode from "../TodoReadMode";

import { IForm, ITodoEdit, ITodos } from "../../../../types";

import styles from "./index.module.scss";

interface TodoListLayoutProps {
  todos: ITodos;
  form: IForm;
  onFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTodoCreate: (event: React.FormEvent<HTMLFormElement>) => void;
  onTodoRemove: (id: string) => void;
  onTodoEdit: (id: string) => void;
  onTodoEditSave: ({ id, updatedText }: ITodoEdit) => void;
  onTodoComlete: (id: string) => void;
  onTodoRemoveAll: () => void;
}

const TodoListLayout = ({
  todos,
  form,
  onFormChange,
  onTodoCreate,
  onTodoRemove,
  onTodoEdit,
  onTodoEditSave,
  onTodoComlete,
  onTodoRemoveAll,
}: TodoListLayoutProps): JSX.Element => {
  const [inputSearch, setInputSearch] = useState<string>("");

  const handleInputSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputSearch(event.target.value);
  };

  const todosToRender: ITodos = useMemo(() => {
    return todos.filter((todo) => {
      const tag = inputSearch.toLowerCase();

      if (tag) {
        return todo.tags.includes(tag);
      }

      return todo;
    });
  }, [inputSearch, todos]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Todo List with Tags</h1>

      <FormForCreatingTodos
        form={form}
        onFormChange={onFormChange}
        onTodoCreate={onTodoCreate}
      />

      {todos.length > 0 && (
        <div className={styles.listContainer}>
          <TodoListHeader
            inputSearch={inputSearch}
            onInputSearchChange={handleInputSearchChange}
            onTodoRemoveAll={onTodoRemoveAll}
          />

          <div className={styles.list}>
            {todosToRender.map((todo) =>
              todo.isEditMode ? (
                <TodoEditMode
                  id={todo.id}
                  key={todo.id}
                  text={todo.text}
                  onTodoEditSave={onTodoEditSave}
                />
              ) : (
                <TodoReadMode
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  tags={todo.tags}
                  isCompleted={todo.isCompleted}
                  onTodoRemove={onTodoRemove}
                  onTodoEdit={onTodoEdit}
                  onTodoComlete={onTodoComlete}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoListLayout;
