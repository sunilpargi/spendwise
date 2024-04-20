import { createSlice } from '@reduxjs/toolkit';

// Initial state for the transaction reducer
const initialState = {
    transactions: [], // Initialize as an empty array
};

// Create a slice using Redux Toolkit for managing transactions
const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        // Action for adding a new transaction
        addTransaction: (state, action) => {
            state.transactions.push(action.payload);
        },
        // Action for editing an existing transaction
        editTransaction: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.transactions.findIndex((transaction) => transaction.id === id);
            if (index !== -1) {
                // Update the transaction with the new data
                state.transactions[index] = { ...state.transactions[index], ...updatedData };
            }
        },
        // Action for deleting a transaction
        deleteTransaction: (state, action) => {
            const transactionId = action.payload;
            // Filter out the transaction with the specified ID
            state.transactions = state.transactions.filter((transaction) => transaction.id !== transactionId);
        },
    },
});

// Export actions for use in other parts of the application
export const { addTransaction, editTransaction, deleteTransaction } = transactionSlice.actions;

// Export the reducer for use in the store configuration
export default transactionSlice.reducer;
