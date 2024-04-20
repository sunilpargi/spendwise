import transactionReducer, { addTransaction, editTransaction, deleteTransaction } from './transactionReducer';
import '@testing-library/jest-dom';

describe('transactionReducer', () => {
    const initialState = {
        transactions: [],
    };

    it('should handle addTransaction action', () => {
        const newTransaction = { id: 1, amount: 100, category: 'Groceries' };
        const action = addTransaction(newTransaction);

        const newState = transactionReducer(initialState, action);
        
        expect(newState.transactions).toHaveLength(1);
        expect(newState.transactions[0]).toEqual(newTransaction);
    });

    it('should handle editTransaction action', () => {
        const initialState = {
            transactions: [{ id: 1, amount: 100, category: 'Groceries' }],
        };
        const updatedTransaction = { id: 1, amount: 150, category: 'Groceries' };
        const action = editTransaction({ id: 1, updatedData: updatedTransaction });

        const newState = transactionReducer(initialState, action);
        
        expect(newState.transactions).toHaveLength(1);
        expect(newState.transactions[0]).toEqual(updatedTransaction);
    });

    it('should handle deleteTransaction action', () => {
        const initialState = {
            transactions: [{ id: 1, amount: 100, category: 'Groceries' }],
        };
        const action = deleteTransaction(1);

        const newState = transactionReducer(initialState, action);
        
        expect(newState.transactions).toHaveLength(0);
    });
});
