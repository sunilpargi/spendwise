// src/utils/calculateChartData.js

const calculateChartData = (transactions) => {
    // Initialize an object to store totals per category
    const categoryTotals = {};
  
    // Iterate through transactions
    transactions.forEach((transaction) => {
      const { amount, category } = transaction;
  
      // Accumulate the amount in the appropriate category
      if (categoryTotals[category]) {
        categoryTotals[category] += amount;
      } else {
        categoryTotals[category] = amount;
      }
    });
  
    // Convert the categoryTotals object to an array of objects suitable for the chart
    const chartData = Object.keys(categoryTotals).map((category) => ({
      name: category,
      amount: categoryTotals[category],
    }));
  
    return chartData;
  };
  
  export default calculateChartData;
  