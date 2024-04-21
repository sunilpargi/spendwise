import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const UserProfilePage = () => {
    const { currentUser, logout } = useAuth();
    const { isDarkMode, toggleDarkMode } = useTheme();

    const handleLogout = async () => {
        await logout();
        // Redirect to login page after logging out
        window.location.href = '/login';
    };

    return (
        <div className={isDarkMode ? 'dark-profile-page' : 'profile-page'}>
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <div className="mb-4">
                <strong>Email:</strong> {currentUser?.email}
            </div>
            <div className="mb-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                        className="mr-2"
                    />
                    <span>Dark Mode</span>
                </label>
            </div>
            <button
                className="btn bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default UserProfilePage;
