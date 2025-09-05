import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Euro, User, FileText, Mail, Eye } from 'lucide-react';

interface Location {
	id: string;
	bien: string;
	locataire: string;
	dateDebut: string;
	dateFin: string;
	loyer: number;
	statut: 'active' | 'expirée' | 'renouvelée';
	prochainPaiement: string;
	image: string;
}

interface LocationCardProps {
	location: Location;
	index: number;
	formatCurrency: (amount: number) => string;
	getStatutColor: (statut: string) => string;
}

export const LocationCard: React.FC<LocationCardProps> = ({
	location,
	index,
	formatCurrency,
	getStatutColor
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.1 }}
			className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
		>
			{/* Image du bien */}
			<div className="relative h-48 w-full overflow-hidden">
				<img
					src={location.image}
					alt={location.bien}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					loading="lazy"
				/>
				{/* Overlay gradient */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
				
				{/* Badge de statut */}
				<div className="absolute top-4 right-4">
					<span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getStatutColor(location.statut)}`}>
						{location.statut}
					</span>
				</div>
			</div>

			{/* Contenu de la carte */}
			<div className="p-6">

				{/* Header avec bien et locataire */}
				<div className="mb-6">
					<div className="flex items-center gap-3 mb-3">
						<div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
							<MapPin className="h-5 w-5 text-white" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm text-slate-400 mb-1">Bien immobilier</p>
							<p className="font-semibold text-white truncate">{location.bien}</p>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
							<User className="h-4 w-4 text-white" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm text-slate-400 mb-1">Locataire</p>
							<p className="font-medium text-white truncate">{location.locataire}</p>
						</div>
					</div>
				</div>

				{/* Informations de location */}
				<div className="space-y-4 mb-6">
					{/* Période */}
					<div className="flex items-center gap-3">
						<div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
							<Calendar className="h-4 w-4 text-white" />
						</div>
						<div className="flex-1">
							<p className="text-sm text-slate-400 mb-1">Période de location</p>
							<div className="text-sm text-white">
								<p>Du {new Date(location.dateDebut).toLocaleDateString('fr-FR')}</p>
								<p>Au {new Date(location.dateFin).toLocaleDateString('fr-FR')}</p>
							</div>
						</div>
					</div>

					{/* Loyer */}
					<div className="flex items-center gap-3">
						<div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
							<Euro className="h-4 w-4 text-white" />
						</div>
						<div className="flex-1">
							<p className="text-sm text-slate-400 mb-1">Loyer mensuel</p>
							<p className="text-xl font-bold text-white">{formatCurrency(location.loyer)}</p>
						</div>
					</div>

					{/* Prochain paiement */}
					<div className="flex items-center gap-3">
						<div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
							<Calendar className="h-4 w-4 text-white" />
						</div>
						<div className="flex-1">
							<p className="text-sm text-slate-400 mb-1">Prochain paiement</p>
							<p className="font-medium text-white">
								{new Date(location.prochainPaiement).toLocaleDateString('fr-FR')}
							</p>
						</div>
					</div>
				</div>

				{/* Actions */}
				<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
					<button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all text-sm font-medium">
						<Eye className="h-4 w-4" />
						<span className="hidden sm:inline">Voir détails</span>
						<span className="sm:hidden">Détails</span>
					</button>
					<div className="flex items-center gap-2">
						<button className="flex-1 sm:flex-none inline-flex items-center justify-center p-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all group-hover:scale-110">
							<FileText className="h-4 w-4" />
						</button>
						<button className="flex-1 sm:flex-none inline-flex items-center justify-center p-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all group-hover:scale-110">
							<Mail className="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>

			{/* Effet de brillance au hover */}
			<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
		</motion.div>
	);
};

export default LocationCard;
