/*import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom'

export default function Home() {

    const [users, setUsers] = useState([]);


    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/users");
        console.log(result.data);
        setUsers(result.data);
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/users/${id}`);
        loadUsers();
    }


    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{user.username}</td>
                                    <td>
                                        <Link className="btn btn-outline-primary mx-2"
                                            to={`/viewuser/${user.id}`}
                                        >View</Link>
                                        <Link className="btn btn-outline-primary mx-2"
                                            to={`/edituser/${user.id}`}
                                        >Edit</Link>
                                        <button className="btn btn-danger mx-2"
                                            onClick={() => deleteUser(user.id)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}*/

import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const transitionHandle = () => {
        navigate(`/dashboard`);
        window.location.reload();
    };

    return (
        <div className="container">
            <h2>Welcome to the to-do list!</h2>
            <Link className="btn btn-outline-primary mx-2" onClick={transitionHandle}>Go To The Taskbar</Link>
        </div>
    );
}