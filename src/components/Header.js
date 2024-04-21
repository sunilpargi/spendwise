import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelopeOpenText, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Header = ({ username, onLogout }) => {
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
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                        <FaUserCircle className="text-2xl sm:text-3xl" />
                        <span className="hidden sm:inline ml-1">Hi, {username}</span>
                    </div>
                    <button
                        onClick={onLogout}
                        className="flex items-center space-x-1 text-sm sm:text-base"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
