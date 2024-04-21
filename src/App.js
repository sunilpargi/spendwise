import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AddTransactionPage from './pages/AddTransactionPage';
import FillEnvelopePage from './pages/FillEnvelopePage';
import ReportsPage from './pages/ReportsPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { AuthProvider } from './context/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <div className="main-content min-h-screen">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/add-transaction" element={<AddTransactionPage />} />
                        <Route path="/fill-envelope" element={<FillEnvelopePage />} />
                        <Route path="/reports" element={<ReportsPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                    </Routes>
                </div>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;
