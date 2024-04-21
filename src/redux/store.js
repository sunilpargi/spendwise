import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import envelopeReducer from './reducers/envelopeReducer';
import transactionReducer from './reducers/transactionReducer';

const persistConfig = {
    key: 'root',
    storage,
    // Configure `redux-persist` to ignore the warnings about non-serializable values
    // if it is intentional and you are confident with your data handling.
    blacklist: ['nonSerializableKey'], // Example to ignore specific keys
};

const persistedEnvelopeReducer = persistReducer(persistConfig, envelopeReducer);

const store = configureStore({
    reducer: {
        envelopes: persistedEnvelopeReducer,
        transactions: transactionReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, // Turn off serializable value check
    }),
});

export const persistor = persistStore(store);
export default store;
