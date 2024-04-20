import React, { useState } from 'react';

const FillEnvelopePage = () => {
    // Initial state for envelopes
    const [envelopes, setEnvelopes] = useState([
        { id: 1, name: 'Groceries', budget: 500, available: 0 },
        { id: 2, name: 'Rent', budget: 1000, available: 0 },
        { id: 3, name: 'Entertainment', budget: 200, available: 0 },
        // Add more envelopes as needed
    ]);

    // State to track the sum of all available balances
    const [totalAmountFilled, setTotalAmountFilled] = useState(0);

    // Function to handle amount change
    const handleAmountChange = (value, envelopeId) => {
        // Convert the value to a number
        const amount = parseFloat(value);

        // Validate the input to ensure it's a positive number
        if (isNaN(amount) || amount < 0) {
            return;
        }

        // Update the available balance of the selected envelope
        const updatedEnvelopes = envelopes.map((envelope) => {
            if (envelope.id === envelopeId) {
                return {
                    ...envelope,
                    available: amount,
                };
            }
            return envelope;
        });

        setEnvelopes(updatedEnvelopes);

        // Recalculate the total amount filled as the sum of all available balances
        const newTotalAmountFilled = updatedEnvelopes.reduce((sum, envelope) => sum + envelope.available, 0);
        setTotalAmountFilled(newTotalAmountFilled);
    };

    return (
        <div className="fill-envelope-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="form-wrapper bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Fill Envelope</h1>

                {/* Display each envelope */}
                {envelopes.map((envelope) => (
                    <div key={envelope.id} className="mb-4">
                        <div className="flex justify-between mb-2">
                            <div className="font-semibold">{envelope.name}</div>
                            {/* Display available/budget */}
                            <div>{`${envelope.available.toFixed(2)}/${envelope.budget.toFixed(2)}`}</div>
                        </div>

                        {/* Display the green bar for the envelope */}
                        <div className="relative h-2 bg-gray-300 mt-2">
                            <div
                                className="absolute h-2 bg-green-500"
                                style={{
                                    width: `${Math.min((envelope.available / envelope.budget) * 100, 100)}%`,
                                }}
                            />
                        </div>

                        {/* Display input field for entering amount */}
                        <div className="mt-2 flex space-x-2">
                            <input
                                type="number"
                                min="0"
                                placeholder="0.00"
                                onChange={(e) => handleAmountChange(e.target.value, envelope.id)}
                                className="border p-1 w-20 rounded-lg"
                            />
                        </div>
                    </div>
                ))}

                {/* Display total amount filled */}
                <div className="mt-4 text-center">
                    <strong>Total Amount Filled :</strong> {totalAmountFilled.toFixed(2)}
                </div>

                {/* Save button */}
                <div className="flex justify-center mt-4">
                    <button className="btn bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                </div>
            </div>
        </div>
    );
};

export default FillEnvelopePage;
