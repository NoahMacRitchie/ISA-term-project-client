import '../App.less';
import { Form, Input, Button, Card } from 'antd';
import { useAuth } from "../auth";
import axios from 'axios';
import { Link, Redirect, useHistory } from "react-router-dom";

function LoginCard() {
    const history = useHistory();
    const { setAuthTokens } = useAuth();
    const tailLayout = {
        wrapperCol: { offset: 8, span: 8 },
    };

    const layout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
    };

    const onFinish = async (values: any) => {

        const route = "https://term-project-backend.herokuapp.com/api/v1/users/login";
        const payload = { 'email': values.email, 'password': values.password };
        const result = await axios.post(route, payload);
        if (result.data && result.data.token) {
            setAuthTokens(result.data.token);
            history.push("/todo");

        }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-card">
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

export default LoginCard;
