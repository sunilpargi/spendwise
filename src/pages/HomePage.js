import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTransaction } from '../redux/reducers/transactionReducer';
import { FaTrashAlt } from 'react-icons/fa'; // Import an icon for the delete action
import { formatNumber } from '../utils/formatNumber'; // Import a utility function to format numbers

const HomePage = () => {
    // Retrieve transactions and envelopes from the Redux store
    const transactions = useSelector((state) => state.transactions.transactions || []);
    const envelopes = useSelector((state) => state.envelopes.envelopes || []);

    // Initialize useDispatch hook and useNavigate hook
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    // Log the envelopes state for debugging purposes
    console.log('Envelopes state:', envelopes);

    // Define function to handle delete transaction
    const handleDeleteTransaction = (transactionId) => {
        console.log('Deleting transaction:', transactionId);
        dispatch(deleteTransaction(transactionId));
    };

    // Handle navigation to the Add/Edit Envelope page
    const handleAddEditEnvelope = () => {
        navigate('/envelope-management');
    };

    // Function to handle the switch between envelopes and accounts
    const [activeList, setActiveList] = React.useState('envelopes');
    const handleListSwitch = (listType) => {
        setActiveList(listType);
    };

    // Listen for changes in envelopes data
    useEffect(() => {
        // This effect will re-render the component when envelopes data changes
        console.log('Envelopes data has changed:', envelopes);
    }, [envelopes]);

    return (
        <div className="min-h-screen flex justify-center" style={{ backgroundColor: 'rgb(239,250,255)' }}>
            <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                {/* Welcome message and totals */}
                <div className="mb-4 text-center">
                    <h1 className="text-xl font-bold" style={{ color: '#3ea364' }}>
                        Welcome to SpendWise!
                    </h1>
                    <p className="text-sm">Here you can manage your finances effectively.</p>

                    {/* Display totals below the welcome text */}
                    <div className="mt-4">
                        <p><strong>Total Income:</strong> ${formatNumber(totalIncome)}</p>
                        <p><strong>Total Expense:</strong> ${formatNumber(totalExpense)}</p>
                        <p><strong>Total Available Balance:</strong> ${formatNumber(totalAvailableBalance)}</p>
                    </div>
                </div>

                {/* Left middle section for envelope and account buttons */}
                <div className="flex">
                    {/* Section for Envelopes/Accounts buttons */}
                    <div className="w-1/3 bg-white p-4 rounded shadow-lg" style={{ width: '35%', marginRight: '20px' }}>
                        <div className="flex justify-between mb-4">
                            <button
                                className={`btn ${activeList === 'envelopes' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'} px-4 py-2 rounded`}
                                onClick={() => handleListSwitch('envelopes')}
                            >
                                Envelopes
                            </button>
                            <button
                                className={`btn ${activeList === 'accounts' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'} px-4 py-2 rounded`}
                                onClick={() => handleListSwitch('accounts')}
                            >
                                Accounts
                            </button>
                        </div>

                        {/* Render envelopes list based on activeList state */}
                        {activeList === 'envelopes' ? (
                            <div>
                                {envelopes.map((envelope) => (
                                    <div key={envelope.id} className="mb-4">
                                        {/* Envelope name and available/budget */}
                                        <div className="flex justify-between">
                                            <div className="font-semibold">{envelope.name}</div>
                                            <div>{`${formatNumber(envelope.available)} / ${formatNumber(envelope.budget)}`}</div>
                                        </div>
                                        {/* Green bar */}
                                        <div className="relative h-2 bg-gray-300 mt-2">
                                            <div
                                                className="absolute h-2 bg-green-500"
                                                style={{
                                                    width: `${Math.min((envelope.available / envelope.budget) * 100, 100)}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}

                                {/* Add/Edit Envelope button */}
                                <div className="mt-4 text-center">
                                    <button
                                        onClick={handleAddEditEnvelope}
                                        className="btn bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        Add/Edit Envelope
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Render accounts list if needed
                            <div>
                                {/* Add code here to render accounts list if needed */}
                                <p>Accounts list will go here</p>
                            </div>
                        )}
                    </div>

                    {/* Display transaction history in a separate box */}
                    <div
                        className="mt-4 p-4 rounded-lg bg-white ml-4"
                        style={{
                            width: '60%',
                            maxHeight: '300px',
                            overflowY: 'auto',
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
        </div>
    );
};

export default HomePage;
