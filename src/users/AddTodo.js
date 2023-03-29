import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom'

export default function AddTodo() {

    let navigate = useNavigate();

    const { id } = useParams();

    const [todo, setUser] = useState({
        content: "",
    });

    const { content } = todo;

    const onInputChange = (e) => {

        setUser({ ...todo, [e.target.name]: e.target.value })

    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8080/users/${id}/todos`, todo);
        navigate(`/viewuser/${id}`); 
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add Todo</h2>
                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className="mb-3">
                            <label htmlFor="Title" className="form-label">
                                Title
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your title"
                                name="content"
                                value={content}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                        <Link className="btn btn-outline-danger mx-2" to={`/viewuser/${id}`}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}