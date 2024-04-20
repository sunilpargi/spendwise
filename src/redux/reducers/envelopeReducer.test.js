import envelopeReducer, { addEnvelope, editEnvelope, deleteEnvelope } from './envelopeReducer';
import '@testing-library/jest-dom';
describe('envelopeReducer', () => {
    const initialState = {
        envelopes: [],
    };

    it('should handle addEnvelope action', () => {
        const newEnvelope = { id: 1, name: 'Rent', budget: 1000 };
        const action = addEnvelope(newEnvelope);

        const newState = envelopeReducer(initialState, action);
        
        expect(newState.envelopes).toHaveLength(1);
        expect(newState.envelopes[0]).toEqual(newEnvelope);
    });

    it('should handle editEnvelope action', () => {
        const initialState = {
            envelopes: [{ id: 1, name: 'Rent', budget: 1000 }],
        };
        const updatedEnvelope = { id: 1, name: 'Rent', budget: 1200 };
        const action = editEnvelope({ id: 1, updatedData: updatedEnvelope });

        const newState = envelopeReducer(initialState, action);
        
        expect(newState.envelopes).toHaveLength(1);
        expect(newState.envelopes[0]).toEqual(updatedEnvelope);
    });

    it('should handle deleteEnvelope action', () => {
        const initialState = {
            envelopes: [{ id: 1, name: 'Rent', budget: 1000 }],
        };
        const action = deleteEnvelope(1);

        const newState = envelopeReducer(initialState, action);
        
        expect(newState.envelopes).toHaveLength(0);
    });
});
