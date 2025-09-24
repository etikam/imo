import React from 'react';
import { Menu, Settings, Plus, Search } from 'lucide-react';
import { getTabByKey } from './types';
import type { TabKey } from './types';

export const ManagerHeader: React.FC<{
  active: TabKey;
  setSidebarOpen: (v: boolean) => void;
}> = ({ active, setSidebarOpen }) => {
  const tab = getTabByKey(active);
  return (
    <header className="backdrop-blur-sm border-b p-4 lg:p-6 bg-slate-900/50 border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-3 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 hover:from-indigo-500/30 hover:to-purple-600/30 transition-all duration-200"
          >
            <Menu className="h-5 w-5 text-indigo-400" />
          </button>
          {active !== 'biens' && (
            <div>
              <h1 className="text-2xl font-bold text-white">{tab?.label}</h1>
              {tab?.description && <p className="text-sm text-slate-400">{tab.description}</p>}
            </div>
          )}
        </div>
        {active !== 'biens' && (
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 hover:bg-slate-700/80 transition-all">
              <Search className="w-4 h-4" />
              Rechercher
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white border border-indigo-400/30 shadow hover:shadow-lg transition-all">
              <Plus className="w-4 h-4" />
              Nouvelle entrée
            </button>
            <button className="p-2 rounded-lg hover:bg-white/10 text-slate-300 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};


