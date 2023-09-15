import React, { useEffect } from 'react';
import { Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

export default function Navbar() {
    const id = localStorage.getItem('id'); 
    const isAuthenticated = localStorage.getItem('token');
    let navigate = useNavigate();
    
    const handleEdit = () => {
      navigate(`/edituser/${id}`);
  };

    useEffect(() => {
        isTokenExpired();
      }, []);

    const isTokenExpired = () => {
        if (isAuthenticated) {
            const decodedToken = jwt_decode(isAuthenticated)
            if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem('token');
                window.location.reload();
            }
        }
    };

      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                ToDo Application
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              {isAuthenticated ? (
                <button className="btn btn-outline-light" onClick={handleEdit}>
                  Edit
                </button>
              ) : (
                <Link className="btn btn-outline-light" to="/login">
                  Log on
                </Link>
              )}
            </div>
          </nav>
        </div>
      );
}
