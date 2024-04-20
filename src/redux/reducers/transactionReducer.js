import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    transactions: [], // Initial state for transactions
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            state.transactions.push(action.payload);
        },
        editTransaction: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.transactions.findIndex((t) => t.id === id);
            if (index !== -1) {
                state.transactions[index] = { ...state.transactions[index], ...updatedData };
            }
        },
        deleteTransaction: (state, action) => {
            state.transactions = state.transactions.filter((t) => t.id !== action.payload);
        },
    },
});

export const { addTransaction, editTransaction, deleteTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
