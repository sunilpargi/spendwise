
const calculateChartData = (transactions) => {
    const categoryTotals = {};
  
    transactions.forEach((transaction) => {
      const { amount, category } = transaction;
  
      if (categoryTotals[category]) {
        categoryTotals[category] += amount;
      } else {
        categoryTotals[category] = amount;
      }
    });
  
    const chartData = Object.keys(categoryTotals).map((category) => ({
      name: category,
      amount: categoryTotals[category],
    }));
  
    return chartData;
  };
  
  export default calculateChartData;
  