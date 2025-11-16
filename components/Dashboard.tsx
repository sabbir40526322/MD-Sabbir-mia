
import React from 'react';
import { CogIcon, ShieldCheckIcon, GlobeAltIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="bg-navy-light p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-navy text-cyan-accent mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center bg-navy p-8 rounded-lg shadow-2xl">
        <h2 className="text-4xl font-extrabold text-white">Welcome to Dev Toolbox Pro</h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Your centralized hub for powerful developer utilities. Instantly access tools for network analysis, user agent simulation, and communication verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <FeatureCard 
            title="IP & Location Analysis" 
            description="Instantly look up IP details, check reputation scores, and find location information from a ZIP code."
            icon={<GlobeAltIcon className="h-6 w-6" />}
        />
        <FeatureCard 
            title="User Agent Utilities" 
            description="Generate User Agent strings for various devices or parse existing ones to understand browser and OS details."
            icon={<CogIcon className="h-6 w-6" />}
        />
        <FeatureCard 
            title="Communication Checkers" 
            description="Verify email address formats and analyze domain reputation with AI-powered insights."
            icon={<EnvelopeIcon className="h-6 w-6" />}
        />
        <FeatureCard 
            title="AI-Powered Insights" 
            description="Leverage the power of Google's Gemini API for advanced analysis and scoring across multiple tools."
            icon={<ShieldCheckIcon className="h-6 w-6" />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
