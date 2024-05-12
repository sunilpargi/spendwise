// envelopereducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    envelopes: [
        { id: 1, name: 'Groceries', available: 0, budget: 500 },
        { id: 2, name: 'Transportation', available: 0, budget: 500 },
        { id: 3, name: 'Entertainment', available: 0, budget: 500 },
        { id: 4, name: 'Health & Wellness', available: 0, budget: 500 },
        { id: 5, name: 'Savings', available: 0, budget: 500 },
        // Add other default envelopes here
    ],
    newEnvelopeCreated: false,
    totalBalance: 0,
};


const envelopeSlice = createSlice({
    name: 'envelopes',
    initialState,
    reducers: {
        addEnvelope: (state, action) => {
            const newEnvelope = action.payload;
            console.log('Adding new envelope:', newEnvelope);
            state.envelopes.push(newEnvelope);
            console.log('Envelopes after adding:', state.envelopes);
        },
        
        editEnvelope: (state, action) => {
            const { id, updatedData } = action.payload;
            console.log('Editing envelope ID:', id, typeof id);
            console.log('Updated envelope data:', updatedData);
        
            const updatedEnvelopes = state.envelopes.map(envelope => {
                console.log('Current envelope ID:', envelope.id, typeof envelope.id);
               if (envelope.id === id) {
                    console.log('Updating envelope:', envelope);
                    return { ...envelope, ...updatedData };
                }
                return envelope;
            });
        
            console.log('Envelopes after edit:', updatedEnvelopes);
            return {
                ...state,
                envelopes: updatedEnvelopes
            };
        },
        
        
        
        
        
        
        
        
        
        
        deleteEnvelope: (state, action) => {
            const id = action.payload;
            state.envelopes = state.envelopes.filter((envelope) => envelope.id !== id);
        },
        updateEnvelopes: (state, action) => {
            const updatedEnvelopes = action.payload.map((updatedEnvelope) => {
                const existingEnvelope = state.envelopes.find((envelope) => envelope.id === updatedEnvelope.id);
                if (existingEnvelope) {
                    // Preserve the existing name and budget fields
                    const { name, budget } = existingEnvelope;
                    return { ...updatedEnvelope, name, budget };
                } else {
                    return updatedEnvelope;
                }
            });
            state.envelopes = updatedEnvelopes;
        },
        
        
        updateEnvelopeBalance: (state, action) => {
            const { envelopeName, expenseAmount } = action.payload;
            const index = state.envelopes.findIndex((envelope) => envelope.name === envelopeName);
            if (index !== -1) {
                // Deduct the expense amount from the available balance
                state.envelopes[index].available -= parseFloat(expenseAmount);
            }
        },
        resetNewEnvelopeCreatedFlag: (state) => {
            state.newEnvelopeCreated = false; // Reset the flag
        },
        calculateTotalBalance: (state) => {
            state.totalBalance = state.envelopes.reduce((total, envelope) => total + envelope.available, 0);
        },
    },
});

export const { addEnvelope, editEnvelope, deleteEnvelope, updateEnvelopes, updateEnvelopeBalance, resetNewEnvelopeCreatedFlag, calculateTotalBalance } = envelopeSlice.actions;

export default envelopeSlice.reducer;
