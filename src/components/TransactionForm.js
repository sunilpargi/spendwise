import React, { useState } from 'react';

const TransactionForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        date: '',
        amount: '',
        type: 'expense',
        envelope: '',
        account: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            date: '',
            amount: '',
            type: 'expense',
            envelope: '',
            account: '',
            description: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="transaction-form">
            <div className="form-group">
                <label>Date:</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Amount:</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Type:</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
            </div>
            {formData.type === 'expense' && (
                <div className="form-group">
                    <label>Envelope:</label>
                    <input
                        type="text"
                        name="envelope"
                        value={formData.envelope}
                        onChange={handleChange}
                        required
                    />
                </div>
            )}
            <div className="form-group">
                <label>Account:</label>
                <input
                    type="text"
                    name="account"
                    value={formData.account}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn bg-blue-600 text-white px-3 py-1 rounded">
                Save
            </button>
        </form>
    );
};

export default TransactionForm;
