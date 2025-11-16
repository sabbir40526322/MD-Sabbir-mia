
import type { IpInfo } from '../types';

export const fetchIpInfo = async (ip: string): Promise<IpInfo> => {
  try {
    // Using a CORS-friendly API for IP lookups
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.status === 'fail') {
      throw new Error(data.message || 'Invalid IP address');
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch IP info:', error);
    throw error;
  }
};

export const getClientIp = async (): Promise<string> => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) {
            return '';
        }
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Failed to fetch client IP:', error);
        return '';
    }
};
