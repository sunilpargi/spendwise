import { createSlice } from '@reduxjs/toolkit';

// Initial state for the transaction reducer
const initialState = {
    transactions: [],
    filteredTransactions: [],
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            const transaction = action.payload;
            state.transactions.push(transaction);
            state.filteredTransactions = state.transactions;
        },
        editTransaction: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.transactions.findIndex((transaction) => transaction.id === id);
            if (index !== -1) {
                state.transactions[index] = { ...state.transactions[index], ...updatedData };
            }
            state.filteredTransactions = state.transactions;
        },
        deleteTransaction: (state, action) => {
            const transactionId = action.payload;
            state.transactions = state.transactions.filter((transaction) => transaction.id !== transactionId);
            state.filteredTransactions = state.transactions;
        },
        filterTransactionsByEnvelope: (state, action) => {
            const selectedEnvelope = action.payload;
            state.filteredTransactions = state.transactions.filter(
                (transaction) => transaction.envelope === selectedEnvelope
            );
        },
    },
});

export const {
    addTransaction,
    editTransaction,
    deleteTransaction,
    filterTransactionsByEnvelope,
} = transactionSlice.actions;

export default transactionSlice.reducer;
