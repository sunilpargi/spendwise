import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    envelopes: [], // Array of envelopes
    totalBalance: 0, // Total balance across all envelopes
};

const envelopeSlice = createSlice({
    name: 'envelopes',
    initialState,
    reducers: {
        addEnvelope: (state, action) => {
            state.envelopes.push(action.payload);
        },
        editEnvelope: (state, action) => {
            const { id, name, available, budget } = action.payload;
            const index = state.envelopes.findIndex((envelope) => envelope.id === id);
            if (index !== -1) {
                state.envelopes[index] = { id, name, available, budget };
            }
        },
        deleteEnvelope: (state, action) => {
            const id = action.payload;
            state.envelopes = state.envelopes.filter((envelope) => envelope.id !== id);
        },
        filterTransactionsByEnvelope: (state, action) => {
            const selectedEnvelope = action.payload.id;
            // Implement the logic to filter transactions based on the selected envelope
            // You may use state management to update the transactions list in the appropriate state slice
        },
        calculateTotalBalance: (state) => {
            state.totalBalance = state.envelopes.reduce((total, envelope) => total + envelope.available, 0);
        },
    },
});

export const {
    addEnvelope,
    editEnvelope,
    deleteEnvelope,
    filterTransactionsByEnvelope,
    calculateTotalBalance,
} = envelopeSlice.actions;

export default envelopeSlice.reducer;
