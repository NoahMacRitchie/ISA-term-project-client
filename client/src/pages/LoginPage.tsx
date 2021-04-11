import React from 'react'; 
import { Row, Col } from 'antd';
import LoginCard from '../components/LoginCard';
const row = {
    justify: { span: 8 },
    wrapperCol: { span: 16 },
};
function LoginPage() {
    return (
        <div className="login-page">
            <LoginCard/>
        </div>

    );
   
  }

export default LoginPage;
