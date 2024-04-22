import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaPlus, FaEnvelope } from 'react-icons/fa';
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

    // Extract the username from the email address
    const username = currentUser ? currentUser.email.split('@')[0] : '';

    // Handle the SpendWise title click
    const handleTitleClick = () => {
        navigate('/'); // Redirect to root route
    };

    return (
        <header className="bg-white text-black p-4">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                {/* Logo and Navigation Buttons */}
                <div className="flex items-center justify-center w-full sm:w-auto space-x-8 mb-2 sm:mb-0">
                    <div
                        className="text-xl sm:text-2xl font-bold text-green-600 cursor-pointer"  // Updated color of SpendWise title
                        onClick={handleTitleClick}
                    >
                        SpendWise
                    </div>
                    <Link
                        to="/add-transaction"
                        className="text-lg font-bold flex items-center space-x-2" // Bold and increase font size of the button
                        style={{ color: 'rgb(151,159,241)' }} // Custom color for button
                    >
                        <FaPlus />
                        <span>Add Transaction</span>
                    </Link>
                    <Link
                        to="/fill-envelope"
                        className="text-lg font-bold flex items-center space-x-2" // Bold and increase font size of the button
                        style={{ color: 'rgb(151,159,241)' }}
                    >
                        <FaEnvelope />
                        <span>Fill Envelope</span>
                    </Link>
                    <Link
                        to="/"
                        className="text-lg sm:text-base font-bold text-black"
                    >
                        Home
                    </Link>
                    <Link
                        to="/reports"
                        className="text-lg sm:text-base font-bold text-black"
                    >
                        Reports
                    </Link>
                </div>

                {/* User Profile and Logout */}
                {currentUser && (
                    <div className="flex items-center space-x-7"> {/* Adjusted space-x-7 for more space */}
                        <FaUserCircle className="text-2xl sm:text-3xl" />
                        <span className="hidden sm:inline ml-1">Hi, {username}</span>
                        <button onClick={handleLogout} className="flex items-center space-x-1 text-sm sm:text-base">
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
