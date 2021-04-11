import React, { useState } from 'react';
import { Button, Modal, Form, Input, Tag, Select } from 'antd';
import { useAuth } from "../auth";
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;
const { CheckableTag } = Tag;
type EditToDoProps = {
    updateFunction: Function,
    tags: { text: string, color: string, id: number }[]

}
function DeleteToDoTag({ updateFunction, tags }: EditToDoProps) {
    const { authTokens } = useAuth();
    const [showModal, setShowModal] = useState(false);


    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    };
    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const selectedTag = (tags.find((tag) => values.tag === tag.text));
        if (selectedTag) {
            const headers = {
                headers: {
                    'Authorization': authTokens
                }
            }
            const route = `https://term-project-backend.herokuapp.com/api/v1/tags/${selectedTag.id}`;
            const result = await axios.delete(route, headers).catch(e => console.log(e.response.error));
            setShowModal(false);
            updateFunction();
        }

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
            <Button onClick={() => setShowModal(true)}>Delete Tag</Button>
            {showModal &&
                <Modal
                    title={`Delete tag `}
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
                            name="tag"

                            rules={[
                                { required: true, message: 'Please select the tag that you want to delete!!' }
                            ]}
                        >
                            <Select>
                                {tags.map((tag) => <Option key={`option${tag.id}`} value={tag.text}>{tag.text}</Option>)}
                            </Select>
                        </Form.Item>

                        <Form.Item >
                            <Button danger type="primary" htmlType="submit">
                                Delete
                        </Button>
                        </Form.Item>

                    </Form>

                </Modal>}
        </div>
    );
}

export default DeleteToDoTag;
