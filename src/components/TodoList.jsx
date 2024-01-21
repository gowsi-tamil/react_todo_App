import React, { useEffect, useState, useCallback } from 'react';
import { Tabs, Layout, Row, Col, Input, message } from 'antd';
import './TodoList.css';
import TodoTab from './TodoTab';
import TodoForm from './TodoForm';
//import TodoItem from './TodoItem';
import {
  createTodo,
  deleteTodo,
  loadTodos,
  updateTodo,
  updateTodo2,
} from '../services/todoService';


const { TabPane } = Tabs;
const { Content } = Layout;

const TodoList = () => {
 // const user = useSelector((state) => state.user.value);

  const [refreshing, setRefreshing] = useState(false);
  const [todos, setTodos] = useState([]);
  const [activeTodos, setActiveTodos] = useState([]);
  const [inProgressTodos, setInProgressTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const handleFormSubmit = async (todo) => {
    console.log('Todo to create', todo);
    await createTodo({
      title: todo.title,
      description: todo.description,
      status: todo.status || 'todo',
    });
    onRefresh();
    message.success('Todo added!');
  };

  const handleRemoveTodo = async (todo) => {
    console.log('Todo to remove', todo);
    await deleteTodo(todo.id);
    onRefresh();
    message.warn('Todo removed!');
  };

  const handleUpdateTodoStatus = async (todo, status) => {
    const updatedTodo = { todo, status };
    //console.log('updatedTodo', updatedTodo);
    await updateTodo(updatedTodo);
    onRefresh();
    message.info('Todo state updated!');
  };
  const onEditTodo = async (todo, status) => {
    const updatedTodo = { todo, status };
    console.log('updatedTodo', todo);
    await updateTodo2(updatedTodo);
    onRefresh();
    message.info('Todo updated!');
  };
  //   const onEditTodo = async (todo, status) => {
  //     console.log('Todo to change', todo);
  //     console.log('status', status);
  //     const updatedTodo = { todo, status };
  //     //console.log('updatedTodo', updatedTodo);
  //     await updateTodo(updatedTodo);
  //     onRefresh();
  //     message.info('Todo state updated!');
  //   };

  const refresh = async () => {
    try {
      const data = await loadTodos();
      setTodos(data);
      setActiveTodos(data.filter((todo) => todo.status === 'todo'));
      setInProgressTodos(data.filter((todo) => todo.status === 'inprogress'));
      setCompleteTodos(data.filter((todo) => todo.status === 'done'));
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refresh().finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [onRefresh]);

  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <div className="todolist">
          <Row>
            <Col span={14} offset={5}>
              <h1>Daily Tasks</h1>
              <TodoForm onFormSubmit={handleFormSubmit} />
              <br />
              <Tabs defaultActiveKey="all">
                <TabPane tab="All" key="all">
                  <TodoTab
                    todos={todos}
                    onTodoRemoval={handleRemoveTodo}
                    onUpdateTodoStatus={handleUpdateTodoStatus}
                    onEditTodo={onEditTodo}
                  />
                </TabPane>
                <TabPane tab="To Do" key="todo">
                  <TodoTab
                    todos={activeTodos}
                    onTodoRemoval={handleRemoveTodo}
                    onUpdateTodoStatus={handleUpdateTodoStatus}
                    onEditTodo={onEditTodo}
                  />
                </TabPane>
                <TabPane tab="In Progress" key="inprogress">
                  <TodoTab
                    todos={inProgressTodos}
                    onTodoRemoval={handleRemoveTodo}
                    onUpdateTodoStatus={handleUpdateTodoStatus}
                    onEditTodo={onEditTodo}
                  />
                </TabPane>
                <TabPane tab="Done" key="done">
                  <TodoTab
                    todos={completeTodos}
                    onTodoRemoval={handleRemoveTodo}
                    onUpdateTodoStatus={handleUpdateTodoStatus}
                    onEditTodo={onEditTodo}
                  />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
        {/* <div>
          <h1>Pro</h1>
          <h2>name:{user.name}</h2>
          <h2>Age:</h2>
          <h2>user:{user.email}</h2>
        </div> */}
      </Content>
    </Layout>
  );
};



export default TodoList;
