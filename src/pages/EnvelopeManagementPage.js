import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addEnvelope, editEnvelope, deleteEnvelope } from '../redux/reducers/envelopeReducer';
import Envelopes from '../components/Envelopes';
import AddEditEnvelopeForm from '../components/AddEditEnvelopeForm';

const EnvelopeManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const envelopes = useSelector((state) => state.envelopes.envelopes || []);
    const { id } = useParams(); // Use useParams to get the id from the URL

    const handleAddEnvelope = () => {
        navigate('/add-envelope');
    };

    const handleEditEnvelope = (envelope) => {
        navigate(`/edit-envelope/${envelope.id}`);
    };

    const handleDeleteEnvelope = (envelopeId) => {
        dispatch(deleteEnvelope(envelopeId));
    };

    return (
        <div className="envelope-management-page p-4">
            <h2 className="text-2xl font-bold mb-4">Envelope Management</h2>
            
            {/* Conditionally render the AddEditEnvelopeForm if we are editing an envelope */}
            {id ? (
                <AddEditEnvelopeForm envelopeId={id} />
            ) : (
                // If no id is in the URL, render the list of envelopes and the button to add an envelope
                <div>
                    <Envelopes
                        envelopes={envelopes}
                        onAddEnvelope={handleAddEnvelope}
                        onEditEnvelope={handleEditEnvelope}
                        onDeleteEnvelope={handleDeleteEnvelope}
                    />
                    <div className="text-center mt-4">
                        <button
                            className="btn bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={handleAddEnvelope}
                        >
                            Add Envelope
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnvelopeManagementPage;
