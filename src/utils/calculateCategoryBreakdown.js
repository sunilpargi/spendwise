// src/utils/calculateCategoryBreakdown.js
export default function calculateCategoryBreakdown(transactions) {
    // Create a map to store the total spending per category
    const categoryMap = new Map();
  
    // Iterate through each transaction
    transactions.forEach((transaction) => {
      // Get the category and amount of the transaction
      const category = transaction.category;
      const amount = transaction.amount;
  
      // Check if the category already exists in the map
      if (categoryMap.has(category)) {
        // Add the transaction amount to the existing total
        categoryMap.set(category, categoryMap.get(category) + amount);
      } else {
        // If the category doesn't exist in the map, add a new entry with the amount
        categoryMap.set(category, amount);
      }
    });
  
    // Convert the category map to an array of objects
    const categoryBreakdown = [];
    for (const [category, amount] of categoryMap.entries()) {
      categoryBreakdown.push({
        category: category,
        amount: amount,
      });
    }
  
    return categoryBreakdown;
  }
  