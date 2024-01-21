import React, { useState } from 'react';
import {
  Tooltip,
  Tag,
  List,
  Button,
  Popconfirm,
  Select,
  Modal,
  Form,
  Input,
} from 'antd';
import { CloseOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';

const { Option } = Select;

const Todo = ({ todo, onTodoRemoval, onUpdateTodoStatus, onEditTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm] = Form.useForm();

  const handleStatusChange = (value) => {
    onUpdateTodoStatus(todo.id, value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    editForm.setFieldsValue({
      title: todo.title,
      description: todo.description,
      status: todo.status,
    });
  };
  // const handleEditSubmit = () => {
  //   setIsEditing(true);
  //   editForm.setFieldsValue({
  //     title: todo.title,
  //     description: todo.description,
  //     status: todo.status,
  //   });
  // };

  const handleEditCancel = () => {
    setIsEditing(false);
  };


  const handleEditSubmit = () => {
    editForm
      .validateFields()
      .then((values) => {
        // Pass both todo id and updated values to onEditTodo
        console.log('values', values);
        let obj = {
          id: todo.id,
          description: values.description,
          status: values.status,
          title: values.title,
        };
        onEditTodo(todo.id, obj);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Validation error:', error);
      });
  };

  return (
    <List.Item
      actions={[
        <Tooltip
          title={todo.status === 'done' ? 'Mark as not done' : 'Mark as done'}
        >
          <Select
            defaultValue={todo.status}
            style={{ width: 120 }}
            onChange={handleStatusChange}
          >
            <Option value="todo">To Do</Option>
            <Option value="inprogress">In Progress</Option>
            <Option value="done">Done</Option>
          </Select>
        </Tooltip>,
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => onTodoRemoval(todo)}
        >
          <Button className="remove-todo-button" type="primary" danger>
            <CloseOutlined />
          </Button>
        </Popconfirm>,
        <Tooltip title="Edit Todo">
          <Button type="primary" onClick={handleEditClick}>
            <EditOutlined />
          </Button>
        </Tooltip>,
      ]}
      className="list-item"
      key={todo.id}
    >
      <div className="todo-item">
        <Tag color={getTagColor(todo.status)} className="todo-tag">
          {todo.title}
        </Tag>
      </div>

      <Modal
        title="Edit Todo"
        visible={isEditing}
        onCancel={handleEditCancel}
        onOk={handleEditSubmit}
        destroyOnClose
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select the status' }]}
          >
            <Select>
              <Option value="todo">To Do</Option>
              <Option value="inprogress">In Progress</Option>
              <Option value="done">Done</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </List.Item>
  );
};

const getTagColor = (status) => {
  switch (status) {
    case 'todo':
      return 'red';
    case 'inprogress':
      return 'yellow';
    case 'done':
      return 'cyan';
    default:
      return 'red';
  }
};




export default Todo;