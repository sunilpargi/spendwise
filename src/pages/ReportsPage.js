import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import calculateChartData from '../utils/calculateChartData';
import calculateCategoryBreakdown from '../utils/calculateCategoryBreakdown';

const ReportsPage = () => {
    // Fetch transactions from Redux store
    const transactions = useSelector((state) => state.transactions);

    // State variables for start and end dates
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Filtered transactions based on date range
    const filteredTransactions = transactions?.filter((transaction) => {
        const transactionDate = moment(transaction.date);
        return (
            (!startDate || transactionDate.isSameOrAfter(startDate)) &&
            (!endDate || transactionDate.isSameOrBefore(endDate))
        );
    }) || [];

    // Calculate data for charts and summaries
    const chartData = calculateChartData(filteredTransactions);
    const categoryBreakdown = calculateCategoryBreakdown(filteredTransactions);

    // Calculate summaries
    const totalSpending = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    const averageSpendingPerTransaction = totalSpending / filteredTransactions.length || 0;

    return (
        <div className="reports-page p-4">
            <h2 className="text-2xl font-bold mb-4">Reports</h2>

            {/* Date range filters */}
            <div className="date-range-filters mb-4">
                <label htmlFor="start-date" className="mr-2">Start Date:</label>
                <DatePicker
                    id="start-date"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                />
                <label htmlFor="end-date" className="ml-4 mr-2">End Date:</label>
                <DatePicker
                    id="end-date"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy-MM-dd"
                />
            </div>

            {/* Summaries */}
            <div className="summaries mb-6">
                <p>Total Spending: {totalSpending.toFixed(2)}</p>
                <p>Average Spending per Transaction: {averageSpendingPerTransaction.toFixed(2)}</p>
            </div>

            {/* Bar chart for spending trends */}
            <div className="chart-container mb-6">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid stroke="#ccc" />
                        <Bar dataKey="amount" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Line chart for spending trends over time */}
            <div className="chart-container mb-6">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid stroke="#ccc" />
                        <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Pie chart for category breakdown */}
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={categoryBreakdown} dataKey="amount" nameKey="category">
                            {/* Define colors for each category */}
                            {categoryBreakdown.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658'][index % 3]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Add more charts or summaries as needed */}
        </div>
    );
};

export default ReportsPage;
