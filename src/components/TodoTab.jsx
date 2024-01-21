import React from 'react';
import { List, Select } from 'antd';
import TodoItem from './TodoItem';

const { Option } = Select;

const TodoTab = ({ todos, onTodoRemoval, onUpdateTodoStatus, onEditTodo }) => {
  const handleStatusChange = (todoId, status) => {
    onUpdateTodoStatus(todoId, status);
  };

  const handleStatusChange2 = (todoId, status) => {
    onEditTodo(todoId, status);
  };

  return (
    <List
      locale={{
        emptyText: "There's nothing to do :(",
      }}
      dataSource={todos}
      renderItem={(todo) => (
        <List.Item>
          <TodoItem
            todo={todo}
            onTodoRemoval={onTodoRemoval}
            onUpdateTodoStatus={handleStatusChange}
            onEditTodo={handleStatusChange2}
          />
        </List.Item>
      )}
      pagination={{
        position: 'bottom',
        pageSize: 10,
      }}
    />
  );
};

export default TodoTab;
