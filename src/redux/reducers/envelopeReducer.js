import { createSlice } from '@reduxjs/toolkit';

// Initial state for envelopes
const initialState = {
    envelopes: [
        // Initialize with some default test envelopes
        { id: 1, name: 'Groceries', budget: 500 },
        { id: 2, name: 'Rent', budget: 1000 },
        { id: 3, name: 'Entertainment', budget: 300 },
        // Add more default envelopes as needed
    ],
};

// Create a slice using Redux Toolkit for managing envelopes
const envelopeSlice = createSlice({
    name: 'envelopes',
    initialState,
    reducers: {
        // Action for adding a new envelope
        addEnvelope: (state, action) => {
            state.envelopes.push(action.payload);
        },
        // Action for editing an existing envelope
        editEnvelope: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.envelopes.findIndex((envelope) => envelope.id === id);
            if (index !== -1) {
                // Update the envelope with the new data
                state.envelopes[index] = { ...state.envelopes[index], ...updatedData };
            }
        },
        // Action for deleting an envelope
        deleteEnvelope: (state, action) => {
            const envelopeId = action.payload;
            // Filter out the envelope with the specified ID
            state.envelopes = state.envelopes.filter((envelope) => envelope.id !== envelopeId);
        },
    },
});

// Export actions for use in other parts of the application
export const { addEnvelope, editEnvelope, deleteEnvelope } = envelopeSlice.actions;

// Export the reducer for use in the store configuration
export default envelopeSlice.reducer;
