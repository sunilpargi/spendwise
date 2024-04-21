import React from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import calculateChartData from '../utils/calculateChartData';
import calculateCategoryBreakdown from '../utils/calculateCategoryBreakdown';

const ReportsPage = () => {
    // Fetch transactions from Redux store
    const transactions = useSelector((state) => state.transactions.transactions || []);

    // Calculate chart data and category breakdown
    const chartData = calculateChartData(transactions);
    const categoryBreakdown = calculateCategoryBreakdown(transactions);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Reports</h2>

            {/* Bar Chart: Spending Trends */}
            <div className="mb-6">
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

            {/* Pie Chart: Category Breakdown */}
            <div className="mb-6">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={categoryBreakdown} dataKey="amount" nameKey="category">
                            {categoryBreakdown.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={['#82ca9d', '#ffc658', '#8884d8'][index % 3]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Add more charts or summaries as needed */}
        </div>
    );
};

export default ReportsPage;
