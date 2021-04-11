import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import axios from 'axios';

import { useAuth } from "../auth";
const { TextArea } = Input;
type TodoCardProps = {
  updateFunction: Function,
}

function AddToDoButton({ updateFunction }: TodoCardProps) {
  const { authTokens } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const tailLayout = {
    wrapperCol: { offset: 20, span: 4 },
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const onFinish = async (values: any) => {
    const headers = {
      headers: {
        'Authorization': authTokens
      }
    }
    const route = "https://term-project-backend.herokuapp.com/api/v1/todos";
    const payload = { 'title': values.title, 'details': values.details };
    const result = await axios.post(route, payload, headers).catch(e => console.log(e.response.error));
    updateFunction();
    setShowModal(false);

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setShowModal(true)}>Add Todo</Button>
      {showModal &&
        <Modal
          title="Add To-do"
          visible={showModal}
          onCancel={() => setShowModal(false)}
          footer={[
            <div />
          ]}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Title"
              name="title"

              rules={[
                { required: true, message: 'Please enter a To-do title!!' }
              ]}
            >
              <Input placeholder="What do you want to name your To-do!" />
            </Form.Item>

            <Form.Item
              label="Details"
              name="details"
            >
              <TextArea
                placeholder="Write some details about your To-do item!"
                autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>



            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
                        </Button>
            </Form.Item>
          </Form>

        </Modal>}
    </div>
  );
}

export default AddToDoButton;
