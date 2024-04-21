// src/pages/AccountManagementPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAccount, editAccount, deleteAccount } from '../redux/reducers/accountReducer';
import Accounts from '../components/Accounts';
import AddEditAccountForm from '../components/AddEditAccountForm';

const AccountManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accounts = useSelector((state) => state.accounts.accounts || []);

    const handleAddAccount = () => {
        navigate('/add-account');
    };

    const handleEditAccount = (account) => {
        navigate(`/edit-account/${account.id}`);
    };

    const handleDeleteAccount = (accountId) => {
        dispatch(deleteAccount(accountId));
    };

    return (
        <div className="account-management-page p-4">
            <h2 className="text-2xl font-bold mb-4">Account Management</h2>
            <Accounts
                accounts={accounts}
                onAddAccount={handleAddAccount}
                onEditAccount={handleEditAccount}
            />
            <AddEditAccountForm />
        </div>
    );
};

export default AccountManagementPage;
