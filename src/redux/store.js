import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer'; // Import the root reducer

const store = configureStore({
    reducer: rootReducer,
    // Add other store configurations here if needed
});

export default store;
