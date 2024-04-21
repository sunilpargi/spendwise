import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import envelopeReducer from './reducers/envelopeReducer';
import transactionReducer from './reducers/transactionReducer';

// Define persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['envelopes', 'transactions'], // Specify which reducers you want to persist
};

// Wrap the reducers with persistReducer
const persistedEnvelopeReducer = persistReducer(persistConfig, envelopeReducer);
const persistedTransactionReducer = persistReducer(persistConfig, transactionReducer);

// Configure the store
const store = configureStore({
    reducer: {
        envelopes: persistedEnvelopeReducer,
        transactions: persistedTransactionReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check
    }),
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
