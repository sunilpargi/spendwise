import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

        // Log the change for debugging purposes
        console.log(`Envelope ${envelopeId} updated with new amount: ${amount}`);
    };

    // Function to handle save button click event
    const handleSave = () => {
        // Add code here to save the envelopes data (e.g., make an API call or update state)
        console.log('Saving envelopes data:', envelopes);

        // Show a success notification using react-toastify
        toast.success('Envelopes data saved successfully!');

        // Add any additional logic after saving data
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
                    <button className="btn bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>

            {/* Add the ToastContainer for notifications */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default FillEnvelopePage;
