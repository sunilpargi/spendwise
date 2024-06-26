import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetNewEnvelopeCreatedFlag } from '../redux/reducers/envelopeReducer';

const FillEnvelopeForm = ({ envelopes, onSubmit }) => {
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch(); // Add useDispatch hook

    const handleChange = (envelopeId, fillAmount) => {
        setFormData((prevData) => ({
            ...prevData,
            [envelopeId]: fillAmount,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted. Dispatching resetNewEnvelopeCreatedFlag action...');
        await onSubmit(formData);
        dispatch(resetNewEnvelopeCreatedFlag()); // Dispatch the action to reset newEnvelopeCreated flag
    };

    console.log('Rendering FillEnvelopeForm...', { envelopes });

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
