import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom'

export default function EditUser() {

    let navigate = useNavigate();

    const { id } = useParams();

    const [user, setUser] = useState({
        firstname: "",
        lastname: ""
    });

    const { firstname, lastname } = user;

    const onInputChange = (e) => {

        setUser({ ...user, [e.target.name]: e.target.value })

    };

    useEffect(() => {
        loadUsers();
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/users/${id}`, user);
        navigate("/");
    };

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:8080/users/${id}`);
        setUser(result.data);
    };

    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Edit User</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="Firstname" className="form-label">
                            Firstname
                        </label>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder="Enter your username"
                            name="firstname"
                            value={firstname}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Lastname" className="form-label">
                            Lastname
                        </label>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder="Enter your password"
                            name="lastname"
                            value={lastname}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <button type="subbmit" className="btn btn-outline-primary">Submit</button>
                    <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
                </form>
            </div>
        </div>
    </div>
}