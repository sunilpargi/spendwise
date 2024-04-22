import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTransaction, filterTransactionsByEnvelope } from '../redux/reducers/transactionReducer';
import { editEnvelope } from '../redux/reducers/envelopeReducer';
import { FaTrashAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { formatNumber } from '../utils/formatNumber';
import { resetNewEnvelopeCreatedFlag } from '../redux/reducers/envelopeReducer';
import { createSelector } from 'reselect';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Retrieve state from Redux store
    const transactions = useSelector((state) => state.transactions.transactions || []);
    const envelopes = useSelector((state) => state.envelopes.envelopes || []);
    const newEnvelopeCreated = useSelector((state) => state.envelopes.newEnvelopeCreated);

    // Local state for active list and selected envelope
    const [activeList, setActiveList] = useState('envelopes');
    const [selectedEnvelope, setSelectedEnvelope] = useState(null);

    // Calculate total income, expense, and available balance
    const totalIncome = useMemo(() => {
        return transactions.reduce((acc, transaction) => {
            if (transaction.type === 'income') {
                return acc + parseFloat(transaction.amount);
            }
            return acc;
        }, 0);
    }, [transactions]);

    const totalExpense = useMemo(() => {
        return transactions.reduce((acc, transaction) => {
            if (transaction.type === 'expense') {
                return acc + parseFloat(transaction.amount);
            }
            return acc;
        }, 0);
    }, [transactions]);

    const totalAvailableBalance = totalIncome - totalExpense;

    // Selector to filter transactions based on selected envelope
    const filteredTransactionsSelector = createSelector(
        [(state) => state.transactions.transactions, (state, selectedEnvelope) => selectedEnvelope],
        (transactions, selectedEnvelope) => {
            if (selectedEnvelope) {
                return transactions.filter(transaction => transaction.envelope === selectedEnvelope.name);
            } else {
                return transactions;
            }
        }
    );

    const filteredTransactions = useSelector(state => filteredTransactionsSelector(state, selectedEnvelope));

    // Calculate pie chart data for expense categories
    const expenseCategories = transactions.filter(transaction => transaction.type === 'expense')
        .reduce((acc, transaction) => {
            const envelope = transaction.envelope || 'Uncategorized';
            if (acc[envelope]) {
                acc[envelope] += parseFloat(transaction.amount);
            } else {
                acc[envelope] = parseFloat(transaction.amount);
            }
            return acc;
        }, {});

    const pieChartData = Object.entries(expenseCategories).map(([envelope, amount]) => ({
        name: envelope,
        value: amount,
    }));

    // Define colors for the pie chart
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#d0ed57', '#a4de6c'];

    // Debug logs to check the data
    console.log("Expense Categories:", expenseCategories);
    console.log("Pie Chart Data:", pieChartData);

    // Use effect to filter transactions based on selected envelope
    useEffect(() => {
        if (selectedEnvelope) {
            dispatch(filterTransactionsByEnvelope(selectedEnvelope.name));
        }
    }, [selectedEnvelope, transactions, dispatch]);

    // Handling transaction deletion
    const handleDeleteTransaction = (transactionId) => {
        const transaction = transactions.find((t) => t.id === transactionId);
        if (transaction) {
            const envelope = envelopes.find((e) => e.name === transaction.envelope);

            // Update envelope's available balance if the transaction is an expense
            if (envelope && transaction.type === 'expense') {
                envelope.available += parseFloat(transaction.amount);
                dispatch(editEnvelope({ id: envelope.id, updatedData: { available: envelope.available } }));
            }

            // Delete the transaction
            dispatch(deleteTransaction(transactionId));
        }
    };

    // Handle selecting an envelope and filtering transactions
    const handleSelectEnvelope = (envelope) => {
        setSelectedEnvelope(envelope);
        dispatch(filterTransactionsByEnvelope(envelope.name));
    };

    // Handle navigation to Add/Edit Envelope page
    const handleAddEditEnvelope = () => {
        navigate('/envelope-management');
    };

    // Handle toast for new envelope created
    useEffect(() => {
        if (newEnvelopeCreated) {
            toast.success('New envelope created!');
            dispatch(resetNewEnvelopeCreatedFlag());
        }
    }, [newEnvelopeCreated, dispatch]);

    return (
        <div className="min-h-screen flex justify-center" style={{ backgroundColor: 'rgb(239,250,255)' }}>
            <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                {/* Welcome message and totals */}
                <div className="mb-8 text-center">
    <h1 className="text-2xl font-bold text-green-600 mb-2">Welcome to SpendWise!</h1>
    <p className="text-md text-gray-700 mb-4">Manage your finances effectively with SpendWise.</p>
    <div className="space-y-1 text-md text-gray-800">
        <p><strong>Total Income:</strong> ${formatNumber(totalIncome)}</p>
        <p><strong>Total Expense:</strong> ${formatNumber(totalExpense)}</p>
        <p><strong>Total Available Balance:</strong> ${formatNumber(totalAvailableBalance)}</p>
    </div>
</div>


                {/* Envelopes and accounts section */}
                <div className="flex">
                    {/* Envelopes list */}
                    <div className="w-1/3 bg-white p-4 rounded shadow-lg" style={{ width: '35%', marginTop:'-90px', marginRight: '20px', maxHeight: '400px', overflowY: 'auto' }}>
                        <div className="flex justify-between mb-4">
                        <button
        className={`btn px-4 py-2 rounded text-center font-bold text-lg w-full`}
        onClick={() => setActiveList('envelopes')}
        disabled={true}
        style={{ backgroundColor: activeList === 'envelopes' ? 'rgb(151,159,241)' : 'transparent', color: activeList === 'envelopes' ? 'white' : 'black' }}
    >
        Envelopes
    </button>
                            {/* <button
                                className={`btn ${activeList === 'accounts' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'} px-4 py-2 rounded`}
                                onClick={() => setActiveList('accounts')}
                            >
                                Accounts
                            </button> */}
                        </div>

                        {activeList === 'envelopes' && (
                            <div>
                                {envelopes.map((envelope) => (
                                    <div
                                        key={envelope.id}
                                        className={`mb-4 ${selectedEnvelope?.id === envelope.id ? 'bg-gray-200' : ''}`}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleSelectEnvelope(envelope)}
                                    >
                                        <div className="flex justify-between">
                                            <div className="font-semibold">{envelope.name}</div>
                                            <div>{`${formatNumber(envelope.available)} / ${formatNumber(envelope.budget)}`}</div>
                                        </div>
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
                                <div className="mt-4 text-center">
                                    <button
                                        className="btn bg-blue-600 text-white px-4 py-2 rounded"
                                        onClick={handleAddEditEnvelope}
                                    >
                                        Add/Edit Envelope
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Transaction history section */}
                    <div className="mt-4 p-4 rounded-lg bg-white ml-4" style={{ width: '60%', maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden' }}>
                        <h2 className="text-md font-bold mb-2">Transaction History</h2>

                        {filteredTransactions.length > 0 ? (
                            <table className="w-full table-fixed">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2 border w-16">Date</th>
                                        <th className="p-2 border w-12">Amount</th>
                                        <th className="p-2 border w-14">Type</th>
                                        <th className="p-2 border w-16">Envelope</th>
                                        <th className="p-2 border w-40 text-center">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTransactions.map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td className="p-2 border">{transaction.date}</td>
                                            <td className="p-2 border" style={{ color: transaction.type === 'income' ? 'green' : 'red' }}>
                                                {transaction.type === 'income' ? `+${transaction.amount}` : `-${transaction.amount}`}
                                            </td>
                                            <td className="p-2 border">{transaction.type}</td>
                                            <td className="p-2 border text-center">{transaction.envelope}</td>
                                            <td className="p-2 border text-center">{transaction.description}</td>
                                        
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No transactions available.</p>
                        )}
                    </div>
                </div>

                {/* Expense categories breakdown section */}
                <div className="mt-8 p-4 rounded-lg bg-white">
                    <h2 className="text-md font-bold mb-2">Expense Categories Breakdown</h2>

                    {/* Pie Chart: Expense Categories */}
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieChartData} dataKey="value" nameKey="name">
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default HomePage;
