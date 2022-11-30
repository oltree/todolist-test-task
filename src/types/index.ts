export interface ITodo {
  id: string;
  text: string;
  isCompleted: boolean;
  isEditMode: boolean;
  tags: string[];
}

export type ITodos = ITodo[];

export interface ITodoEdit {
  id: string;
  updatedText: string;
}

export type IForm = {
  todoText: string;
};
