import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    envelopes: [], // Initial state for envelopes
    newEnvelopeCreated: false, // Flag to indicate if a new envelope was created
};

const envelopeSlice = createSlice({
    name: 'envelopes',
    initialState,
    reducers: {
        addEnvelope: (state, action) => {
            state.envelopes.push(action.payload);
            state.newEnvelopeCreated = true; // Set flag when new envelope is added
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
        resetNewEnvelopeCreatedFlag: (state) => {
            state.newEnvelopeCreated = false; // Reset the flag
        },
    },
});

// Export the actions
export const { addEnvelope, editEnvelope, deleteEnvelope, updateEnvelopes, resetNewEnvelopeCreatedFlag } = envelopeSlice.actions;

export default envelopeSlice.reducer;
