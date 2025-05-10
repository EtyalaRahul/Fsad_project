import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const authStatus = localStorage.getItem('isLoggedIn');
        const userData = localStorage.getItem('user');
        if (authStatus === 'true' && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <Router>
            <Navbar user={user} setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
            <Routes>
                <Route 
                    path="/login" 
                    element={
                        isAuthenticated ? 
                        <Navigate to="/home" /> : 
                        <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                    } 
                />
                <Route 
                    path="/signup" 
                    element={<Signup setUser={setUser} setIsAuthenticated={setIsAuthenticated} />} 
                />
                <Route 
                    path="/home" 
                    element={
                        isAuthenticated ? <Home /> : <Navigate to="/login" />
                    } 
                />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;

// Add this at the top of Signup.jsx
import PropTypes from 'prop-types';
import Navbar from './Components/NavBar';

// Add this at the bottom of Signup.jsx before export
Signup.propTypes = {
    setUser: PropTypes.func.isRequired,
    setIsAuthenticated: PropTypes.func.isRequired
};