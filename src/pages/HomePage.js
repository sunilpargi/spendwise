import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction } from '../redux/reducers/transactionReducer';
import { FaTrashAlt } from 'react-icons/fa'; // Import an icon for the delete action

const HomePage = () => {
    // Retrieve transactions from the Redux store
    const transactions = useSelector((state) => state.transactions.transactions || []);

    // Initialize useDispatch hook
    const dispatch = useDispatch();

    // Calculate total income, total expense, and total available balance
    let totalIncome = 0;
    let totalExpense = 0;

    // Calculate totals using transactions data
    transactions.forEach((transaction) => {
        if (transaction.type === 'income') {
            totalIncome += Number(transaction.amount);
        } else if (transaction.type === 'expense') {
            totalExpense += Number(transaction.amount);
        }
    });

    // Calculate total available balance
    const totalAvailableBalance = totalIncome - totalExpense;

    // Define function to handle delete transaction
    const handleDeleteTransaction = (transactionId) => {
        // Dispatch the deleteTransaction action
        dispatch(deleteTransaction(transactionId));
    };

    return (
        // Apply the desired background color to the entire middle part of the page
        <div className="min-h-screen flex justify-center" style={{ backgroundColor: 'rgb(239,250,255)' }}>
            {/* Container for the content */}
            <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                {/* Welcome message and totals */}
                <div className="mb-8 text-center">
                    <h1 className="text-xl font-bold" style={{ color: '#3ea364' }}>
                        Welcome to SpendWise!
                    </h1>
                    <p className="text-sm">
                        Here you can manage your finances effectively.
                    </p>

                    {/* Display totals below the welcome text */}
                    <div className="mt-4">
                        <p><strong>Total Income:</strong> ${totalIncome.toFixed(2)}</p>
                        <p><strong>Total Expense:</strong> ${totalExpense.toFixed(2)}</p>
                        <p><strong>Total Available Balance:</strong> ${totalAvailableBalance.toFixed(2)}</p>
                    </div>
                </div>

                {/* Display transaction history in a separate box */}
                <div
                    className="mt-4 p-4 rounded-lg bg-white"
                    style={{
                        width: '60%',
                        marginLeft: 'auto',
                        marginRight: '10px',
                        maxHeight: '300px', // Adjust max height to limit the number of visible data entries
                        overflowY: 'auto', // Enable vertical scrolling
                        overflowX: 'hidden',
                    }}
                >
                    <h2 className="text-md font-bold mb-2">Transaction History</h2>
                    
                    {/* Check if there are transactions */}
                    {transactions.length > 0 ? (
                        <table className="w-full table-fixed">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2 border w-16">Date</th>
                                    <th className="p-2 border w-12">Amount</th>
                                    <th className="p-2 border w-14">Type</th>
                                    <th className="p-2 border w-16">Envelope</th>
                                    <th className="p-2 border w-40 text-center">Description</th> {/* Center-align description */}
                                    <th className="p-2 border w-10 text-center">Action</th> {/* Increased width for action */}
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td className="p-2 border">{transaction.date}</td>
                                        <td
                                            className="p-2 border"
                                            style={{ color: transaction.type === 'income' ? 'green' : 'red' }}
                                        >
                                            {transaction.type === 'income' ? `+${transaction.amount}` : `-${transaction.amount}`}
                                        </td>
                                        <td className="p-2 border">
                                            {/* Add icons for transaction types */}
                                            {transaction.type === 'income' ? (
                                                <>
                                                    <span role="img" aria-label="income">💰</span>
                                                    {' '}
                                                    Income
                                                </>
                                            ) : (
                                                <>
                                                    <span role="img" aria-label="expense">🛒</span> {/* Shopping cart icon */}
                                                    {' '}
                                                    Expense
                                                </>
                                            )}
                                        </td>
                                        <td className="p-2 border text-center">{transaction.envelope}</td> {/* Center-align and adjust width */}
                                        <td className="p-2 border text-center">{transaction.description}</td> {/* Center-align description */}
                                        <td className="p-2 border text-center">
                                            {/* Add a delete icon button */}
                                            <button
                                                onClick={() => handleDeleteTransaction(transaction.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <FaTrashAlt /> {/* Trash icon for delete action */}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        // Show a message if there are no transactions
                        <p>No transactions available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
