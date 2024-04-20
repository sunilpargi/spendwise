import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../redux/reducers/transactionReducer';

// Add the import statement for `TransactionForm`
import TransactionForm from '../components/TransactionForm';


const AddTransactionPage = () => {
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactions);

    const handleSubmit = (transactionData) => {
        dispatch(addTransaction(transactionData));
    };

    return (
        <div>
            <h1>Add Transaction</h1>
            <TransactionForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddTransactionPage;
