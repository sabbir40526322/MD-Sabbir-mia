
import React, { useState } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

const iphoneUserAgents = [
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/114.0.5735.124 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/115.0 Mobile/15E148 Safari/605.1.15",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
];

const samsungUserAgents = [
  "Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 14; SM-G991U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 12; SM-A525F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/17.0 Chrome/96.0.4664.104 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 13; SM-N986U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36"
];

const UaGenerator: React.FC = () => {
    const [userAgent, setUserAgent] = useState('Click a button to generate a User Agent string.');
    const [copied, setCopied] = useState(false);

    const generateUA = (type: 'iphone' | 'samsung') => {
        const uaList = type === 'iphone' ? iphoneUserAgents : samsungUserAgents;
        const randomIndex = Math.floor(Math.random() * uaList.length);
        setUserAgent(uaList[randomIndex]);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(userAgent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-navy p-6 rounded-lg shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
                <button
                    onClick={() => generateUA('iphone')}
                    className="flex-1 bg-gray-200 text-black font-bold px-6 py-3 rounded-md hover:bg-white transition-all"
                >
                    Generate iPhone UA
                </button>
                <button
                    onClick={() => generateUA('samsung')}
                    className="flex-1 bg-blue-600 text-white font-bold px-6 py-3 rounded-md hover:bg-blue-500 transition-all"
                >
                    Generate Samsung UA
                </button>
            </div>

            <div className="bg-navy-dark p-4 rounded-md relative">
                <p className="font-mono text-sm text-gray-300 break-words">{userAgent}</p>
                <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 p-2 bg-navy-light rounded-md text-gray-300 hover:text-cyan-accent hover:bg-navy"
                >
                   <ClipboardDocumentIcon className="h-5 w-5" />
                </button>
                {copied && <span className="absolute top-10 right-2 text-xs bg-green-500 text-white px-2 py-1 rounded">Copied!</span>}
            </div>
        </div>
    );
};

export default UaGenerator;
