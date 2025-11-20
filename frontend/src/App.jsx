import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import HRM from './components/HRM';
import CMS from './components/CMS';
import POS from './components/POS';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'pos':
        return <POS />;
      case 'inventory':
        return <Inventory />;
      case 'hrm':
        return <HRM />;
      case 'cms':
        return <CMS />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
