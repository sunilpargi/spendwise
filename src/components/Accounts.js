import React from 'react';

const Accounts = ({ accounts, onAddAccount, onEditAccount }) => {
    return (
        <div className="accounts">
            <h2>Accounts</h2>
            <ul>
                {accounts.map((account) => (
                    <li key={account.id}>
                        <div>{account.name}</div>
                        <div>Balance: {account.balance}</div>
                        <button onClick={() => onEditAccount(account)}>Edit</button>
                    </li>
                ))}
            </ul>
            <button onClick={onAddAccount}>Add Account</button>
        </div>
    );
};

export default Accounts;
