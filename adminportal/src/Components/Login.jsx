import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [fullName, setFullName] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogout = () => {
        setLoginSuccess(false);
        setFullName('');
        setFormData({
            email: '',
            password: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (data) {
                setLoginSuccess(true);
                setFullName(data.fullName);
                // Store login state in localStorage (optional)
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('fullName', data.fullName);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-content">
                    {loginSuccess ? (
                        <div className="user-info">
                            <span>Welcome, {fullName}</span>
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </div>
                    ) : null}
                </div>
            </nav>
            
            {!loginSuccess && (
                <div className='login'>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor="email">Email:</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                required 
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password">Password:</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                required 
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className='login-button'>Login</button>
                    </form>
                    <p>Don't have account sign in <a href='http://localhost:5173/signup'>signup</a></p>
                </div>
            )}
        </>
    );
}

export default Login;
