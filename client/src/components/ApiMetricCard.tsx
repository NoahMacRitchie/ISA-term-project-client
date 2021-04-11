import React from 'react'; 
import { Card, Tag } from 'antd';

type ApiCardProps = {
    url: string,
    hits: number,
    method: string,
}

function ApiMetricCard({url, hits, method}: ApiCardProps) {
    const getTagColor = (method: string) => {
        switch(method){
            case("GET"): return "#61affe";
            case("POST"): return "#49cc90";
            default: return "#777777"
        }
    }
    return (
        <div>
            <Card title={url} bordered={true} style={{width: 300, margin: 10}}>
                <p>Hits:{hits}</p>
                <Tag color={getTagColor(method)}>{method}</Tag>
            </Card>
        </div>
    );
  }

export default ApiMetricCard;
