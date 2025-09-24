import type { Bien } from './BienTypes';

export const bienSeed: Bien[] = [
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
      { id: 'p1', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=720&fit=crop' }
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
      { id: 'p2', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=720&fit=crop' }
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
      { id: 'p3', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=720&fit=crop' }
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
      { id: 'p4', url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=720&fit=crop' }
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
      { id: 'p5', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=720&fit=crop' }
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
      { id: 'p6', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=720&fit=crop' }
    ],
    plans: [],
    createdAt: '2024-05-18T13:00:00Z',
    updatedAt: '2024-10-28T16:00:00Z'
  }
];







