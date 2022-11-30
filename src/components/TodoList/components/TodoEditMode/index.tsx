import { memo } from "react";

import { useForm } from "../../../../hooks";

import styles from "./index.module.scss";

interface ITodoEditSave {
  id: string;
  updatedText: string;
}

interface TodoEditModeProps {
  id: string;
  text: string;
  onTodoEditSave: ({ id, updatedText }: ITodoEditSave) => void;
}

interface IForm {
  editText: string;
}

const TodoEditMode = ({
  id,
  text,
  onTodoEditSave,
}: TodoEditModeProps): JSX.Element => {
  const [form, handleFormChange] = useForm<IForm>({
    editText: text,
  });

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        name="editText"
        value={form.editText}
        type="text"
        onChange={handleFormChange}
      />

      <button
        className={styles.button}
        onClick={() => onTodoEditSave({ id, updatedText: form.editText })}
      >
        Save
      </button>
    </div>
  );
};

export default memo(TodoEditMode);
