import React from 'react';
import { useSelector } from 'react-redux';
import {
    ResponsiveContainer,
    BarChart,
    PieChart,
    LineChart,
    Pie,
    Bar,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell,
    Legend
} from 'recharts';

const ReportsPage = () => {
    const transactions = useSelector((state) => state.transactions.transactions || []);

    const totalIncome = transactions.reduce((acc, transaction) => {
        return transaction.type === 'income' ? acc + parseFloat(transaction.amount) : acc;
    }, 0);

    const totalExpense = transactions.reduce((acc, transaction) => {
        return transaction.type === 'expense' ? acc + parseFloat(transaction.amount) : acc;
    }, 0);

    const incomeData = transactions.filter(transaction => transaction.type === 'income').map(transaction => ({
        date: transaction.date,
        amount: parseFloat(transaction.amount),
    }));

    const expenseData = transactions.filter(transaction => transaction.type === 'expense').map(transaction => ({
        date: transaction.date,
        amount: parseFloat(transaction.amount),
    }));

    const combinedData = incomeData.map((income, index) => ({
        date: income.date,
        income: income.amount,
        expense: expenseData[index]?.amount || 0,
    }));

    const expenseCategories = transactions.filter(transaction => transaction.type === 'expense')
        .reduce((acc, transaction) => {
            const category = transaction.envelope || 'Uncategorized';
            if (acc[category]) {
                acc[category] += parseFloat(transaction.amount);
            } else {
                acc[category] = parseFloat(transaction.amount);
            }
            return acc;
        }, {});

    const pieChartData = Object.entries(expenseCategories).map(([category, amount]) => ({
        name: category,
        value: amount,
    }));

    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#d0ed57', '#a4de6c'];

    return (
        <div className="p-4" style={{ backgroundColor: 'rgb(239,250,255)' }}>
            <h2 className="text-2xl font-bold mb-4">Reports</h2>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Total Income vs Total Expense</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[{ name: 'Income', amount: totalIncome }, { name: 'Expense', amount: totalExpense }]}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Income and Expense Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={combinedData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="income" stroke="#82ca9d" name="Income" />
                        <Line type="monotone" dataKey="expense" stroke="#ff7300" name="Expense" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Expense Categories Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={pieChartData} dataKey="value" nameKey="name">
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ReportsPage;
