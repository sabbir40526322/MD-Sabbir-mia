
import React, { useState } from 'react';
import { fetchIpInfo } from '../services/ipService';
import { analyzeIpWithGemini } from '../services/geminiService';
import Spinner from './Spinner';

const IpScoreChecker: React.FC = () => {
    const [ip, setIp] = useState('');
    const [result, setResult] = useState<{ score: number; analysis: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheck = async () => {
        if (!ip) {
            setError('Please enter an IP address.');
            return;
        }
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const ipInfo = await fetchIpInfo(ip);
            const analysisResult = await analyzeIpWithGemini(ipInfo);
            setResult(analysisResult);
        } catch (err: any) {
            setError(err.message || 'An error occurred during the analysis.');
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score > 75) return 'text-red-500';
        if (score > 40) return 'text-yellow-500';
        return 'text-green-500';
    };

    return (
        <div className="bg-navy p-6 rounded-lg shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    placeholder="Enter IP address to analyze"
                    className="flex-grow bg-navy-dark border border-navy-light text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-accent"
                />
                <button
                    onClick={handleCheck}
                    disabled={loading}
                    className="bg-cyan-accent text-navy-dark font-bold px-6 py-2 rounded-md hover:bg-opacity-80 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading ? <Spinner /> : 'Analyze IP'}
                </button>
            </div>

            {error && <p className="text-red-400 text-center">{error}</p>}

            {result && (
                <div className="bg-navy-dark p-6 rounded-lg mt-4 text-center animate-fadeIn">
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">AI Risk Score</h3>
                    <p className={`text-7xl font-bold ${getScoreColor(result.score)}`}>
                        {result.score}
                    </p>
                    <p className="text-sm text-gray-400 mb-4">/ 100</p>
                    <h4 className="text-md font-semibold text-cyan-accent mt-6 mb-2">AI Analysis</h4>
                    <p className="text-gray-300 max-w-lg mx-auto">{result.analysis}</p>
                </div>
            )}
        </div>
    );
};

export default IpScoreChecker;
