import React, { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import type { Bien } from './biens/BienTypes';
import { BienList } from './biens/BienList';
import { BienFormModal } from './biens/BienFormModal';
import { BienFilters } from '../proprietaire/BienFilters';

export const ManagerBiens: React.FC = () => {
  const [items, setItems] = useState<Bien[]>([
    {
      id: 'b-1001',
      adresse: 'Villa moderne avec piscine, Kaloum, Conakry',
      type: 'maison',
      statut: 'loué',
      loyer: 2500000,
      proprietaire: 'Mr. Camara',
      occupation: 100,
      surface: 180,
      chambres: 4,
      etage: 2,
      description: 'Villa lumineuse avec jardin, piscine et garage 2 places.',
      photos: [
        { id: 'p1', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=360&fit=crop' }
      ],
      plans: [],
      createdAt: '2024-10-01T12:00:00Z',
      updatedAt: '2024-11-01T12:00:00Z'
    },
    {
      id: 'b-1002',
      adresse: 'Appartement haut standing, Dixinn, Conakry',
      type: 'appartement',
      statut: 'vacant',
      loyer: 1800000,
      proprietaire: 'Mme. Bah',
      occupation: 0,
      surface: 120,
      chambres: 3,
      etage: 5,
      description: 'Appartement vue mer, résidence sécurisée avec ascenseur.',
      photos: [
        { id: 'p2', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=360&fit=crop' }
      ],
      plans: [],
      createdAt: '2024-09-20T10:00:00Z',
      updatedAt: '2024-11-03T08:00:00Z'
    },
    {
      id: 'b-1003',
      adresse: 'Bureau 120m² centre-ville, Matam',
      type: 'bureau',
      statut: 'loué',
      loyer: 2200000,
      proprietaire: 'Itchoh Group',
      occupation: 100,
      surface: 120,
      etage: 8,
      description: 'Open space + 2 salles de réunion, climatisation centralisée.',
      photos: [
        { id: 'p3', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=360&fit=crop' }
      ],
      plans: [],
      createdAt: '2024-08-12T09:00:00Z',
      updatedAt: '2024-10-30T14:00:00Z'
    },
    {
      id: 'b-1004',
      adresse: 'Studio meublé, Sandervalia',
      type: 'appartement',
      statut: 'maintenance',
      loyer: 1000000,
      proprietaire: 'SCI Sandervalia',
      occupation: 75,
      surface: 45,
      description: 'Studio équipé, proche commodités. Travaux mineurs en cours.',
      photos: [
        { id: 'p4', url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&h=360&fit=crop' }
      ],
      plans: [],
      createdAt: '2024-07-05T11:00:00Z',
      updatedAt: '2024-11-05T11:00:00Z'
    },
    {
      id: 'b-1005',
      adresse: 'Local commercial, Dixinn marché',
      type: 'commerce',
      statut: 'loué',
      loyer: 2200000,
      proprietaire: 'Mme. Sylla',
      occupation: 100,
      surface: 45,
      description: 'Local en rez-de-chaussée, fort passage, vitrine 6m.',
      photos: [
        { id: 'p5', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=360&fit=crop' }
      ],
      plans: [],
      createdAt: '2024-06-01T08:00:00Z',
      updatedAt: '2024-11-02T10:00:00Z'
    },
    {
      id: 'b-1006',
      adresse: 'Entrepôt 200m², Ratoma',
      type: 'entrepot',
      statut: 'vacant',
      loyer: 1500000,
      proprietaire: 'LogiStock SARL',
      occupation: 0,
      surface: 200,
      description: 'Entrepôt sécurisé, accès camions, proximité RN.',
      photos: [
        { id: 'p6', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=360&fit=crop' }
      ],
      plans: [],
      createdAt: '2024-05-18T13:00:00Z',
      updatedAt: '2024-10-28T16:00:00Z'
    }
  ]);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Bien | null>(null);
  const [showArchives, setShowArchives] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatut, setSelectedStatut] = useState<string | null>(null);

  const openCreate = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (bien: Bien) => { setEditing(bien); setFormOpen(true); };

  const onSubmit = () => {
    setFormOpen(false);
    // TODO: Persist via API
  };

  const onArchive = (bien: Bien) => {
    setItems((prev) => prev.map((b) => b.id === bien.id ? { ...b, statut: 'archivé' } as Bien : b));
  };

  const onRestore = (bien: Bien) => {
    setItems((prev) => prev.map((b) => b.id === bien.id ? { ...b, statut: 'vacant' } as Bien : b));
  };

  const onDelete = (bien: Bien) => {
    setItems((prev) => prev.filter((b) => b.id !== bien.id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-400">
          {items.filter(b => b.statut !== 'archivé').length} actifs • {items.filter(b => b.statut === 'archivé').length} archivés
        </p>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowArchives(false)} className={`px-3 py-2 rounded-lg text-sm border ${!showArchives ? 'bg-white/10 text-white border-white/20' : 'bg-white/5 text-slate-300 border-white/10'}`}>Actifs</button>
          <button onClick={() => setShowArchives(true)} className={`px-3 py-2 rounded-lg text-sm border ${showArchives ? 'bg-white/10 text-white border-white/20' : 'bg-white/5 text-slate-300 border-white/10'}`}>Archivés</button>
          <button onClick={openCreate} className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all text-sm">
            <Plus className="h-4 w-4" />
            <span>Ajouter un bien</span>
          </button>
        </div>
      </div>

      {!showArchives && (
        <BienFilters
          onSearchChange={setSearchTerm}
          onTypeFilter={setSelectedType}
          onStatutFilter={setSelectedStatut}
          searchValue={searchTerm}
          selectedType={selectedType}
          selectedStatut={selectedStatut}
        />
      )}

      {!showArchives && (
        <BienList
          items={items.filter(b => b.statut !== 'archivé')
            .filter(b => !searchTerm || b.adresse.toLowerCase().includes(searchTerm.toLowerCase()) || b.description?.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(b => !selectedType || b.type === selectedType)
            .filter(b => !selectedStatut || b.statut === selectedStatut as any)
          }
          onEdit={openEdit}
          onArchive={onArchive}
        />
      )}
      {showArchives && (
        <BienList mode="archives" items={items.filter(b => b.statut === 'archivé')} onEdit={openEdit} onArchive={onArchive} onRestore={onRestore} onDelete={onDelete} />
      )}

      <BienFormModal open={formOpen} initial={editing ?? undefined} onClose={() => setFormOpen(false)} onSubmit={() => onSubmit()} />
    </div>
  );
};


