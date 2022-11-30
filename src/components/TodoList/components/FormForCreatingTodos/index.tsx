import { memo } from "react";

import { IForm } from "../../../../types";

import styles from "./index.module.scss";

interface FormForCreatingTodosProps {
  form: IForm;
  onFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTodoCreate: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FormForCreatingTodos = ({
  form,
  onFormChange,
  onTodoCreate,
}: FormForCreatingTodosProps): JSX.Element => {
  return (
    <form className={styles.form} onSubmit={onTodoCreate}>
      <input
        className={styles.input}
        name="todoText"
        value={form.todoText}
        onChange={onFormChange}
        type="text"
        placeholder="Create task with tag!"
      />

      <button
        className={styles.button}
        type="submit"
        disabled={form.todoText.length < 3}
      >
        ADD
      </button>
    </form>
  );
};

export default memo(FormForCreatingTodos);
