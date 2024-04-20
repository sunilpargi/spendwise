import React from 'react';
import TransactionForm from '../components/TransactionForm';

const AddTransactionPage = () => {
    const handleSubmit = (transactionData) => {
        // Handle the transaction data here
        // For example, add the transaction data to a state management system
        console.log('Transaction submitted:', transactionData);
        
        // Perform other actions as needed (e.g., updating state, API call, etc.)
    };
    
    return (
        <div className="add-transaction-page p-4">
            <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>
            {/* Use the TransactionForm component */}
            <TransactionForm onSubmit={handleSubmit} />
        </div>
    );
    
};

export default AddTransactionPage;
