import { fnParse } from "../../../helpers";
import { RootState } from "../../../store/store";

import { ITodos } from "../../../types";

export const todosSelector = (state: RootState): ITodos => {
  const todos = state.todosManager.todos;

  return fnParse(todos);
};
