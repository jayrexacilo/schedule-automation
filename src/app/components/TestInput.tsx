"use client"
import React, { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [todoName, setTodoName] = useState('');

  useEffect(() => {
    getTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('e => ', e);
    const formData = new FormData(e.target);
    let params = {data: formData.get('todo')};
    if(isUpdate) params = {
      id: todoId,
      data: formData.get('todo')
    };
    const api = isUpdate ? '/api/update-todo' : '/api/add-todo';
    const add = await fetch(api, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
          "Content-Type": "application/json",
      }
    });
    console.log('add => ', add);
    e.target.reset();
    setTodoId(null);
    setIsUpdate(false);
    setTodoName('');
    getTodos();
  };

  const getTodos = async () => {
    const get = await fetch('/api/get-todos', {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      }
    });
    const data = await get.json();
    console.log('get => ', data);
    setTodos(data);
  };

  const handleDelete = async (item) => {
    const get = await fetch('/api/delete-todo', {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({id: item.id})
    });
    getTodos();
  };

  const handleUpdate = async (item) => {
    setTodoId(item.id);
    setTodoName(item.name);
    setIsUpdate(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <form onSubmit={handleSubmit}>
        <input name="todo"
          value={todoName}
          onChange={e => setTodoName(e.target.value)}
          placeholder="Enter todo"
          required
        />
        <button type="submit">Submit</button>
      </form>

      <div className="mt-10 w-full">
        {todos?.length ? todos.map(item => <div className="grid grid-cols-3">
        <div>{item.name}</div>
        <button onClick={() => handleUpdate(item)}>Update</button>
        <button onClick={() => handleDelete(item)}>Delete</button>
        </div>) : null}
      </div>
    </main>
  )
}
