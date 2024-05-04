import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEnvelope } from '../redux/reducers/envelopeReducer';

const defaultEnvelopes = [
    { name: 'Grocery', available: 0, budget: 100 },
    { name: 'Rent', available: 0, budget: 500 },
    { name: 'Utilities', available: 0, budget: 150 },
    // Add more default envelopes here
];

const useInitializeDefaultEnvelopes = () => {
    const dispatch = useDispatch();
    const envelopes = useSelector((state) => state.envelopes.envelopes || []);

    // Add default envelopes if envelopes data is empty
    useEffect(() => {
        if (envelopes.length === 0) {
            defaultEnvelopes.forEach((envelope) => {
                dispatch(addEnvelope(envelope));
                console.log('Added default envelope:', envelope);
            });
        }
    }, [dispatch, envelopes]);
};

export default useInitializeDefaultEnvelopes;
