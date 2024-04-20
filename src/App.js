import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AddTransactionPage from "./pages/AddTransactionPage";
import FillEnvelopePage from "./pages/FillEnvelopePage";
import DashboardPage from "./pages/DashboardPage";
import ReportsPage from "./pages/ReportsPage";

const App = () => {
  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <Router>
      <Header username="User" onLogout={handleLogout} />
      <div className="main-content min-h-screen">
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<HomePage />} />
          <Route path="/add-transaction" element={<AddTransactionPage />} />
          <Route path="/fill-envelope" element={<FillEnvelopePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
