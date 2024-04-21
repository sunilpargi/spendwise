// transactionSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the transaction reducer
const initialState = {
    transactions: [], // Array of transactions
};

// Create a slice using Redux Toolkit
const transactionSlice = createSlice({
    name: 'transactions', // Name of the slice
    initialState,
    reducers: {
        // Reducer for adding a transaction
        addTransaction: (state, action) => {
            state.transactions.push(action.payload);
        },
        // Reducer for editing a transaction
        editTransaction: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.transactions.findIndex((transaction) => transaction.id === id);
            if (index !== -1) {
                state.transactions[index] = { ...state.transactions[index], ...updatedData };
            }
        },
        // Reducer for deleting a transaction
        deleteTransaction: (state, action) => {
            const transactionId = action.payload;
            state.transactions = state.transactions.filter((transaction) => transaction.id !== transactionId);
        },
    },
});

// Export the actions for use in other parts of the application
export const { addTransaction, editTransaction, deleteTransaction } = transactionSlice.actions;

// Export the reducer for use in the store configuration
export default transactionSlice.reducer;
