import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AddToDoButton from '../components/AddToDoButton';
import TodoCard from '../components/TodoCard';
import AddToDoTag from '../components/AddToDoTag';
import { useAuth } from "../auth";
import { Button, Space } from 'antd';
import DeleteToDoTag from '../components/DeleteTodoTag';

function ToDoPage() {
    const { authTokens } = useAuth();
    const [todos, setTodos] = useState<any[]>([])
    const [tags, setTags] = useState<any[]>([])

    function updateTodos() {
        const headers = {
            headers: {
                'Authorization': authTokens
            }
        }
        axios.get('https://term-project-backend.herokuapp.com/api/v1/todos', headers)
            .then(result => setTodos(result.data.todos));

    }

    function updateTags() {
        const headers = {
            headers: {
                'Authorization': authTokens
            }
        }
        axios.get('https://term-project-backend.herokuapp.com/api/v1/tags', headers)
            .then(result => setTags(result.data.tags));

    }

    function update() {
        updateTodos();
        updateTags();

    }


    useEffect(() => {
        update();
    }, [])


    return (
        <div className="to-do-page">
            <div className="main-content">
                <Title className="landing-page-title" level={2}>My To-do List</Title>
                <div style={{ margin: '10px' }}>
                    <Space>
                        <AddToDoTag updateFunction={update} />
                        <DeleteToDoTag tags={tags} updateFunction={update} />
                    </Space>
                </div>

                {todos.map(todo =>
                    <TodoCard
                        key={`todo${todo.id}`}
                        id={todo.id}
                        completed={todo.completed}
                        title={todo.title}
                        details={todo.details}
                        dateCreated={new Date(todo.created_at * 1000)}
                        allTags={tags}
                        updateFunction={update}
                    />
                )}
                <div className="center-me">
                    <Space>
                        <AddToDoButton updateFunction={update} />
                    </Space>
                </div>
            </div>
        </div>
    );
}

export default ToDoPage;
