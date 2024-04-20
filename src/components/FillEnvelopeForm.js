import React, { useState } from 'react';
const FillEnvelopeForm = ({ envelopes, onSubmit }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (envelopeId, fillAmount) => {
        setFormData((prevData) => ({
            ...prevData,
            [envelopeId]: fillAmount,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="fill-envelope-form">
            {envelopes.map((envelope) => (
                <div key={envelope.id} className="envelope-fill-item">
                    <label>{envelope.name}</label>
                    <input
                        type="number"
                        value={formData[envelope.id] || ''}
                        onChange={(event) =>
                            handleChange(envelope.id, event.target.value)
                        }
                        className="fill-amount-input"
                    />
                </div>
            ))}
            <button type="submit" className="btn-submit">
                Save
            </button>
        </form>
    );
};

export default FillEnvelopeForm;
