interface ApiTodo {
  title: string;
  description: string;
  dueDate: string;
  isComplete: boolean;
  _id: string;
}

type ApiTodos = ApiTodo[];
