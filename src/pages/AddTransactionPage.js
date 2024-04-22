import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../redux/reducers/transactionReducer';
import { editEnvelope } from '../redux/reducers/envelopeReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../context/ThemeContext';

const AddTransactionPage = () => {
    const dispatch = useDispatch();
    const { isDarkMode } = useTheme();

    // Use a fallback value of an empty array to avoid the error
    const envelopes = useSelector((state) => state.envelopes.envelopes || []);
    const accounts = useSelector((state) => state.accounts?.accounts || []); // Provide a fallback value

    // State variables to manage form data
    const [transactionType, setTransactionType] = useState('expense');
    const [formData, setFormData] = useState({
        date: '',
        amount: '',
        envelope: '',
        account: '',
        description: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Dispatch the addTransaction action
        dispatch(addTransaction({ ...formData, type: transactionType }));
    
        // If the transaction is an expense, update the envelope balance
        if (transactionType === 'expense') {
            const selectedEnvelope = envelopes.find((env) => env.name === formData.envelope);
            if (selectedEnvelope) {
                // Calculate the expense amount as a float
                const expenseAmount = parseFloat(formData.amount);
    
                // Create a shallow copy of the selectedEnvelope object
                const updatedEnvelope = { ...selectedEnvelope };
    
                // Update the available balance on the copy
                updatedEnvelope.available -= expenseAmount;
    
                // Dispatch the editEnvelope action with the updated envelope data
                dispatch(editEnvelope({ id: selectedEnvelope.id, updatedData: updatedEnvelope }));
            }
        }
    
        // Display success message
        toast.success('Transaction saved successfully!');
        console.log('Transaction data saved:', { ...formData, type: transactionType });
    
        // Reset form data
        setFormData({
            date: '',
            amount: '',
            envelope: '',
            account: '',
            description: '',
        });
    };
    

    // Handle form data changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle transaction type change
    const handleTransactionTypeChange = (type) => {
        setTransactionType(type);
        setFormData({
            date: '',
            amount: '',
            envelope: '',
            account: '',
            description: '',
        });
    };

    return (
        <div style={{ backgroundColor: 'rgb(239,250,255)' }} className={`add-transaction-page ${isDarkMode ? 'dark' : ''} flex flex-col items-center justify-center min-h-screen`}>
            <div className="form-wrapper bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Add Transaction</h1>

                {/* Toggle between expense and income */}
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

                {/* Form for adding a transaction */}
                <form onSubmit={handleSubmit}>
                    {/* Date input */}
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

                    {/* Amount input */}
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

                    {/* Envelope selection if transaction type is expense */}
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

                    {/* Account input */}
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

                    {/* Description input */}
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

                {/* Toast notifications */}
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default AddTransactionPage;
