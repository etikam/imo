import React from 'react';
import { BarChart3, FileText, Home, Users, Wrench, Receipt, Bell, Settings } from 'lucide-react';

export type TabKey =
  | 'dashboard'
  | 'biens'
  | 'contrats'
  | 'clients'
  | 'finances'
  | 'maintenance'
  | 'reporting'
  | 'parametres';

export const managerTabs: { key: TabKey; label: string; icon: React.ReactNode; description?: string }[] = [
  { key: 'dashboard', label: 'Tableau de bord', icon: <BarChart3 className="w-4 h-4" />, description: 'Vue d’ensemble' },
  { key: 'biens', label: 'Biens', icon: <Home className="w-4 h-4" />, description: 'Gestion du parc' },
  { key: 'contrats', label: 'Contrats', icon: <FileText className="w-4 h-4" />, description: 'Gestion des contrats' },
  { key: 'clients', label: 'Clients', icon: <Users className="w-4 h-4" />, description: 'Propriétaires et locataires' },
  { key: 'finances', label: 'Finances', icon: <Receipt className="w-4 h-4" />, description: 'Encaissements et impayés' },
  { key: 'maintenance', label: 'Maintenance', icon: <Wrench className="w-4 h-4" />, description: 'Demandes et interventions' },
  { key: 'reporting', label: 'Reporting', icon: <Bell className="w-4 h-4" />, description: 'Rapports et alertes' },
  { key: 'parametres', label: 'Paramètres', icon: <Settings className="w-4 h-4" />, description: 'Configuration' },
];

export const getTabByKey = (key: TabKey) => managerTabs.find(t => t.key === key);



