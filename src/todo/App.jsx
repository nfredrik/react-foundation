import {
  useState,
  useEffect
} from 'react';

import axios from 'axios';

import styles from './App.module.css';

import { TodoForm } from './TodoForm';
import { Todo } from './Todo';

// ...

const useDocumentTitle = title => {
  document.title = title;
}

export function App() {
  const [todos, setTodos] = useState(null);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await axios(
        `https://jsonplaceholder.cypress.io/todos?_page=${page}`
      );

      setTodos(result.data);
    };

    fetchTodos();
  }, [page]);

  // fetching todos upon component mount only:
  // 
  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     const result = await axios(
  //       'https://jsonplaceholder.cypress.io/todos'
  //     );

  //     setTodos(result.data);
  //   };

  //   fetchTodos();
  // }, []);

  useDocumentTitle(
    `Todos (${todos
      ? todos.reduce(
        (count, todo) => !todo.completed ? ++count : count,
        0
      )
      : 'N/A'})`
  );

  // ...

  const createTodo = title => setTodos(
    [
      {
        id: Date.now(),
        completed: false,

        title
      },
      ...todos
    ]
  );

  const updateTodo = todoId => setTodos(
    todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }

      return todo;
    })
  );

  const deleteTodo = todoId => setTodos(
    todos.filter(
      todo => todo.id !== todoId
    )
  );

  return (
    <div className={styles.app}>
      <TodoForm createTodo={createTodo} />

      {todos && todos.map(todo => (
        <Todo
          key={todo.id}

          {...todo}

          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}

      <div style={{ marginTop: 25 }}>
        <button disabled={page === 1 ? true : false} onClick={() => setPage(page - 1)}>Prev</button>
        <button disabled={page === 5 ? true : false} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

