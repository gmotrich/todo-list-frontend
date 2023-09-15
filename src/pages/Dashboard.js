import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [todos, setTodos] = useState([]);
    const [sortBy, setSortBy] = useState('');

    const id = localStorage.getItem('id');

    const loadTodos = async () => {
        try {
            let endpoint = `http://localhost:8080/todo/${id}/todos`;
            if (sortBy === 'title') {
                endpoint += '/sortedTitle'; 
            }
            if (sortBy === 'date') {
                endpoint += '/sortedDate';
            }
            const result = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTodos(result.data);
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleSortByDate = () => {
        setSortBy('date');
    };
      
    const handleDefault = () => {
        setSortBy('');
    };
      
    const handleSortByTitle = () => {
        setSortBy('title');
    };
      
    useEffect(() => {
        loadTodos();
    }, [sortBy]);

    const completedTodo = async (id) => {
        try {
            await axios.post(`http://localhost:8080/todo/todos/${id}`, null, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            loadTodos();
        } catch (error) {
            console.error(error);
        }
    };
    
    const deleteTodo = async (id2) => {
        try {
            await axios.delete(`http://localhost:8080/todo/${id}/todos/${id2}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            loadTodos();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2>Taskbar</h2>
            <div className='py-4'>
            <button className="btn btn-outline-primary mx-2" onClick={handleDefault}>Default</button>
                <button className="btn btn-outline-primary mx-2" onClick={handleSortByDate}>Sort by Date</button>
                <button className="btn btn-outline-primary mx-2" onClick={handleSortByTitle}>Sort by Title</button>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Srart</th>
                            <th scope="col">Finish</th>
                            <th scope="col">Status</th>
                            <th scope="col">Completed</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((todo, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{todo.content}</td>
                                    <td>{todo.start}</td>
                                    <td>{todo.finish}</td>
                                    <td>{todo.completed.toString()}</td>
                                    <td>
                                        <button className="btn btn-outline-primary mx-2"
                                            onClick={() => completedTodo(todo.id)}
                                        >Complete</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger mx-2"
                                            onClick={() => deleteTodo(todo.id)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
                <Link className="btn btn-outline-primary mx-2" to={`/addtodo/${id}`}>Add Todo</Link>
            </div>
        </div>
    );
}