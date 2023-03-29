import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function ViewUser() {

    const [todos, setUsers] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        loadUsers();
    });

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:8080/users/${id}/todos`);
        setUsers(result.data);
    };

    const completedTodo = async (id) => {
        await axios.post(`http://localhost:8080/users/todos/${id}`);
        loadUsers();
    }

    const deleteTodo = async (id2) => {
        await axios.delete(`http://localhost:8080/users/${id}/todos/${id2}`);
        loadUsers();
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Status</th>
                            <th scope="col">Completed</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((todo, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{todo.content}</td>
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
    )
}


