import React from 'react';
import { Form, Row, Col, Button, Input, Select } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

const { Option } = Select;

const TodoForm = ({ onFormSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    const title = form.getFieldValue('title');
    const description = form.getFieldValue('description') || ''; // Assuming description is an optional field
    const status = form.getFieldValue('status') || 'todo'; // Defaulting to 'todo' if status is not selected

    onFormSubmit({ title, description, status });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      className="todo-form"
    >
      <Row gutter={20}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item
            name={'title'}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item name={'description'}>
            <Input placeholder="Description" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <Form.Item name={'status'} initialValue="todo">
            <Select placeholder="Status">
              <Option value="todo">To Do</Option>
              <Option value="inprogress">In Progress</Option>
              <Option value="done">Done</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={2} lg={2} xl={2}>
          <Button type="primary" htmlType="submit" block>
            <PlusCircleFilled />
            Add todo
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TodoForm;
