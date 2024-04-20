import React from 'react';

const Envelopes = ({ envelopes, onAddEnvelope, onEditEnvelope }) => {
    return (
        <div className="envelopes">
            <h2>Envelopes</h2>
            <ul>
                {envelopes.map((envelope) => (
                    <li key={envelope.id}>
                        <div>{envelope.name}</div>
                        <div>Budget: {envelope.budget}</div>
                        <button onClick={() => onEditEnvelope(envelope)}>Edit</button>
                    </li>
                ))}
            </ul>
            <button onClick={onAddEnvelope}>Add Envelope</button>
        </div>
    );
};

export default Envelopes;
