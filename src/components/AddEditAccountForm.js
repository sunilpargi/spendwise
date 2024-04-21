// src/components/AddEditAccountForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addAccount, editAccount } from '../redux/reducers/accountReducer';

const AddEditAccountForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const accounts = useSelector((state) => state.accounts.accounts || []);
    const existingAccount = accounts.find((account) => account.id === id);

    const [name, setName] = useState(existingAccount ? existingAccount.name : '');
    const [balance, setBalance] = useState(existingAccount ? existingAccount.balance : '');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {
            // Edit existing account
            dispatch(editAccount({ id, name, balance }));
        } else {
            // Add new account
            dispatch(addAccount({ name, balance }));
        }
        navigate('/account-management');
    };

    return (
        <div className="add-edit-account-form p-4">
            <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Account' : 'Add Account'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Balance:</label>
                    <input
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(parseFloat(e.target.value))}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {id ? 'Save' : 'Add'}
                </button>
            </form>
        </div>
    );
};

export default AddEditAccountForm;
