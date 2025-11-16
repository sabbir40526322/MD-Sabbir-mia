
import React, { useState } from 'react';
import { analyzeUaWithGemini } from '../services/geminiService';
import Spinner from './Spinner';

interface UaDetails {
    browser: string;
    os: string;
    device: string;
    type: string;
    raw: string;
}

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex justify-between py-3 border-b border-navy-light">
        <span className="font-medium text-gray-400">{label}</span>
        <span className="font-semibold text-white text-right">{value}</span>
    </div>
);

const UaChecker: React.FC = () => {
    const [ua, setUa] = useState('');
    const [details, setDetails] = useState<UaDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheck = async () => {
        if (!ua) {
            setError('Please enter a User Agent string.');
            return;
        }
        setLoading(true);
        setError(null);
        setDetails(null);
        try {
            const result = await analyzeUaWithGemini(ua);
            setDetails(result);
        } catch (err: any) {
            setError(err.message || 'Failed to analyze User Agent.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-navy p-6 rounded-lg shadow-xl space-y-6">
            <textarea
                value={ua}
                onChange={(e) => setUa(e.target.value)}
                placeholder="Paste User Agent string here..."
                rows={4}
                className="w-full bg-navy-dark border border-navy-light text-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-accent font-mono text-sm"
            />
             <button
                onClick={handleCheck}
                disabled={loading}
                className="w-full bg-cyan-accent text-navy-dark font-bold px-6 py-3 rounded-md hover:bg-opacity-80 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {loading ? <Spinner /> : 'Check User Agent'}
            </button>
            
            {error && <p className="text-red-400 text-center">{error}</p>}

            {details && (
                <div className="bg-navy-dark p-6 rounded-lg mt-4 animate-fadeIn">
                    <h3 className="text-xl font-bold text-cyan-accent mb-4">Analysis Results</h3>
                    <div className="space-y-2">
                        <InfoRow label="Device Type" value={details.type} />
                        <InfoRow label="Device" value={details.device} />
                        <InfoRow label="Operating System" value={details.os} />
                        <InfoRow label="Browser" value={details.browser} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UaChecker;
