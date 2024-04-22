import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addEnvelope, editEnvelope, deleteEnvelope } from '../redux/reducers/envelopeReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';

const EnvelopeManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const envelopes = useSelector((state) => state.envelopes.envelopes || []);

    const [envelopesData, setEnvelopesData] = useState(envelopes);

    useEffect(() => {
        setEnvelopesData(envelopes);
    }, [envelopes]);

    const handleInputChange = (index, field, value) => {
        const updatedEnvelopes = [...envelopesData];
        updatedEnvelopes[index] = {
            ...updatedEnvelopes[index], 
            [field]: value 
        };
        setEnvelopesData(updatedEnvelopes);
    };

    const handleAddEnvelope = () => {
        setEnvelopesData([...envelopesData, { id: Date.now(), name: '', budget: 0 }]);
    };

    const handleDeleteEnvelope = (index) => {
        const updatedEnvelopes = envelopesData.filter((_, i) => i !== index);
        setEnvelopesData(updatedEnvelopes);
    };

    const handleSaveChanges = () => {
        const validEnvelopes = envelopesData.filter(
            (envelope) => envelope.name.trim() !== '' && envelope.budget > 0
        );
    
        // Iterate through valid envelopes and update Redux state
        validEnvelopes.forEach((envelope) => {
            const existingEnvelope = envelopes.find((e) => e.id === envelope.id);
            if (existingEnvelope) {
                // Edit existing envelope
                dispatch(editEnvelope({ id: envelope.id, updatedData: envelope }));
            } else {
                // Add new envelope
                dispatch(addEnvelope(envelope));
            }
        });
    
        // Determine which envelopes need to be deleted
        const deletedEnvelopes = envelopes.filter(
            (envelope) => !validEnvelopes.some((e) => e.id === envelope.id)
        );
    
        // Delete envelopes in Redux state
        deletedEnvelopes.forEach((envelope) => {
            dispatch(deleteEnvelope(envelope.id));
        });
    
        // Redirect to homepage after saving
        navigate('/');
    };

    // Handle canceling changes
    const handleCancelChanges = () => {
        setEnvelopesData(envelopes);
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: 'rgb(239,250,255)' }}>
            <div className="p-4 bg-white rounded-lg shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Add / Edit Envelopes</h2>
                <p className="text-sm mb-4">Design a budget you can really live with.</p>

                {/* Table for envelopes */}
                <table className="w-full mb-4">
                    <thead>
                        <tr>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Amount</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* List of envelopes */}
                        {envelopesData.map((envelope, index) => (
                            <tr key={envelope.id}>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={envelope.name}
                                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                        className="border p-2 w-full"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={envelope.budget}
                                        onChange={(e) => handleInputChange(index, 'budget', e.target.value)}
                                        className="border p-2 w-full"
                                    />
                                </td>
                                <td className="border p-2">
                                    {/* Delete button */}
                                    <button
                                        className="btn bg-red-600 text-white px-2 py-2 rounded"
                                        onClick={() => handleDeleteEnvelope(index)}
                                    >
                                        <FaTrashAlt /> {/* Trash icon for delete action */}
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {/* Add button */}
                        <tr>
                            <td colSpan={3} className="border p-2 text-left">
                                <button
                                    className="btn bg-blue-600 text-white px-2 py-2 rounded"
                                    onClick={handleAddEnvelope}
                                >
                                    <FaPlus /> {/* Plus icon for add action */}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Save and Cancel buttons */}
                <div className="flex justify-center space-x-4">
                    <button
                        className="btn bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleSaveChanges}
                    >
                        Save
                    </button>
                    <button
                        className="btn bg-gray-300 text-black px-4 py-2 rounded"
                        onClick={handleCancelChanges}
                    >
                        Cancel
                    </button>
                </div>
            </div>

            {/* Toast notification container */}
            <ToastContainer position="top-right" />
        </div>
    );
};

export default EnvelopeManagementPage;
