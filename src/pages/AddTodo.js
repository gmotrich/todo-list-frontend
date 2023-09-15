import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

export default function AddTodo() {

    let navigate = useNavigate();

    let id = localStorage.getItem('id');

    const [todo, setUser] = useState({
        content: "",
        start: "",
        finish: ""
    });

    const { content, start, finish } = todo;

    const onInputChange = (e) => {

        setUser({ ...todo, [e.target.name]: e.target.value })

    };


    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8080/todo/${id}/todos`, todo,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        navigate(`/dashboard`); 
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
                            <label htmlFor="Title" className="form-label">
                                Start
                            </label>
                            <input
                                type={"date"}
                                className="form-control"
                                placeholder="Enter your start"
                                name="start"
                                value={start}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor="Title" className="form-label">
                                Finish
                            </label>
                            <input
                                type={"date"}
                                className="form-control"
                                placeholder="Enter your finish"
                                name="finish"
                                value={finish}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                        <Link className="btn btn-outline-danger mx-2" to={`/dashboard`}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}