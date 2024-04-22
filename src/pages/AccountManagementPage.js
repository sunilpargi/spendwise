import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editAccount, deleteAccount } from '../redux/reducers/accountReducer';
import { ToastContainer } from 'react-toastify';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AccountManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const accounts = useSelector((state) => state.accounts?.accounts || []);
    
    const [accountsData, setAccountsData] = useState(accounts);

    useEffect(() => {
        if (accounts) {
            setAccountsData(accounts);
        }
    }, [accounts]);

    const handleInputChange = (index, field, value) => {
        const updatedAccounts = [...accountsData];
        updatedAccounts[index] = {
            ...updatedAccounts[index],
            [field]: value,
        };
        setAccountsData(updatedAccounts);
    };

    const handleDeleteAccount = (index) => {
        const accountToDelete = accountsData[index];
        dispatch(deleteAccount(accountToDelete.id));
        const updatedAccounts = accountsData.filter((_, i) => i !== index);
        setAccountsData(updatedAccounts);
    };

    const handleSaveChanges = () => {
        accountsData.forEach((account) => {
            dispatch(editAccount({ id: account.id, updatedData: account }));
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: 'rgb(239,250,255)' }}>
            <div className="p-4 bg-white rounded-lg shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Edit Accounts</h2>
                <table className="w-full mb-4">
                    <thead>
                        <tr>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Balance</th>
                            <th className="border p-2">Action</th>
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
                                        onChange={(e) => handleInputChange(index, 'balance', parseFloat(e.target.value))}
                                        className="border p-2 w-full"
                                    />
                                </td>
                                <td className="border p-2">
                                    <button
                                        className="btn bg-red-600 text-white px-2 py-2 rounded"
                                        onClick={() => handleDeleteAccount(index)}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-center space-x-4">
                    <button
                        className="btn bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleSaveChanges}
                    >
                        Save
                    </button>
                    <button
                        className="btn bg-gray-300 text-black px-4 py-2 rounded"
                        onClick={() => {
                            setAccountsData(accounts);
                            navigate('/');
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <ToastContainer position="top-right" />
        </div>
    );
};

export default AccountManagementPage;
