import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from './App.jsx';
import LogInForm from './components/LoginForm.jsx';
import './index.css';
import ReactDOM from 'react-dom/client';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LogInForm />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
