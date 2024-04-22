import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../context/ThemeContext';
import { editEnvelope, updateEnvelopes } from '../redux/reducers/envelopeReducer';

const FillEnvelopePage = () => {
    const { isDarkMode } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const envelopesFromRedux = useSelector((state) => state.envelopes.envelopes || []);

    const [envelopes, setEnvelopes] = useState(envelopesFromRedux);

    const [totalAmountFilled, setTotalAmountFilled] = useState(0);

    const calculateTotalAmountFilled = () => {
        const totalFilled = envelopes.reduce((sum, envelope) => sum + (parseFloat(envelope.available) || 0), 0);
        setTotalAmountFilled(totalFilled);
    };

    const handleAmountChange = (value, envelopeId) => {
        const amount = parseFloat(value);

        if (isNaN(amount) || amount < 0) {
            return;
        }

        const updatedEnvelopes = envelopes.map((envelope) => {
            if (envelope.id === envelopeId) {
                return { ...envelope, available: amount };
            }
            return envelope;
        });

        setEnvelopes(updatedEnvelopes);
        calculateTotalAmountFilled();

        const updatedEnvelope = updatedEnvelopes.find((envelope) => envelope.id === envelopeId);
        dispatch(editEnvelope({ id: envelopeId, updatedData: updatedEnvelope }));

        console.log(`Envelope ${envelopeId} updated with new amount: ${amount}`);
    };

    const handleSave = () => {
        dispatch(updateEnvelopes(envelopes));

        console.log('Saving envelopes data:', envelopes);

        const toastId = toast.success('Envelopes data saved successfully!');

        toast.onChange((state) => {
            if (state.id === toastId && state.status === 'hidden') {
                navigate('/');
            }
        });
    };

    return (
        <div
            className={`fill-envelope-page ${isDarkMode ? 'dark' : ''} flex flex-col items-center justify-center min-h-screen`}
            style={{ backgroundColor: 'rgb(239,250,255)' }}
        >
            <div className="form-wrapper bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Fill Envelope</h1>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {envelopes.map((envelope) => (
                        <div key={envelope.id} className="mb-4">
                            <div className="flex justify-between mb-2">
                                <div className="font-semibold">{envelope.name}</div>
                                <div>{`${parseFloat(envelope.available || 0).toFixed(2)} / ${parseFloat(envelope.budget || 0).toFixed(2)}`}</div>
                            </div>
                            <div className="relative h-2 bg-gray-300 mt-2">
                                <div
                                    className="absolute h-2 bg-green-500"
                                    style={{
                                        width: `${Math.min((parseFloat(envelope.available || 0) / parseFloat(envelope.budget || 0)) * 100, 100)}%`,
                                    }}
                                />
                            </div>
                            <div className="mt-2 flex space-x-2">
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="0.00"
                                    value={parseFloat(envelope.available) || ''}
                                    onChange={(e) => handleAmountChange(e.target.value, envelope.id)}
                                    className="border p-1 w-20 rounded-lg"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 text-center">
                    <strong>Total Amount Filled:</strong> {totalAmountFilled.toFixed(2)}
                </div>
                <div className="flex justify-center mt-4">
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
