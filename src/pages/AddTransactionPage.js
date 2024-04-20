import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../redux/reducers/transactionReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TransactionForm from '../components/TransactionForm';

const AddTransactionPage = () => {
    const dispatch = useDispatch();
    // Fetch envelopes and accounts from Redux store
    const envelopes = useSelector((state) => state.envelopes.envelopes || []);
    const accounts = useSelector((state) => state.accounts || []);

    // State variables to manage form data
    const [transactionType, setTransactionType] = useState('expense');
    const [formData, setFormData] = useState({
        date: '',
        amount: '',
        envelope: '',
        account: '',
        description: ''
    });

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Dispatch the addTransaction action to save the transaction
        dispatch(addTransaction({ ...formData, type: transactionType }));

        // Log the saved transaction data for debugging purposes
        console.log('Transaction data saved:', { ...formData, type: transactionType });

        // Show a success notification using react-toastify
        toast.success('Transaction saved successfully!');

        // Reset the form data after saving the transaction
        setFormData({
            date: '',
            amount: '',
            envelope: '',
            account: '',
            description: ''
        });
    };

    // Function to handle form data changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Function to handle transaction type change (expense or income)
    const handleTransactionTypeChange = (type) => {
        setTransactionType(type);
        // Reset the form data when switching transaction types
        setFormData({
            date: '',
            amount: '',
            envelope: '',
            account: '',
            description: ''
        });
    };

    return (
        <div className="add-transaction-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="form-wrapper bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Add Transaction</h1>

                {/* Buttons to toggle between Expense and Income */}
                <div className="mb-4 text-center">
                    <button
                        className={`btn ${transactionType === 'expense' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'} px-4 py-2 rounded`}
                        onClick={() => handleTransactionTypeChange('expense')}
                    >
                        Expense
                    </button>
                    <button
                        className={`btn ${transactionType === 'income' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'} px-4 py-2 rounded ml-2`}
                        onClick={() => handleTransactionTypeChange('income')}
                    >
                        Income
                    </button>
                </div>

                {/* Form based on the selected transaction type */}
                <form onSubmit={handleSubmit}>
                    {/* Date input field */}
                    <div className="mb-4">
                        <label>Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>

                    {/* Amount input field */}
                    <div className="mb-4">
                        <label>Amount:</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>

                    {/* Conditionally render the envelope dropdown for Expense transactions */}
                    {transactionType === 'expense' && (
                        <div className="mb-4">
                            <label>Envelope:</label>
                            <select
                                name="envelope"
                                value={formData.envelope}
                                onChange={handleChange}
                                className="border p-2 w-full rounded"
                                required
                            >
                                <option value="">Select an envelope</option>
                                {envelopes.map((envelope) => (
                                    <option key={envelope.id} value={envelope.name}>
                                        {envelope.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Account input field */}
                    <div className="mb-4">
                        <label>Account:</label>
                        <input
                            type="text"
                            name="account"
                            value={formData.account}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>

                    {/* Description input field */}
                    <div className="mb-4">
                        <label>Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Save button */}
                    <div className="flex justify-center">
                        <button className="btn bg-blue-600 text-white px-4 py-2 rounded" type="submit">
                            Save
                        </button>
                    </div>
                </form>

                {/* Add the ToastContainer for notifications */}
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default AddTransactionPage;
