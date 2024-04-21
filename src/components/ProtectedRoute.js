import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    // Return the children if the user is authenticated, else redirect to the login page
    if (currentUser) {
        return children;
    }

    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
};

export default ProtectedRoute;
