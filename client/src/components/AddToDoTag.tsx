import React, { useState } from 'react';
import { Button, Modal, Form, Input, Tag, Select } from 'antd';
import { useAuth } from "../auth";
import axios from 'axios';
const { TextArea } = Input;
const { CheckableTag } = Tag;
type EditToDoProps = {
    updateFunction: Function,

}
function AddToDoTag({ updateFunction }: EditToDoProps) {
    const { authTokens } = useAuth();
    const [showModal, setShowModal] = useState(false);


    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    };
    const onFinish = async (values: any) => {

        const headers = {
            headers: {
                'Authorization': authTokens
            }
        }
        const route = "https://term-project-backend.herokuapp.com/api/v1/tags";
        const payload = { 'color': values.color, 'text': values.name };
        const result = await axios.post(route, payload, headers).catch(e => console.log(e.response.error));
        setShowModal(false);
        updateFunction();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const isValidHexColor = (colorString: string) => {
        const RegExp = /^#[0-9A-F]{6}$/i;
        return RegExp.test(colorString);
    }
    return (
        <div>
            <Button onClick={() => setShowModal(true)}>Add New Tag</Button>
            {showModal &&
                <Modal
                    title={`Create new tag `}
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
                            label="Tag name"
                            name="name"

                            rules={[
                                { required: true, message: 'Please enter the name of the tag!!' }
                            ]}
                        >
                            <Input placeholder="What do you want to name your tag?" />
                        </Form.Item>
                        <Form.Item
                            label="Tag Color"
                            name="color"

                            rules={[{
                                validator: async (_: any, color: string) => {
                                    if (!isValidHexColor(color)) {
                                        return Promise.reject(new Error('Invalid Hex color'));
                                    }
                                },
                            }
                            ]}>
                            <Input placeholder="#445454" />


                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Create
                        </Button>
                        </Form.Item>

                    </Form>

                </Modal>}
        </div>
    );
}

export default AddToDoTag;
