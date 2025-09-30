import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Archive, Eye, RotateCcw, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Bien } from './BienTypes';

export const BienList: React.FC<{
  items: Bien[];
  onEdit: (bien: Bien) => void;
  onArchive: (bien: Bien) => void;
  mode?: 'actifs' | 'archives';
  onRestore?: (bien: Bien) => void;
  onDelete?: (bien: Bien) => void;
}> = ({ items, onEdit, onArchive, mode = 'actifs', onRestore, onDelete }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-slate-300">Aucun bien pour le moment.</div>
    );
  }
  return (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((bien) => (
        <motion.div
          key={bien.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
        >
          <div className="h-40 bg-slate-800/60">
            {bien.photos[0]?.url && (
              <img src={bien.photos[0].url} alt={bien.adresse} className="w-full h-full object-cover" loading="lazy" />
            )}
          </div>
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between gap-4">
              <h4 className="font-semibold text-white truncate">{bien.adresse}</h4>
              <span className="text-xs text-slate-400">{bien.type}</span>
            </div>
            <div className="text-sm text-slate-300 line-clamp-2">{bien.description}</div>
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-400">{bien.statut}</div>
              <div className="flex items-center gap-2">
                {mode === 'actifs' ? (
                  <>
                    <button onClick={() => onEdit(bien)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => onArchive(bien)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">
                      <Archive className="w-4 h-4" />
                    </button>
                    <Link to={`/gestionnaire/biens/${bien.id}`} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">
                      <Eye className="w-4 h-4" />
                    </Link>
                  </>
                ) : (
                  <>
                    <button onClick={() => onRestore && onRestore(bien)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete && onDelete(bien)} className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};


