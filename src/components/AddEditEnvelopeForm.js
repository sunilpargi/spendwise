import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addEnvelope, editEnvelope } from '../redux/reducers/envelopeReducer';

const AddEditEnvelopeForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const envelopes = useSelector((state) => state.envelopes.envelopes || []);
    const existingEnvelope = envelopes.find((envelope) => envelope.id === id);

    const [name, setName] = useState(existingEnvelope ? existingEnvelope.name : '');
    const [available, setAvailable] = useState(existingEnvelope ? existingEnvelope.available : '');
    const [budget, setBudget] = useState(existingEnvelope ? existingEnvelope.budget : '');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {
            dispatch(editEnvelope({ id, name, available, budget }));
        } else {
            dispatch(addEnvelope({ name, available, budget }));
        }
        navigate('/envelope-management');
    };

    return (
        <div className="add-edit-envelope-form p-4">
            <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Envelope' : 'Add Envelope'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Available:</label>
                    <input
                        type="number"
                        value={available}
                        onChange={(e) => setAvailable(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Budget:</label>
                    <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {id ? 'Save' : 'Add'}
                </button>
            </form>
        </div>
    );
};

export default AddEditEnvelopeForm;
