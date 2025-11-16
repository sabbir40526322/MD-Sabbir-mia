// FIX: Import React to fix 'Cannot find namespace React' error.
import React from 'react';

export type ToolId = 
  | 'dashboard'
  | 'ip-to-location'
  | 'ip-score-checker'
  | 'zip-to-address'
  | 'ip-identity-finder'
  | 'ua-generator'
  | 'ua-checker'
  | 'gmail-checker';

export interface Tool {
  id: ToolId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ToolSection {
  title: string;
  tools: Tool[];
}

export interface IpInfo {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}
