import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChefProvider } from './context/ChefContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <ChefProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </ChefProvider>
  );
}

export default App;