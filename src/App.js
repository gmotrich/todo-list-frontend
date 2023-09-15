import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import EditUser from './pages/EditUser';
import AddTodo from './pages/AddTodo';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import { Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
    const isAuthenticated = localStorage.getItem('token');

    return isAuthenticated ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login" replace={true} />
    );
}

function App() {
  return (
      <div className="App">
          <Router>
              <Navbar />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/edituser/:id" element={<EditUser />} />
                  <Route path="/addtodo/:id" element={<AddTodo />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;


/*function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
          <Route exact path="/addtodo/:id" element={<AddTodo />} />
          <Route exact path="/login" component={<Login/>} />
        </Routes>
        <PrivateRoute exact path="/dashboard" component={<Dashboard/>} />
      </Router>
    </div>
  );
}*/