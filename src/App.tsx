import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from './components/ui/Toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;