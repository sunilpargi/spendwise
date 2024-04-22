import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editAccount } from '../redux/reducers/accountReducer';
import { ToastContainer } from 'react-toastify';

const AccountManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accounts = useSelector((state) => state.accounts?.accounts || []);
    const [accountsData, setAccountsData] = useState(accounts);

    // Update accounts data when accounts state changes
    useEffect(() => {
        setAccountsData(accounts);
    }, [accounts]);

    // Handle changes in input fields for accounts
    const handleInputChange = (index, field, value) => {
        const updatedAccounts = [...accountsData];
        updatedAccounts[index] = {
            ...updatedAccounts[index],
            [field]: value,
        };
        setAccountsData(updatedAccounts);
    };

    // Handle saving changes
    const handleSaveChanges = () => {
        // Iterate through valid accounts and update Redux state
        accountsData.forEach((account) => {
            dispatch(editAccount(account));
        });

        // Navigate back to the home page after saving changes
        navigate('/');
    };

    // Handle canceling changes
    const handleCancelChanges = () => {
        setAccountsData(accounts);
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-4 bg-white rounded-lg shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Edit Accounts</h2>
                <p className="text-sm mb-4">Manage your accounts effectively.</p>

                {/* Table for accounts */}
                <table className="w-full mb-4">
                    <thead>
                        <tr>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accountsData.map((account, index) => (
                            <tr key={account.id}>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={account.name}
                                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                        className="border p-2 w-full"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={account.balance}
                                        onChange={(e) => handleInputChange(index, 'balance', e.target.value)}
                                        className="border p-2 w-full"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Save and Cancel buttons */}
                <div className="flex justify-center space-x-4">
                    <button
                        className="btn bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleSaveChanges}
                    >
                        Save
                    </button>
                    <button
                        className="btn bg-gray-300 text-black px-4 py-2 rounded"
                        onClick={handleCancelChanges}
                    >
                        Cancel
                    </button>
                </div>
            </div>

            {/* Toast notification container */}
            <ToastContainer position="top-right" />
        </div>
    );
};

export default AccountManagementPage;
