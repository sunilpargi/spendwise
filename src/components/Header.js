import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    const handleLogout = async () => {
        await logout();
        navigate('/login'); // Redirect to login page after logging out
    };

    // Define the routes where the header should not be shown
    const routesWithoutHeader = ['/login', '/signup'];

    // Determine if the current route is in the list of routes without a header
    const isHiddenRoute = routesWithoutHeader.includes(location.pathname);

    // Only render the header if the current route is not in the list of routes without a header
    if (isHiddenRoute) {
        return null;
    }

    return (
        <header className="bg-white text-black p-4">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                {/* Logo and Navigation Buttons */}
                <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                    <div className="text-xl sm:text-2xl font-bold">SpendWise</div>
                    <Link
                        to="/add-transaction"
                        className="btn bg-blue-600 text-white px-3 py-1 rounded text-sm sm:text-base"
                    >
                        Add Transaction
                    </Link>
                    <Link
                        to="/fill-envelope"
                        className="btn bg-blue-600 text-white px-3 py-1 rounded text-sm sm:text-base"
                    >
                        Fill Envelope
                    </Link>
                    <Link
                        to="/"
                        className="btn bg-blue-600 text-white px-3 py-1 rounded text-sm sm:text-base"
                    >
                        Home
                    </Link>
                    <Link
                        to="/reports"
                        className="btn bg-blue-600 text-white px-3 py-1 rounded text-sm sm:text-base"
                    >
                        Reports
                    </Link>
                </div>

                {/* User Profile and Logout */}
                {currentUser && (
                    <div className="flex items-center space-x-2">
                        <Link to="/profile">
                            <FaUserCircle className="text-2xl sm:text-3xl" />
                        </Link>
                        <span className="hidden sm:inline ml-1">Hi, {currentUser ? currentUser.email : ''}</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-1 text-sm sm:text-base"
                        >
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
