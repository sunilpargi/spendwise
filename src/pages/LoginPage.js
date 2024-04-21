import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.error('Failed to login:', error);
            setError('Failed to login. Please check your email and password.');
        }
    };

    return (
        <div className="login-page p-4">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-red-600">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border p-2 rounded w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Login
                </button>
            </form>
            <p className="mt-4">
                Don't have an account? <a href="/signup" className="text-blue-600">Sign Up</a>
            </p>
        </div>
    );
};

export default LoginPage;
