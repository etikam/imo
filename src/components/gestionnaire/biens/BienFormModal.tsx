import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import type { Bien, BienFormData, BienMedia, BienType } from './BienTypes';

const bienTypes: BienType[] = ['appartement', 'maison', 'bureau', 'commerce', 'entrepot', 'terrain'];

export const BienFormModal: React.FC<{
  open: boolean;
  initial?: Partial<Bien>;
  onClose: () => void;
  onSubmit: (data: BienFormData) => void;
}> = ({ open, initial, onClose, onSubmit }) => {
  const [adresse, setAdresse] = useState(initial?.adresse ?? '');
  const [type, setType] = useState<BienType>((initial?.type as BienType) ?? 'appartement');
  const [statut, setStatut] = useState<'loué'|'vacant'|'maintenance'>(
    (initial?.statut as any) ?? 'vacant'
  );
  const [loyer, setLoyer] = useState<number | undefined>(initial?.loyer);
  const [proprietaire, setProprietaire] = useState<string | undefined>(initial?.proprietaire);
  const [surface, setSurface] = useState<number | undefined>(initial?.surface);
  const [chambres, setChambres] = useState<number | undefined>(initial?.chambres);
  const [etage, setEtage] = useState<number | undefined>(initial?.etage);
  const [description, setDescription] = useState<string | undefined>(initial?.description);

  const [photos, setPhotos] = useState<BienMedia[]>(initial?.photos ?? []);
  const [plans, setPlans] = useState<BienMedia[]>(initial?.plans ?? []);

  const photosInput = useRef<HTMLInputElement>(null);
  const plansInput = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList, target: 'photos' | 'plans') => {
    const list: BienMedia[] = Array.from(files).map((f) => ({
      id: `${f.name}-${f.size}-${f.lastModified}`,
      url: URL.createObjectURL(f),
      name: f.name,
      type: f.type,
      size: f.size,
    }));
    if (target === 'photos') setPhotos((prev) => [...prev, ...list]);
    else setPlans((prev) => [...prev, ...list]);
  };

  const submit = () => {
    const data: BienFormData = {
      adresse,
      type,
      statut,
      loyer,
      proprietaire,
      surface,
      chambres,
      etage,
      description,
      photos: [],
      plans: [],
    };
    onSubmit(data);
  };

  return open && typeof document !== 'undefined'
    ? createPortal(
        <div className="fixed inset-0 z-[3000]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(720px,calc(100%-2rem))] rounded-2xl overflow-hidden border border-white/15 bg-slate-950/95 z-[3001]"
          >
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white font-semibold">{initial ? 'Modifier un bien' : 'Nouveau bien'}</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-white">Fermer</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Adresse</label>
                  <input value={adresse} onChange={(e) => setAdresse(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-white">
                    {bienTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Statut</label>
                  <select value={statut} onChange={(e) => setStatut(e.target.value as any)} className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-white">
                    {['loué','vacant','maintenance'].map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Loyer (GNF)</label>
                  <input type="number" value={loyer ?? ''} onChange={(e) => setLoyer(e.target.value ? Number(e.target.value) : undefined)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Propriétaire</label>
                  <input value={proprietaire ?? ''} onChange={(e) => setProprietaire(e.target.value || undefined)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Surface (m²)</label>
                  <input type="number" value={surface ?? ''} onChange={(e) => setSurface(e.target.value ? Number(e.target.value) : undefined)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Chambres</label>
                  <input type="number" value={chambres ?? ''} onChange={(e) => setChambres(e.target.value ? Number(e.target.value) : undefined)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Étage</label>
                  <input type="number" value={etage ?? ''} onChange={(e) => setEtage(e.target.value ? Number(e.target.value) : undefined)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Photos</label>
                <div className="flex gap-3 flex-wrap mb-2">
                  {photos.map((m) => (
                    <div key={m.id} className="w-20 h-20 rounded-lg overflow-hidden border border-white/10">
                      <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <input ref={photosInput} type="file" multiple accept="image/*" className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files, 'photos')} />
                <button onClick={() => photosInput.current?.click()} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm border border-white/10">Ajouter des photos</button>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Plans</label>
                <div className="flex gap-3 flex-wrap mb-2">
                  {plans.map((m) => (
                    <div key={m.id} className="w-20 h-20 rounded-lg overflow-hidden border border-white/10">
                      <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <input ref={plansInput} type="file" multiple accept="image/*,.pdf" className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files, 'plans')} />
                <button onClick={() => plansInput.current?.click()} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm border border-white/10">Ajouter des plans</button>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10">Annuler</button>
              <button onClick={submit} className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white border border-indigo-400/30">Enregistrer</button>
            </div>
          </motion.div>
        </div>,
        document.body
      ) : null;
}


