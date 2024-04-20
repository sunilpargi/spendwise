import React, { useState } from 'react';
import FillEnvelopeForm from '../components/FillEnvelopeForm';


const FillEnvelopePage = () => {
    const [envelopes, setEnvelopes] = useState([
        // Add envelope data here
        // Example: { id: '1', name: 'Groceries', amount: 0 }
    ]);

    const handleFormSubmit = (formData) => {
        // Process the formData and update envelopes
        console.log('Form data:', formData);
    };

    return (
        <div className="fill-envelope-page">
            <h1>Fill Envelopes</h1>
            <FillEnvelopeForm envelopes={envelopes} onSubmit={handleFormSubmit} />
        </div>
    );
};

export default FillEnvelopePage;

