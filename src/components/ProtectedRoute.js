import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (currentUser) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
