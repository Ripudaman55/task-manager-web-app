// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    // Fetch todos from the backend when the component mounts
    axios.get('/api/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  const addTodo = () => {
    axios.post('/api/todos', { text: newTodo })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      })
      .catch(error => console.error(error));
  };

  const deleteTodo = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>MERN Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
