import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const { username, password } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/auth/register', user);

            const { token, id } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('id', id);

            navigate('/');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
               setError(error.response.data.message);
            } else {
               setError('An error occurred');
            }
         }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register User</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                name="username"
                                value={username}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                name="password"
                                value={password}
                                onChange={onInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Register
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}