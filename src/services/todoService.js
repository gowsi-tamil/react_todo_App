const baseUrl = `${process.env.REACT_APP_API_URL}/todos`;

export const loadTodos = () => {
  return fetch(baseUrl).then((res) => res.json());
};

export const getTodo = (id) => {
  return fetch(`${baseUrl}/${id}`).then((res) => res.json());
};

export const createTodo = (todo) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: todo.title,
      description: todo.description,
      status: 'todo', // Assuming a new todo is always in the 'todo' status
    }),
  }).then((res) => res.json());
};

export const updateTodo = (todo) => {
  console.log('todo', todo);
  return fetch(`${baseUrl}/${todo.todo}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      id: todo.todo,
      title: todo.title,
      description: todo.description,
      status: todo.status,
    }),
  });
};

export const updateTodo2 = (todo) => {
  console.log('todo22', todo);
  return fetch(`${baseUrl}/${todo.todo}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      id: todo.todo,
      title: todo.status.title,
      description: todo.status.description,
      status: todo.status.status,
    }),
  });
};

export const deleteTodo = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  }).then((res) => res.json());
};
