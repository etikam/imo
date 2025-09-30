import React, { useState } from 'react';
import { SectionOrnament } from '../components/ui/SectionOrnament';
import { ManagerSidebar } from '../components/gestionnaire/ManagerSidebar';
import { ManagerHeader } from '../components/gestionnaire/ManagerHeader';
import { ManagerDashboard } from '../components/gestionnaire/ManagerDashboard';
import { ManagerBiens } from '../components/gestionnaire/ManagerBiens';
import type { TabKey } from '../components/gestionnaire/types';

export const GestionnairePage: React.FC = () => {
  const [active, setActive] = useState<TabKey>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="relative pt-20">
      <SectionOrnament variant="rings" />
      <div className="relative z-10 min-h-[calc(100vh-5rem)] flex">
        {/* Sidebar */}
        <ManagerSidebar active={active} onSelect={setActive} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <ManagerHeader active={active} setSidebarOpen={setSidebarOpen} />

          <div className="flex-1 overflow-auto">
            {active === 'dashboard' && <ManagerDashboard />}
            {active === 'biens' && <ManagerBiens />}
            {active !== 'dashboard' && (
              <div className="p-6">
                <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-8 text-slate-300">
                  Module en cours: {active}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default GestionnairePage;


