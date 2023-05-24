import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import axios from 'axios';

class API {
  API_URL: string;

  constructor(options: { API_URL: string }) {
    this.API_URL = options.API_URL;
  }

  async getTodos(): Promise<ApiTodos> {
    try {
      const res = await axios.get<ApiTodos>(`${this.API_URL}/todos`);

      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async addTodo(todo: Todo): Promise<ApiTodo | undefined> {
    try {
      const res = await axios.post<ApiTodo | undefined>(`${this.API_URL}/todos`, todo);

      return res.data;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}

const api = new API({ API_URL: process.env.API_URL || '' });

function Todo() {
  const [state, setState] = useState({ description: '', title: '', dueDate: '' });
  const [todos, setTodos] = useState([] as ApiTodos);

  const onChange =
    (field: string): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =>
    (e) => {
      const newState = { ...state, [field]: e.target.value };

      setState(newState);
    };

  const getTodos = useCallback(async () => {
    const res = await api.getTodos();

    setTodos(res);
  }, [setTodos]);

  useEffect(() => {
    void getTodos();
  }, [getTodos]);

  const onSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newTodo = await api.addTodo(state);

      if (newTodo !== undefined) {
        setTodos([...todos, newTodo]);
      }
    },
    [state, setTodos, todos],
  );

  return (
    <div className='todo'>
      <form className='todo-form' onSubmit={(e) => void onSubmit(e)}>
        <input
          type='text'
          name='title'
          id='title'
          value={state.title}
          onChange={onChange('title')}
          placeholder='Title'
          required
        />
        <textarea
          name='description'
          value={state.description}
          onChange={onChange('description')}
          id='description'
          cols={20}
          rows={3}
          placeholder='Description'
        />
        <input type='date' name='dueDate' value={state.dueDate} onChange={onChange('dueDate')} />
        <input type='submit' value='Add' />
      </form>
      <div className='todo-list'>
        {todos.map((item) => (
          <div className='todo-item' key={item._id}>
            <input type='checkbox' name='done' />
            <div>
              <h6>{item.title}</h6>
              {item.description && <p>{item.description}</p>}
              {item.dueDate && <p>{new Date(item.dueDate).toDateString()}</p>}
            </div>
            <input type='button' checked={item.isComplete} onChange={(e) => console.log(e)} value='Delete' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
