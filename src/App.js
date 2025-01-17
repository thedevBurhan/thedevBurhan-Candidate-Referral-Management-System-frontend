import React from 'react';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-3xl text-center text-[#393939] font-bold mb-4 sm:text-4xl md:text-5xl">
      Candidate Referral Dashboard
    </h1>
    <Dashboard />
  </div>
  
  );
};

export default App;


