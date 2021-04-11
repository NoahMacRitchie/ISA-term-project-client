
import '../App.less';
import { Typography, Row, Col, Button } from 'antd';
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../auth";
const { Title } = Typography;
function LandingPage() {
    const { authTokens } = useAuth();
    const history = useHistory();
    if (authTokens) {
        history.push("/todo");
    }
    return (
        <div className="landing-page">
            <div className="blob-background" />

            <Row>
                <Col span={24}>
                    <Title className="landing-page-title" level={2}>Really awesome to-do list website</Title>
                    <div className="center-me">
                        <Button type='primary' onClick={() => history.push("/login")}>Login</Button>
                        <Button onClick={() => history.push("/signup")}>Sign Up</Button>
                    </div>

                </Col>
            </Row>

        </div>
    );
}

export default LandingPage;
