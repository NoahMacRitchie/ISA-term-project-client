import '../App.less';
import { Form, Input, Button, Card } from 'antd';
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../auth";
import axios from 'axios';


function SignUpCard() {
    const { setAuthTokens } = useAuth();
    const history = useHistory()
    const tailLayout = {
        wrapperCol: { offset: 8, span: 8 },
    };

    const layout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
    };

    const onFinish = async (values: any) => {

        const route = "https://term-project-backend.herokuapp.com/api/v1/users";
        const payload = { 'email': values.email, 'password': values.password };
        const result = await axios.post(route, payload);
        if (result) {

            history.push("/login")
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="sign-up-card">
            <Card title="Login" bordered={true} style={{ width: '100%' }}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { type: 'email', message: "This is not a valid email!" },
                            { required: true, message: 'Please input your email!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );

}

export default SignUpCard;
