import { memo } from "react";

import styles from "./index.module.scss";

interface TodoListHeaderProps {
  inputSearch: string;
  onInputSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTodoRemoveAll: () => void;
}

const TodoListHeader = ({
  inputSearch,
  onInputSearchChange,
  onTodoRemoveAll,
}: TodoListHeaderProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.searchField}
        value={inputSearch}
        type="search"
        placeholder="Search task by tag..."
        onChange={onInputSearchChange}
      />

      <div onClick={onTodoRemoveAll} className={styles.close} />
    </div>
  );
};

export default memo(TodoListHeader);
