export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type Todos = Array<Todo>;

export interface Filters {
  [key: string]: (todos: Todos) => Todos;
}
