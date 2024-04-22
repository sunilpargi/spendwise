// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import calculateChartData from '../utils/calculateChartData';

const DashboardPage = () => {
  const transactions = useSelector((state) => state.transactions);

  // State to store chart data
  const [chartData, setChartData] = useState([]);

  // Calculate chart data whenever transactions change
  useEffect(() => {
    const data = calculateChartData(transactions);
    setChartData(data);
  }, [transactions]);

  return (
    <div className="dashboard-page p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Bar dataKey="amount" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
