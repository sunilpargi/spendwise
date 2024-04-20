import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app inside the root element using Provider for Redux
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
