
import React from 'react';
import type { ToolId, ToolSection } from '../types';
import { HomeIcon, MapPinIcon, ShieldCheckIcon, KeyIcon, CpuChipIcon, MagnifyingGlassIcon, EnvelopeIcon } from '@heroicons/react/24/outline';


const toolData: ToolSection[] = [
    {
        title: 'IP & LOCATION TOOLS',
        tools: [
            { id: 'ip-to-location', name: 'IP to Location', icon: MapPinIcon },
            { id: 'ip-score-checker', name: 'IP Score Checker', icon: ShieldCheckIcon },
            { id: 'zip-to-address', name: 'ZIP to Address', icon: KeyIcon },
        ]
    },
    {
        title: 'USER AGENT TOOLS',
        tools: [
            { id: 'ua-generator', name: 'UA Generator', icon: CpuChipIcon },
            { id: 'ua-checker', name: 'UA Checker', icon: MagnifyingGlassIcon },
        ]
    },
    {
        title: 'EMAIL & COMMUNICATION',
        tools: [
            { id: 'gmail-checker', name: 'Gmail Checker', icon: EnvelopeIcon },
        ]
    }
];

interface SidebarProps {
    activeTool: ToolId;
    setActiveTool: (toolId: ToolId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTool, setActiveTool }) => {
    const NavLink: React.FC<{ id: ToolId; name: string; icon: React.ComponentType<{ className?: string }> }> = ({ id, name, icon: Icon }) => {
        const isActive = activeTool === id;
        return (
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    setActiveTool(id);
                }}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ease-in-out ${
                    isActive
                        ? 'bg-navy-light text-cyan-accent shadow-lg'
                        : 'text-gray-300 hover:bg-navy-light hover:text-white'
                }`}
            >
                <Icon className="h-5 w-5 mr-3" />
                <span>{name}</span>
            </a>
        );
    };

    return (
        <aside className="w-64 bg-navy flex-shrink-0 p-4 space-y-4 overflow-y-auto hidden md:block">
            <nav className="flex flex-col space-y-2">
                <NavLink id="dashboard" name="Dashboard" icon={HomeIcon} />
                
                {toolData.map((section) => (
                    <div key={section.title} className="pt-4">
                        <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{section.title}</h3>
                        <div className="space-y-1">
                            {section.tools.map((tool) => (
                                <NavLink key={tool.id} id={tool.id} name={tool.name} icon={tool.icon} />
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
