import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Add this import
import { editEnvelope, updateEnvelopes } from '../redux/reducers/envelopeReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../context/ThemeContext';

const FillEnvelopePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    // Redux envelopes and envelopes in local state
    const envelopesFromRedux = useSelector((state) => state.envelopes.envelopes);

    useEffect(() => {
        console.log("Envelopes from Redux on mount:", envelopesFromRedux);
    }, [envelopesFromRedux]);

    // Calculate total filled amount
    const totalAmountFilled = envelopesFromRedux.reduce((acc, envelope) => acc + parseFloat(envelope.available || 0), 0);

    // State variables for envelope amounts
    const [envelopeAmounts, setEnvelopeAmounts] = useState({});
    // Initialize envelope amounts with default values
    useEffect(() => {
        const initialEnvelopeAmounts = {};
        envelopesFromRedux.forEach(envelope => {
            initialEnvelopeAmounts[envelope.id] = envelope.available || 0;
        });
        setEnvelopeAmounts(initialEnvelopeAmounts);
    }, [envelopesFromRedux]);

    const handleAmountChange = (event, envelopeId) => {
        const newAvailable = parseFloat(event.target.value);
        console.log(`Handling amount change: envelopeId = ${envelopeId}, new value = ${newAvailable}`);
    
        // Check if envelopeId is undefined
        if (envelopeId === undefined) {
            console.error('Error: envelopeId is undefined.');
            console.log('Event:', event);
            console.log('Event target value:', event.target.value);
            return;
        }
    
        // Create a new array with updated envelope available amount
        const updatedEnvelopes = envelopesFromRedux.map((envelope) => {
            if (envelope.id === envelopeId) {
                console.log(`Updating envelope ${envelopeId} with new available amount: ${newAvailable}`);
                return {
                    ...envelope,
                    available: newAvailable,
                };
            }
            return envelope;
        });
    
        // Update state and Redux store
        setEnvelopeAmounts(updatedEnvelopes);
        console.log("Updated envelopes:", updatedEnvelopes);
    
        // Dispatch the updated envelopes to the Redux store
        dispatch(updateEnvelopes(updatedEnvelopes));
    };
    
    

    const handleSave = () => {
        // Convert envelopeAmounts object to an array of envelopes
        const updatedEnvelopes = Object.keys(envelopeAmounts).map(envelopeId => {
            const parsedEnvelopeId = parseInt(envelopeId); // Parse the envelopeId as an integer
            const envelope = envelopesFromRedux.find(envelope => envelope.id === parsedEnvelopeId);
            console.log('Found envelope:', envelope); // Log the found envelope
            if (envelope) {
                return {
                    id: parsedEnvelopeId,
                    available: envelopeAmounts[envelopeId],
                    name: envelope.name || '', // Retrieve the name from the existing envelope, or fallback to an empty string
                    budget: envelope.budget || 0, // Retrieve the budget from the existing envelope, or fallback to 0
                };
            } else {
                // If the envelope does not exist in the redux state, create a new one with empty name and budget
                return {
                    id: parsedEnvelopeId,
                    available: envelopeAmounts[envelopeId],
                    name: '',
                    budget: 0,
                };
            }
        });
    
        console.log('Updated envelopes:', updatedEnvelopes); // Log the updated envelopes
    
        // Dispatch the updated envelopes array to the Redux store
        dispatch(updateEnvelopes(updatedEnvelopes));
        console.log("Saving envelopes data:", updatedEnvelopes);
    
        // Notify the user and navigate back home
        toast.success('Envelopes saved successfully!');
        setTimeout(() => navigate('/'), 3000);
    };
    
    
    
    
    

    return (
        <div
            className={`fill-envelope-page ${isDarkMode ? 'dark' : ''} flex flex-col items-center justify-center min-h-screen`}
            style={{ backgroundColor: 'rgb(239,250,255)' }}
        >
            <div className="form-wrapper bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Fill Envelope</h1>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {envelopesFromRedux.map((envelope) => {
    console.log('Envelope:', envelope); // Log the envelope object
    return (
        <div key={envelope.id} className="mb-4">
            <div className="flex justify-between mb-2">
                <div className="font-semibold">{envelope.name}</div>
                <div>{`${envelope.available} / ${envelope.budget}`}</div>
            </div>
            <div className="relative h-2 bg-gray-300 mt-2">
                <div
                    className="absolute h-2 bg-green-500"
                    style={{
                        width: `${(envelope.available / envelope.budget) * 100}%`,
                    }}
                />
            </div>
            <div className="mt-2">
                <input
                    type="number"
                    min="0"
                    value={envelopeAmounts[envelope.id] || 0}
                    onChange={(e) => handleAmountChange(e, envelope.id)}
                    className="p-2 border rounded"
                />
            </div>
        </div>
    );
})}

                </div>

                <div className="mt-4 text-center">
                    <button className="btn bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default FillEnvelopePage;
