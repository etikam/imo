import React from 'react';
import { motion } from 'framer-motion';
import { 
	Home, 
	Building2, 
	Warehouse, 
	Store, 
	MapPin, 
	Euro, 
	Users, 
	Calendar,
	Eye,
	Edit,
	Settings,
	TrendingUp,
	AlertCircle,
	CheckCircle
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Bien {
	id: string;
	adresse: string;
	type: 'appartement' | 'maison' | 'bureau' | 'commerce' | 'entrepot';
	statut: 'loué' | 'vacant' | 'maintenance';
	loyer: number;
	locataire?: string;
	dateFinBail?: string;
	occupation: number;
	image: string;
	surface?: number;
	chambres?: number;
	etage?: number;
	description?: string;
}

interface BienCardProps {
	bien: Bien;
	index: number;
	formatCurrency: (amount: number) => string;
	getStatutColor: (statut: string) => string;
}

const getTypeIcon = (type: string) => {
	switch (type) {
		case 'appartement':
			return Building2;
		case 'maison':
			return Home;
		case 'bureau':
			return Building2;
		case 'commerce':
			return Store;
		case 'entrepot':
			return Warehouse;
		default:
			return Home;
	}
};

const getTypeColor = (type: string) => {
	switch (type) {
		case 'appartement':
			return 'from-blue-500 to-blue-600';
		case 'maison':
			return 'from-emerald-500 to-emerald-600';
		case 'bureau':
			return 'from-purple-500 to-purple-600';
		case 'commerce':
			return 'from-orange-500 to-orange-600';
		case 'entrepot':
			return 'from-slate-500 to-slate-600';
		default:
			return 'from-indigo-500 to-purple-600';
	}
};

const getTypeLabel = (type: string) => {
	switch (type) {
		case 'appartement':
			return 'Appartement';
		case 'maison':
			return 'Maison';
		case 'bureau':
			return 'Bureau';
		case 'commerce':
			return 'Commerce';
		case 'entrepot':
			return 'Entrepôt';
		default:
			return 'Bien';
	}
};

export const BienCard: React.FC<BienCardProps> = ({
	bien,
	index,
	formatCurrency,
	getStatutColor
}) => {
	const { theme } = useTheme();
	const TypeIcon = getTypeIcon(bien.type);
	const typeColor = getTypeColor(bien.type);
	const typeLabel = getTypeLabel(bien.type);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.1 }}
			className={`group relative rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 ${
				theme === 'dark'
					? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
					: 'bg-white/90 border border-blue-200 hover:bg-blue-50/80 hover:border-blue-300 shadow-sm hover:shadow-lg shadow-blue-100'
			}`}
		>
			{/* Image du bien */}
			<div className="relative h-48 w-full overflow-hidden">
				<img
					src={bien.image}
					alt={bien.adresse}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					loading="lazy"
				/>
				{/* Overlay gradient */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
				
				{/* Badge de statut */}
				<div className="absolute top-4 right-4">
					<span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border shadow-lg ${getStatutColor(bien.statut)}`}>
						{bien.statut === 'loué' && <CheckCircle className="h-3 w-3" />}
						{bien.statut === 'vacant' && <AlertCircle className="h-3 w-3" />}
						{bien.statut === 'maintenance' && <Settings className="h-3 w-3" />}
						{bien.statut}
					</span>
				</div>

				{/* Badge de type */}
				<div className="absolute top-4 left-4">
					<span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-gradient-to-r ${typeColor} text-white`}>
						<TypeIcon className="h-3 w-3" />
						{typeLabel}
					</span>
				</div>
			</div>

			{/* Contenu de la carte */}
			<div className="p-6">
				{/* Header avec type et adresse */}
				<div className="mb-4">
					<div className="flex items-center gap-3 mb-2">
						<div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${typeColor} flex items-center justify-center`}>
							<TypeIcon className="h-5 w-5 text-white" />
						</div>
						<div className="flex-1 min-w-0">
							<p className={`text-sm mb-1 ${
								theme === 'dark' ? 'text-slate-400' : 'text-blue-600'
							}`}>
								Type de bien
							</p>
							<p className={`font-semibold truncate ${
								theme === 'dark' ? 'text-white' : 'text-blue-900'
							}`}>
								{typeLabel}
							</p>
						</div>
					</div>
					
					<div className="flex items-center gap-2">
						<MapPin className={`h-4 w-4 ${
							theme === 'dark' ? 'text-slate-400' : 'text-blue-500'
						}`} />
						<p className={`font-medium text-sm leading-relaxed ${
							theme === 'dark' ? 'text-white' : 'text-blue-800'
						}`}>
							{bien.adresse}
						</p>
					</div>
				</div>

				{/* Informations spécifiques au type */}
				<div className="mb-4">
					<div className={`flex items-center gap-4 text-sm ${
						theme === 'dark' ? 'text-slate-300' : 'text-blue-600'
					}`}>
						{bien.surface && (
							<div className="flex items-center gap-1">
								<span className={theme === 'dark' ? 'text-slate-400' : 'text-blue-500'}>Surface:</span>
								<span className={`font-medium ${
									theme === 'dark' ? 'text-white' : 'text-blue-800'
								}`}>
									{bien.surface}m²
								</span>
							</div>
						)}
						{bien.chambres && (
							<div className="flex items-center gap-1">
								<span className={theme === 'dark' ? 'text-slate-400' : 'text-blue-500'}>Chambres:</span>
								<span className={`font-medium ${
									theme === 'dark' ? 'text-white' : 'text-blue-800'
								}`}>
									{bien.chambres}
								</span>
							</div>
						)}
						{bien.etage && (
							<div className="flex items-center gap-1">
								<span className={theme === 'dark' ? 'text-slate-400' : 'text-blue-500'}>Étage:</span>
								<span className={`font-medium ${
									theme === 'dark' ? 'text-white' : 'text-blue-800'
								}`}>
									{bien.etage}
								</span>
							</div>
						)}
					</div>
				</div>

				{/* Loyer */}
				<div className="mb-4">
					<div className="flex items-center gap-3">
						<div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
							<Euro className="h-4 w-4 text-white" />
						</div>
						<div className="flex-1">
							<p className={`text-sm mb-1 ${
								theme === 'dark' ? 'text-slate-400' : 'text-blue-600'
							}`}>
								Loyer mensuel
							</p>
							<p className={`text-xl font-bold ${
								theme === 'dark' ? 'text-white' : 'text-blue-900'
							}`}>
								{formatCurrency(bien.loyer)}
							</p>
						</div>
					</div>
				</div>

				{/* Occupation */}
				<div className="mb-4">
					<div className="flex items-center justify-between mb-2">
						<p className={`text-sm ${
							theme === 'dark' ? 'text-slate-400' : 'text-blue-600'
						}`}>
							Taux d'occupation
						</p>
						<p className={`text-sm font-medium ${
							theme === 'dark' ? 'text-white' : 'text-blue-800'
						}`}>
							{bien.occupation}%
						</p>
					</div>
					<div className={`w-full rounded-full h-2 ${
						theme === 'dark' ? 'bg-white/10' : 'bg-blue-200'
					}`}>
						<div 
							className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
							style={{ width: `${bien.occupation}%` }}
						/>
					</div>
				</div>

				{/* Informations locataire - Toujours présent pour maintenir l'équilibre */}
				<div className={`mb-6 p-4 rounded-xl border min-h-[100px] ${
					theme === 'dark' 
						? 'bg-white/5 border-white/10' 
						: 'bg-blue-50/80 border-blue-200'
				}`}>
					{bien.locataire ? (
						<>
							<div className="flex items-center gap-3 mb-2">
								<Users className={`h-4 w-4 ${
									theme === 'dark' ? 'text-slate-400' : 'text-blue-500'
								}`} />
								<p className={`text-sm ${
									theme === 'dark' ? 'text-slate-400' : 'text-blue-600'
								}`}>
									Locataire actuel
								</p>
							</div>
							<p className={`font-medium ${
								theme === 'dark' ? 'text-white' : 'text-blue-800'
							}`}>
								{bien.locataire}
							</p>
							{bien.dateFinBail && (
								<div className="flex items-center gap-2 mt-2">
									<Calendar className={`h-3 w-3 ${
										theme === 'dark' ? 'text-slate-400' : 'text-blue-500'
									}`} />
									<p className={`text-xs ${
										theme === 'dark' ? 'text-slate-400' : 'text-blue-600'
									}`}>
										Bail jusqu'au {new Date(bien.dateFinBail).toLocaleDateString('fr-FR')}
									</p>
								</div>
							)}
						</>
					) : (
						<div className="flex flex-col items-center justify-center h-full text-center">
							<div className={`h-8 w-8 rounded-full flex items-center justify-center mb-2 ${
								theme === 'dark' ? 'bg-slate-500/20' : 'bg-blue-200'
							}`}>
								<Users className={`h-4 w-4 ${
									theme === 'dark' ? 'text-slate-500' : 'text-blue-500'
								}`} />
							</div>
							<p className={`text-sm font-medium ${
								theme === 'dark' ? 'text-slate-500' : 'text-blue-600'
							}`}>
								Aucun locataire
							</p>
							<p className={`text-xs mt-1 ${
								theme === 'dark' ? 'text-slate-600' : 'text-blue-500'
							}`}>
								Bien disponible
							</p>
						</div>
					)}
				</div>

				{/* Actions */}
				<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
					<button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all text-sm font-medium">
						<Eye className="h-4 w-4" />
						<span className="hidden sm:inline">Voir détails</span>
						<span className="sm:hidden">Détails</span>
					</button>
					<div className="flex items-center gap-2">
						<button className={`flex-1 sm:flex-none inline-flex items-center justify-center p-2 border rounded-xl transition-all group-hover:scale-110 ${
							theme === 'dark'
								? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
								: 'bg-blue-100 border-blue-200 text-blue-600 hover:bg-blue-200'
						}`}>
							<Edit className="h-4 w-4" />
						</button>
						<button className={`flex-1 sm:flex-none inline-flex items-center justify-center p-2 border rounded-xl transition-all group-hover:scale-110 ${
							theme === 'dark'
								? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
								: 'bg-blue-100 border-blue-200 text-blue-600 hover:bg-blue-200'
						}`}>
							<Settings className="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>

			{/* Effet de brillance au hover */}
			<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
		</motion.div>
	);
};

export default BienCard;
