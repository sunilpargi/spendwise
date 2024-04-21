// src/redux/reducers/accountReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accounts: [],
};

const accountSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        addAccount: (state, action) => {
            state.accounts.push(action.payload);
        },
        editAccount: (state, action) => {
            const { id, name, balance } = action.payload;
            const index = state.accounts.findIndex((account) => account.id === id);
            if (index !== -1) {
                state.accounts[index].name = name;
                state.accounts[index].balance = balance;
            }
        },
        deleteAccount: (state, action) => {
            state.accounts = state.accounts.filter((account) => account.id !== action.payload);
        },
    },
});

export const { addAccount, editAccount, deleteAccount } = accountSlice.actions;
export default accountSlice.reducer;
