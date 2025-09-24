import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Settings, X } from 'lucide-react';
import { managerTabs } from './types';
import type { TabKey } from './types';

export const ManagerSidebar: React.FC<{
  active: TabKey;
  onSelect: (key: TabKey) => void;
  theme?: 'light' | 'dark';
  sidebarOpen?: boolean;
  setSidebarOpen?: (v: boolean) => void;
}> = ({ active, onSelect, theme = 'dark', sidebarOpen = false, setSidebarOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen && setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: sidebarOpen ? -320 : 0 }}
        animate={{ x: 0 }}
        exit={{ x: -320 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`$${''} ${
          sidebarOpen ? 'fixed' : 'hidden'
        } lg:block left-0 top-0 h-full lg:h-auto w-80 lg:w-80 backdrop-blur-xl border-r z-50 lg:z-auto lg:relative ${
          theme === 'dark' ? 'bg-slate-900/95 border-white/10' : 'bg-white/95 border-gray-200'
        }`}
      >
        {/* Header */}
        <div className={`p-6 border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>ITCHOH</h2>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Espace Gestionnaire</p>
              </div>
            </div>
            {setSidebarOpen && (
              <button
                onClick={() => setSidebarOpen(false)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  theme === 'dark' ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {managerTabs.map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => {
                onSelect(tab.key);
                setSidebarOpen && setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                active === tab.key
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-600/20 text-white border border-indigo-500/30'
                  : theme === 'dark'
                    ? 'text-slate-400 hover:text-white hover:bg-white/5'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`p-2 rounded-lg transition-colors ${
                active === tab.key
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                  : theme === 'dark'
                    ? 'bg-white/10 text-slate-400 group-hover:bg-white/20 group-hover:text-white'
                    : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-800'
              }`}>
                {tab.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{tab.label}</p>
                {tab.description && <p className="text-xs text-slate-500 truncate">{tab.description}</p>}
              </div>
              {active === 'parametres' && (
                <Settings className="h-4 w-4 text-indigo-400" />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Footer */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
          <div className={`w-full flex items-center gap-3 p-3 rounded-xl ${
            theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'
          }`}>
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <Settings className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className={`text-sm font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Paramètres</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Configuration</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};


