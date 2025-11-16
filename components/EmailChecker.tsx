
import React, { useState } from 'react';
import { analyzeEmailWithGemini } from '../services/geminiService';
import Spinner from './Spinner';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const EmailChecker: React.FC = () => {
    const [email, setEmail] = useState('');
    const [result, setResult] = useState<{ isDisposable: boolean; analysis: string; isValidFormat: boolean } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheck = async () => {
        if (!email) {
            setError('Please enter an email address.');
            return;
        }
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const analysisResult = await analyzeEmailWithGemini(email);
            setResult(analysisResult);
        } catch (err: any) {
            setError(err.message || 'An error occurred during the analysis.');
        } finally {
            setLoading(false);
        }
    };
    
    const ResultIcon: React.FC<{ result: { isDisposable: boolean; isValidFormat: boolean } }> = ({ result }) => {
        if (!result.isValidFormat) {
            return <XCircleIcon className="h-16 w-16 text-red-500" />;
        }
        if (result.isDisposable) {
            return <ExclamationTriangleIcon className="h-16 w-16 text-yellow-500" />;
        }
        return <CheckCircleIcon className="h-16 w-16 text-green-500" />;
    };

    return (
        <div className="bg-navy p-6 rounded-lg shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address to check"
                    className="flex-grow bg-navy-dark border border-navy-light text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-accent"
                />
                <button
                    onClick={handleCheck}
                    disabled={loading}
                    className="bg-cyan-accent text-navy-dark font-bold px-6 py-2 rounded-md hover:bg-opacity-80 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading ? <Spinner /> : 'Check Email'}
                </button>
            </div>
            
            <div className="bg-navy-dark p-4 rounded-md text-center text-sm text-yellow-300 border border-yellow-500">
                <p><strong>Note:</strong> This tool checks email format and uses AI to analyze the domain for signs of being temporary or high-risk. It does not verify if the mailbox actually exists.</p>
            </div>

            {error && <p className="text-red-400 text-center">{error}</p>}

            {result && (
                <div className="bg-navy-dark p-6 rounded-lg mt-4 text-center animate-fadeIn flex flex-col items-center gap-4">
                    <ResultIcon result={result} />
                    <h3 className="text-lg font-semibold text-cyan-accent">AI Analysis</h3>
                    <p className="text-gray-300 max-w-lg mx-auto">{result.analysis}</p>
                </div>
            )}
        </div>
    );
};

export default EmailChecker;
