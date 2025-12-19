
import React, { useState } from 'react';
import DetectorView from './components/DetectorView';
import DashboardView from './components/DashboardView';
import ArchitectureView from './components/ArchitectureView';
import MLOpsView from './components/MLOpsView';
import { AppTab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DETECTOR);

  const NavItem = ({ id, label, icon }: { id: AppTab; label: string; icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
        activeTab === id 
          ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' 
          : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar / Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              SentinelAI
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            <NavItem 
              id={AppTab.DETECTOR} 
              label="Detector" 
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>} 
            />
            <NavItem 
              id={AppTab.DASHBOARD} 
              label="Dashboard" 
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>} 
            />
            <NavItem 
              id={AppTab.ARCHITECTURE} 
              label="Architecture" 
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>} 
            />
            <NavItem 
              id={AppTab.MLOPS} 
              label="MLOps" 
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>} 
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-right">
              <p className="text-xs font-bold text-slate-800">Admin Session</p>
              <p className="text-[10px] text-slate-400 font-mono uppercase">Node #241A</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300" />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full p-4 md:p-8">
        {activeTab === AppTab.DETECTOR && <DetectorView />}
        {activeTab === AppTab.DASHBOARD && <DashboardView />}
        {activeTab === AppTab.ARCHITECTURE && <ArchitectureView />}
        {activeTab === AppTab.MLOPS && <MLOpsView />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>© 2024 SentinelAI Toxicity Systems</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="hover:text-slate-600 cursor-pointer">Security Protocol</span>
          </div>
          <div className="flex gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              API Systems Operational
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
