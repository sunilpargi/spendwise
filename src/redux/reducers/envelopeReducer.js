import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    envelopes: [], // Initial state for envelopes
};

const envelopeSlice = createSlice({
    name: 'envelopes',
    initialState,
    reducers: {
        addEnvelope: (state, action) => {
            state.envelopes.push(action.payload);
        },
        editEnvelope: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.envelopes.findIndex((e) => e.id === id);
            if (index !== -1) {
                state.envelopes[index] = { ...state.envelopes[index], ...updatedData };
            }
        },
        deleteEnvelope: (state, action) => {
            state.envelopes = state.envelopes.filter((e) => e.id !== action.payload);
        },
    },
});

export const { addEnvelope, editEnvelope, deleteEnvelope } = envelopeSlice.actions;
export default envelopeSlice.reducer;
