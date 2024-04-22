import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signup(email, password);
            navigate('/'); // Navigate to home page after successful signup
        } catch (error) {
            // Set the error message to display on the page
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center" style={{ backgroundColor: 'rgb(239,250,255)' }}>
            <div className="login-page p-4 bg-white rounded-lg shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 className="text-2xl font-bold mb-4 text-center">SignUp</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email:</label>
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
                        <label htmlFor="password" className="block mb-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Sign Up
                    </button>
                </form>
                <p className="mt-4">
                    Already have an account? <a href="/login" className="text-blue-600">Login</a>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
