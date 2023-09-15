import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

export default function EditUser() {

    let navigate = useNavigate();

    let id = localStorage.getItem('id');

    const [user, setUser] = useState({
        password: ""
    });

    const onInputChange = (e) => {

        setUser({ ...user, [e.target.name]: e.target.value })

    };


    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/users/${id}`, user,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        navigate(`/dashboard`); 
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate(`/`); 
        window.location.reload();
    };

    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Edit User</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter your new password"
                                name="password"
                                onChange={onInputChange}
                            />
                    </div>
                    <button type="subbmit" className="btn btn-outline-primary">Submit</button>
                    <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
                </form>
            </div>
            <button className="btn btn-outline-primary" onClick={handleLogout}>
                  Logout
            </button>
        </div>
    </div>
}