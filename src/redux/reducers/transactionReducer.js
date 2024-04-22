import { createSlice } from '@reduxjs/toolkit';

// Initial state for the transaction reducer
const initialState = {
    transactions: [],
    filteredTransactions: [],
    selectedEnvelope: null, // Add selectedEnvelope to track the selected envelope
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            const transaction = action.payload;
            state.transactions.push(transaction);

            // Update filtered transactions based on the selected envelope
            if (state.selectedEnvelope) {
                state.filteredTransactions = state.transactions.filter(
                    (transaction) => transaction.envelope === state.selectedEnvelope
                );
            } else {
                state.filteredTransactions = state.transactions;
            }
        },
        editTransaction: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.transactions.findIndex((transaction) => transaction.id === id);
            if (index !== -1) {
                state.transactions[index] = { ...state.transactions[index], ...updatedData };
            }

            // Update filtered transactions based on the selected envelope
            if (state.selectedEnvelope) {
                state.filteredTransactions = state.transactions.filter(
                    (transaction) => transaction.envelope === state.selectedEnvelope
                );
            } else {
                state.filteredTransactions = state.transactions;
            }
        },
        deleteTransaction: (state, action) => {
            const transactionId = action.payload;
            state.transactions = state.transactions.filter((transaction) => transaction.id !== transactionId);

            // Update filtered transactions based on the selected envelope
            if (state.selectedEnvelope) {
                state.filteredTransactions = state.transactions.filter(
                    (transaction) => transaction.envelope === state.selectedEnvelope
                );
            } else {
                state.filteredTransactions = state.transactions;
            }
        },
        filterTransactionsByEnvelope: (state, action) => {
            state.selectedEnvelope = action.payload; // Update selectedEnvelope state
            state.filteredTransactions = state.transactions.filter(
                (transaction) => transaction.envelope === action.payload
            );
        },
    },
});

// Export the actions
export const {
    addTransaction,
    editTransaction,
    deleteTransaction,
    filterTransactionsByEnvelope,
} = transactionSlice.actions;

export default transactionSlice.reducer;
