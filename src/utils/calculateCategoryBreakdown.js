export default function calculateCategoryBreakdown(transactions) {
    const categoryMap = new Map();
  
    transactions.forEach((transaction) => {
      const category = transaction.category;
      const amount = transaction.amount;
  
      if (categoryMap.has(category)) {
        categoryMap.set(category, categoryMap.get(category) + amount);
      } else {
        categoryMap.set(category, amount);
      }
    });
  
    const categoryBreakdown = [];
    for (const [category, amount] of categoryMap.entries()) {
      categoryBreakdown.push({
        category: category,
        amount: amount,
      });
    }
  
    return categoryBreakdown;
  }
  