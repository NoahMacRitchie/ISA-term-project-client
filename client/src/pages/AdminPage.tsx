import React, { useEffect, useState } from 'react';
import ApiMetricCard from '../components/ApiMetricCard';
import axios from 'axios';
import { Typography } from 'antd';
import { useAuth } from "../auth";
const { Title } = Typography;

type Route = {
    path: string,
    method: string,
    hits: number
}

function AdminPage() {
    const [routes, setRoutes] = useState([]);
    const { authTokens } = useAuth();
    useEffect(() => {

        const headers = {
            headers: {
                'Authorization': authTokens
            }
        }
        axios.get("https://term-project-backend.herokuapp.com/api/v1/routes", headers).then(res => {
            if (res && res.data) {
                setRoutes(res.data.routes)
            }
        })
    }, [])
    return (
        <div className="admin-page">
            <Title className="landing-page-title" level={2}>Admin Portal</Title>
            <div className="routes">
                {routes.map((route: Route) =>
                    <ApiMetricCard url={route.path} hits={route.hits} method={route.method} />
                )}
            </div>
        </div>
    );
}

export default AdminPage;
