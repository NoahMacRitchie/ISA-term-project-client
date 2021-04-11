import React, { useState, useEffect } from 'react';
import { Card, Tag, Collapse, Checkbox, Typography, Row, Col, Button, Space, Input, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useAuth } from "../auth";
import CheckableTag from 'antd/lib/tag/CheckableTag';
import axios from 'axios';
const { Panel } = Collapse;
const { TextArea } = Input;
const { Text } = Typography;
type TodoCardProps = {
    title: string,
    details: string,
    dateCreated: Date,
    id: string,
    completed: boolean,
    updateFunction: Function
    allTags: { text: string, color: string, id: number }[]
    // currentTags: { text: string, color: string, id: number }[]
}




function TodoCard({ title, details, dateCreated, allTags, completed, id, updateFunction }: TodoCardProps) {
    const { authTokens } = useAuth();
    const [isEditMode, setEditMode] = useState(false);
    const [stateDetails, setDetails] = useState(details)
    const [activeTags, setActiveTags] = useState<any[]>([])
    const [selectedTags, setSelectedTags] = useState<any[]>([])
    useEffect(() => {
        const headers = {
            headers: {
                'Authorization': authTokens
            }
        }
        axios.get(`https://term-project-backend.herokuapp.com/api/v1/todos/${id}/tags`, headers)
            .then(result => {
                setActiveTags(result.data.tags)
                setSelectedTags(result.data.tags)
            }).catch(e => console.log(e.response.error));

    }, [isEditMode])

    async function putDetails() {
        const headers = {
            headers: {
                'Authorization': authTokens
            }
        }
        const payload = { 'details': stateDetails };
        return await axios.put(`https://term-project-backend.herokuapp.com/api/v1/todos/${id}`, payload, headers);
    }

    async function putCompleted(isCompleted: boolean) {
        const headers = {
            headers: {
                'Authorization': authTokens
            }
        }
        const payload = { 'completed': isCompleted };
        return await axios.put(`https://term-project-backend.herokuapp.com/api/v1/todos/${id}`, payload, headers);
    }

    async function deleteTodos() {
        const headers = {
            headers: {
                'Authorization': authTokens
            }
        }
        return await axios.delete(`https://term-project-backend.herokuapp.com/api/v1/todos/${id}`, headers);
    }
    async function deleteCard() {
        await deleteTodos();
        updateFunction();

    }
    async function putTags(tagIds: any) {

        const headers = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': authTokens
            }
        }
        const payload = { 'tags': tagIds };
        return await axios.put(`https://term-project-backend.herokuapp.com/api/v1/todos/${id}/tags`, payload, headers);
    }
    async function saveChanges() {
        let tagIds = selectedTags.map((t) => (t.id))

        await putTags(tagIds);
        await putDetails();

        setEditMode(false);
        updateFunction();
    }
    function toggleTag(tag: any) {
        let newActiveTags = [...selectedTags];

        if (selectedTags.some(t => t.id === tag.id)) {
            newActiveTags = newActiveTags.filter(t => t.id != tag.id);
        } else {
            newActiveTags.push(tag)
        }
        setSelectedTags(newActiveTags)
    }

    function ToDoHeader() {
        async function toggleCompleted(e: any) {
            await putCompleted(e.target.checked)
            updateFunction();
        }
        return (
            <div>
                <Row>
                    <Col span={2}>
                        <div onClick={e => e.stopPropagation()}>
                            <Checkbox defaultChecked={completed} onChange={toggleCompleted} />
                        </div>
                    </Col>
                    <Col span={16}>
                        <Text>{title}</Text>
                    </Col>

                    <Col span={6}>
                        <div style={{ float: 'right' }}>
                            <Text type="secondary">{dateCreated.toLocaleDateString()}</Text>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }


    return (
        <div>
            {/* <Card bordered={true} style={{ width: 300, margin: 10 }}> */}
            <Collapse bordered={true} ghost={true} style={{ width: 'calc(100% - 20px)', margin: 10, backgroundColor: '#fff' }}>
                {isEditMode ? <Panel showArrow={false} header={ToDoHeader()} key="1">
                    <Form>
                        <h5>Details</h5>
                        <TextArea key="1" onChange={e => setDetails(e.target.value)} defaultValue={details} />


                        <div style={{ marginTop: '10px' }}>
                            <Text type="secondary"> Tags:</Text>
                            {allTags.map(tag => {
                                return <CheckableTag key={`bbb${tag.id}`} checked={selectedTags.some(t => t.id === tag.id)} onChange={() => toggleTag(tag)} >{tag.text}</CheckableTag>
                            })}
                        </div>

                        <div style={{ height: "30px" }}>
                            <Space style={{ float: 'right', }} >
                                <Button type='primary' onClick={() => saveChanges()} >Save</Button>
                                <Button danger type='primary' onClick={() => deleteCard()} >Delete</Button>
                                <Button type='default' onClick={() => setEditMode(false)} >Cancel</Button>
                            </Space>

                        </div>
                    </Form>

                </Panel> : <Panel showArrow={false} header={ToDoHeader()} key="1">

                    <h5>Details</h5>
                    <Text>{details}</Text>
                    <div style={{ marginTop: '10px' }}>
                        <Text type="secondary"> Tags:</Text>
                        {activeTags.map(tag => {
                            return <Tag key={`ccc${tag.id}`} style={{ marginLeft: "4px" }} color={tag.color}>{tag.text}</Tag>
                        })}
                    </div>

                    <div style={{ height: "30px" }}>
                        <Space style={{ float: 'right', }} >

                            <Button onClick={() => setEditMode(true)} type='primary' >Edit</Button>
                        </Space>

                    </div>



                </Panel>}
            </Collapse>

        </div >
    );
}

export default TodoCard;
