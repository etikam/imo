import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, Home, Building2, Store, Warehouse } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface BienFiltersProps {
	onSearchChange: (search: string) => void;
	onTypeFilter: (type: string | null) => void;
	onStatutFilter: (statut: string | null) => void;
	searchValue: string;
	selectedType: string | null;
	selectedStatut: string | null;
}

const typeOptions = [
	{ value: 'appartement', label: 'Appartement', icon: Building2 },
	{ value: 'maison', label: 'Maison', icon: Home },
	{ value: 'bureau', label: 'Bureau', icon: Building2 },
	{ value: 'commerce', label: 'Commerce', icon: Store },
	{ value: 'entrepot', label: 'Entrepôt', icon: Warehouse }
];

const statutOptions = [
	{ value: 'loué', label: 'Loué', color: 'text-emerald-500' },
	{ value: 'vacant', label: 'Vacant', color: 'text-red-500' },
	{ value: 'maintenance', label: 'Maintenance', color: 'text-amber-500' }
];

export const BienFilters: React.FC<BienFiltersProps> = ({
	onSearchChange,
	onTypeFilter,
	onStatutFilter,
	searchValue,
	selectedType,
	selectedStatut
}) => {
	const { theme } = useTheme();
	const [showFilters, setShowFilters] = useState(false);

	const clearFilters = () => {
		onSearchChange('');
		onTypeFilter(null);
		onStatutFilter(null);
	};

	const hasActiveFilters = searchValue || selectedType || selectedStatut;

	return (
		<div className="space-y-4">
			{/* Barre de recherche et bouton filtres */}
			<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
				<div className="relative flex-1">
					<Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
						theme === 'dark' ? 'text-slate-400' : 'text-blue-500'
					}`} />
					<input
						type="text"
						placeholder="Rechercher un bien..."
						value={searchValue}
						onChange={(e) => onSearchChange(e.target.value)}
						className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
							theme === 'dark'
								? 'bg-white/10 border-white/20 text-white placeholder-slate-400'
								: 'bg-white/90 border-blue-300 text-blue-900 placeholder-blue-500'
						}`}
					/>
					{searchValue && (
						<button
							onClick={() => onSearchChange('')}
							className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
								theme === 'dark' 
									? 'hover:bg-white/10 text-slate-400' 
									: 'hover:bg-blue-100 text-blue-500'
							}`}
						>
							<X className="h-4 w-4" />
						</button>
					)}
				</div>
				
				<div className="flex items-center gap-2">
					<button 
						onClick={() => setShowFilters(!showFilters)}
						className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
							showFilters || hasActiveFilters
								? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
								: theme === 'dark'
									? 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
									: 'bg-white/90 border border-blue-300 text-blue-700 hover:bg-blue-50'
						}`}
					>
						<Filter className="h-4 w-4" />
						<span className="hidden sm:inline">Filtres</span>
						{hasActiveFilters && (
							<span className="inline-flex items-center justify-center w-5 h-5 bg-white/20 rounded-full text-xs">
								{([searchValue, selectedType, selectedStatut].filter(Boolean)).length}
							</span>
						)}
					</button>
					
					{hasActiveFilters && (
						<button
							onClick={clearFilters}
							className={`inline-flex items-center justify-center gap-2 px-3 py-3 border rounded-xl transition-all text-sm ${
								theme === 'dark'
									? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
									: 'bg-white/90 border-blue-300 text-blue-700 hover:bg-blue-50'
							}`}
						>
							<X className="h-4 w-4" />
							<span className="hidden sm:inline">Effacer</span>
						</button>
					)}
				</div>
			</div>

			{/* Panneau de filtres */}
			<motion.div
				initial={false}
				animate={{ 
					height: showFilters ? 'auto' : 0,
					opacity: showFilters ? 1 : 0
				}}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
				className="overflow-hidden"
			>
				<div className={`border rounded-xl p-4 space-y-4 ${
					theme === 'dark' 
						? 'bg-white/5 border-white/10' 
						: 'bg-white/90 border-blue-200 shadow-sm'
				}`}>
					{/* Filtres par type */}
					<div>
						<h4 className={`text-sm font-medium mb-3 ${
							theme === 'dark' ? 'text-white' : 'text-blue-900'
						}`}>
							Type de bien
						</h4>
						<div className="flex flex-wrap gap-2">
							{typeOptions.map((type) => {
								const Icon = type.icon;
								const isSelected = selectedType === type.value;
								return (
									<button
										key={type.value}
										onClick={() => onTypeFilter(isSelected ? null : type.value)}
										className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
											isSelected
												? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
												: theme === 'dark'
													? 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
													: 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900'
										}`}
									>
										<Icon className="h-4 w-4" />
										{type.label}
									</button>
								);
							})}
						</div>
					</div>

					{/* Filtres par statut */}
					<div>
						<h4 className={`text-sm font-medium mb-3 ${
							theme === 'dark' ? 'text-white' : 'text-blue-900'
						}`}>
							Statut
						</h4>
						<div className="flex flex-wrap gap-2">
							{statutOptions.map((statut) => {
								const isSelected = selectedStatut === statut.value;
								return (
									<button
										key={statut.value}
										onClick={() => onStatutFilter(isSelected ? null : statut.value)}
										className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
											isSelected
												? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
												: theme === 'dark'
													? 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
													: 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900'
										}`}
									>
										<div className={`w-2 h-2 rounded-full ${statut.color.replace('text-', 'bg-')}`} />
										{statut.label}
									</button>
								);
							})}
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default BienFilters;
