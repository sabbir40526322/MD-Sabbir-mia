
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import IpLookup from './components/IpLookup';
import IpScoreChecker from './components/IpScoreChecker';
import ZipToAddress from './components/ZipToAddress';
import UaGenerator from './components/UaGenerator';
import UaChecker from './components/UaChecker';
import EmailChecker from './components/EmailChecker';
import type { ToolId } from './types';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolId>('dashboard');

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'dashboard':
        return <Dashboard />;
      case 'ip-to-location':
        return <IpLookup />;
      case 'ip-score-checker':
        return <IpScoreChecker />;
      case 'zip-to-address':
        return <ZipToAddress />;
      case 'ua-generator':
        return <UaGenerator />;
      case 'ua-checker':
        return <UaChecker />;
      case 'gmail-checker':
        return <EmailChecker />;
      default:
        return <Dashboard />;
    }
  };
  
  const toolTitle = useMemo(() => {
    const titles: Record<ToolId, string> = {
        'dashboard': 'Dashboard',
        'ip-to-location': 'IP to Location',
        'ip-score-checker': 'IP Score Checker',
        'zip-to-address': 'ZIP to Address',
        'ip-identity-finder': 'IP Identity Finder', // Handled by ip-to-location
        'ua-generator': 'UA Generator',
        'ua-checker': 'UA Checker',
        'gmail-checker': 'Gmail Checker',
    };
    return titles[activeTool] || 'Dashboard';
  }, [activeTool]);

  return (
    <div className="flex h-screen bg-navy-dark font-sans text-gray-200">
      <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
         <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-cyan-accent mb-6 pb-2 border-b-2 border-navy-light">{toolTitle}</h1>
            {renderActiveTool()}
        </div>
      </main>
    </div>
  );
};

export default App;
