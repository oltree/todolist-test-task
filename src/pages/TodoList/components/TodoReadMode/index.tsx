import { memo } from "react";

import styles from "./index.module.scss";

interface TodoReadModeProps {
  id: string;
  text: string;
  tags: string[];
  isCompleted: boolean;
  onTodoEdit: (id: string) => void;
  onTodoRemove: (id: string) => void;
  onTodoComlete: (id: string) => void;
}

const TodoReadMode = ({
  id,
  text,
  tags,
  isCompleted,
  onTodoEdit,
  onTodoRemove,
  onTodoComlete,
}: TodoReadModeProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.task}>
        <div
          className={styles.text}
          style={{
            textDecoration: isCompleted ? "line-through" : "none",
          }}
        >
          {text}
        </div>

        <div className={styles.buttons}>
          {!isCompleted && (
            <>
              <button
                onClick={() => onTodoComlete(id)}
                className={styles.button}
              >
                Comlete
              </button>

              <button onClick={() => onTodoEdit(id)} className={styles.button}>
                Edit
              </button>
            </>
          )}
          <button onClick={() => onTodoRemove(id)} className={styles.button}>
            Delete
          </button>
        </div>
      </div>

      <div className={styles.tags}>
        {tags?.map((tag) => (
          <div className={styles.tag} key={tag}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(TodoReadMode);
