import { model, Schema } from 'mongoose';

const Todo = new Schema<ApiTodo>({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  isComplete: {
    type: Boolean,
  },
  dueDate: {
    type: Date,
  },
});

export default model<ApiTodo>('Todo', Todo);
