import { combineReducers } from '@reduxjs/toolkit';
import transactionReducer from './reducers/transactionReducer';
import envelopeReducer from './reducers/envelopeReducer';

const rootReducer = combineReducers({
    transactions: transactionReducer,
    envelopes: envelopeReducer,
});

export default rootReducer;
