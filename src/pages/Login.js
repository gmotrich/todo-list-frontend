import { useState } from 'react';
import { useNavigate,  Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const { username, password } = credentials;
    const [error, setError] = useState('');

    const onInputChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/authenticate', credentials);
            const { token, id } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('id', id);
            navigate('/');
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
               setError(error.response.data.message);
            } else {
               setError('Invalid login or password');
            }
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Login</h2>
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
                            Login
                        </button>
                    </form>
                </div>
                <Link className="btn btn-outline-primary" to="/register">
                    You don't have an account?
                </Link>
            </div>
        </div>
    );
}