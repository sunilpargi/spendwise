const DashboardPage = () => {
    // Placeholder data for demonstration purposes
    const totalBalance = 1000;
    const recentTransactions = [
        { id: '1', date: '2024-04-20', description: 'Groceries', amount: -50 },
        { id: '2', date: '2024-04-19', description: 'Salary', amount: 2000 },
        // Add more recent transactions as needed
    ];

    return (
        <div className="dashboard-page p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            {/* Display total balance */}
            <div className="total-balance my-4">
                <h2 className="text-xl">Total Balance: ${totalBalance}</h2>
            </div>

            {/* Display recent transactions */}
            <div className="recent-transactions my-4">
                <h3 className="text-lg font-semibold">Recent Transactions</h3>
                <ul>
                    {recentTransactions.map((transaction) => (
                        <li key={transaction.id} className="my-2">
                            <div>{transaction.date}</div>
                            <div>{transaction.description}</div>
                            <div>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}</div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Add other dashboard components as needed */}
        </div>
    );
};

export default DashboardPage;
