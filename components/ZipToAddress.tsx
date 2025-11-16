
import React, { useState } from 'react';
import { findAddressByZipWithGemini } from '../services/geminiService';
import Spinner from './Spinner';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';

interface Location {
    name: string;
    address: string;
}

const ZipToAddress: React.FC = () => {
    const [zip, setZip] = useState('');
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!/^\d{5}$/.test(zip)) {
            setError('Please enter a valid 5-digit US ZIP code.');
            return;
        }
        setLoading(true);
        setError(null);
        setLocations([]);
        try {
            const result = await findAddressByZipWithGemini(zip);
            setLocations(result.locations);
        } catch (err: any) {
            setError(err.message || 'Failed to find locations.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-navy p-6 rounded-lg shadow-xl space-y-6">
             <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="Enter 5-digit US ZIP code"
                    maxLength={5}
                    className="flex-grow bg-navy-dark border border-navy-light text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-accent"
                />
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="bg-cyan-accent text-navy-dark font-bold px-6 py-2 rounded-md hover:bg-opacity-80 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading ? <Spinner /> : 'Find Examples'}
                </button>
            </div>

            <div className="bg-navy-dark p-4 rounded-md text-center text-sm text-yellow-300 border border-yellow-500">
                <p><strong>Note:</strong> This tool provides AI-generated examples of public places within a ZIP code. It is not a precise residential address lookup service.</p>
            </div>

            {error && <p className="text-red-400 text-center">{error}</p>}
            
            {loading && <div className="flex justify-center"><Spinner /></div>}

            {!loading && locations.length > 0 && (
                <div className="space-y-4 animate-fadeIn">
                    <h3 className="text-xl font-bold text-cyan-accent">Example Locations for {zip}</h3>
                    {locations.map((loc, index) => (
                        <div key={index} className="bg-navy-dark p-4 rounded-lg flex items-start gap-4">
                            <div className="flex-shrink-0 h-10 w-10 bg-navy-light rounded-full flex items-center justify-center text-cyan-accent">
                                <BuildingOffice2Icon className="h-6 w-6"/>
                            </div>
                            <div>
                                <p className="font-bold text-white">{loc.name}</p>
                                <p className="text-gray-400">{loc.address}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && locations.length === 0 && !error && (
                <div className="text-center text-gray-400 pt-4">
                   Enter a ZIP code to see example locations.
                </div>
            )}
        </div>
    );
};

export default ZipToAddress;
