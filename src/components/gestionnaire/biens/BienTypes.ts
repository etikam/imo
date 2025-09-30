export type BienType = 'appartement' | 'maison' | 'bureau' | 'commerce' | 'entrepot' | 'terrain';
export type BienStatut = 'loué' | 'vacant' | 'maintenance' | 'archivé';

export interface BienMedia {
  id: string;
  url: string; // object URL ou url distante
  name?: string;
  type?: string;
  size?: number;
}

export interface Bien {
  id: string;
  adresse: string;
  type: BienType;
  statut: BienStatut;
  loyer?: number;
  proprietaire?: string;
  occupation?: number; // %
  surface?: number;
  chambres?: number;
  etage?: number;
  description?: string;
  photos: BienMedia[];
  plans: BienMedia[];
  createdAt: string;
  updatedAt: string;
}

export interface BienFormData {
  adresse: string;
  type: BienType;
  statut: Exclude<BienStatut, 'archivé'>;
  loyer?: number;
  proprietaire?: string;
  surface?: number;
  chambres?: number;
  etage?: number;
  description?: string;
  photos: File[];
  plans: File[];
}








