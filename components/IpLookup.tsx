
import React, { useState, useEffect } from 'react';
import { fetchIpInfo, getClientIp } from '../services/ipService';
import type { IpInfo } from '../types';
import Spinner from './Spinner';

const InfoRow: React.FC<{ label: string; value: string | number | undefined }> = ({ label, value }) => (
    <div className="flex justify-between py-3 border-b border-navy-light">
        <span className="font-medium text-gray-400">{label}</span>
        <span className="font-mono text-white">{value || 'N/A'}</span>
    </div>
);

const IpLookup: React.FC = () => {
  const [ip, setIp] = useState('');
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserIp = async () => {
        setLoading(true);
        try {
            const clientIp = await getClientIp();
            if (clientIp) {
                setIp(clientIp);
                await handleLookup(clientIp);
            }
        } catch (err) {
            setError("Could not fetch your IP address.");
        } finally {
            setLoading(false);
        }
    };
    fetchUserIp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLookup = async (lookupIp: string) => {
    if (!lookupIp) {
      setError('Please enter an IP address.');
      return;
    }
    setLoading(true);
    setError(null);
    setIpInfo(null);
    try {
      const data = await fetchIpInfo(lookupIp);
      setIpInfo(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch IP information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-navy p-6 rounded-lg shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Enter IP address (e.g., 8.8.8.8)"
          className="flex-grow bg-navy-dark border border-navy-light text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-accent"
        />
        <button
          onClick={() => handleLookup(ip)}
          disabled={loading}
          className="bg-cyan-accent text-navy-dark font-bold px-6 py-2 rounded-md hover:bg-opacity-80 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? <Spinner /> : 'Lookup'}
        </button>
      </div>
      
      {error && <p className="text-red-400 text-center">{error}</p>}

      {ipInfo && (
        <div className="bg-navy-dark p-6 rounded-lg mt-4 animate-fadeIn">
            <h3 className="text-xl font-bold text-cyan-accent mb-4">IP Information for {ipInfo.query}</h3>
            <div className="space-y-2">
                <InfoRow label="Country" value={`${ipInfo.country} (${ipInfo.countryCode})`} />
                <InfoRow label="Region" value={`${ipInfo.regionName} (${ipInfo.region})`} />
                <InfoRow label="City" value={ipInfo.city} />
                <InfoRow label="ZIP Code" value={ipInfo.zip} />
                <InfoRow label="Coordinates" value={`${ipInfo.lat}, ${ipInfo.lon}`} />
                <InfoRow label="Timezone" value={ipInfo.timezone} />
                <InfoRow label="ISP" value={ipInfo.isp} />
                <InfoRow label="Organization" value={ipInfo.org} />
                <InfoRow label="ASN" value={ipInfo.as} />
            </div>
        </div>
      )}
    </div>
  );
};

export default IpLookup;
