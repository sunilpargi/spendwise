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
            const index = state.envelopes.findIndex((envelope) => envelope.id === id);
            if (index !== -1) {
                state.envelopes[index] = { ...state.envelopes[index], ...updatedData };
            }
        },
        deleteEnvelope: (state, action) => {
            state.envelopes = state.envelopes.filter((e) => e.id !== action.payload);
        },
        updateEnvelopes: (state, action) => {
            state.envelopes = action.payload; // Update envelopes state with the new array of envelopes
        },
    },
});

// Export the actions
export const { addEnvelope, editEnvelope, deleteEnvelope, updateEnvelopes } = envelopeSlice.actions;

export default envelopeSlice.reducer;
