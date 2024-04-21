import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserProfilePage = () => {
    const { currentUser } = useAuth();

    return (
        <div className="user-profile-page p-4">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <p><strong>Email:</strong> {currentUser?.email}</p>
            {/* Add more user information fields as needed */}
        </div>
    );
};

export default UserProfilePage;
