import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
	Building2, 
	Home, 
	Users, 
	Calendar,
	MapPin,
	Euro,
	TrendingUp,
	AlertCircle,
	CheckCircle,
	Clock,
	Eye,
	Edit,
	Plus,
	Search,
	Filter,
	Download,
	Mail,
	Phone,
	FileText,
	Settings
} from 'lucide-react';

interface Bien {
	id: string;
	adresse: string;
	type: string;
	statut: 'loué' | 'vacant' | 'maintenance';
	loyer: number;
	locataire?: string;
	dateFinBail?: string;
	occupation: number; // pourcentage
}

interface Location {
	id: string;
	bien: string;
	locataire: string;
	dateDebut: string;
	dateFin: string;
	loyer: number;
	statut: 'active' | 'expirée' | 'renouvelée';
	prochainPaiement: string;
}

interface Locataire {
	id: string;
	nom: string;
	email: string;
	telephone: string;
	bien: string;
	dateEntree: string;
	statut: 'actif' | 'en retard' | 'expiré';
	dernierPaiement: string;
}

export const ProprietairePage: React.FC = () => {
	const [activeTab, setActiveTab] = useState<'tableau' | 'biens' | 'locations' | 'locataires'>('tableau');

	// Données simulées
	const biens: Bien[] = [
		{
			id: '1',
			adresse: '123 Rue de la Paix, Conakry',
			type: 'Appartement 3 pièces',
			statut: 'loué',
			loyer: 2500000,
			locataire: 'Mamadou Diallo',
			dateFinBail: '2025-06-15',
			occupation: 100
		},
		{
			id: '2',
			adresse: '456 Avenue du Commerce, Matoto',
			type: 'Maison 4 pièces',
			statut: 'loué',
			loyer: 3500000,
			locataire: 'Fatou Camara',
			dateFinBail: '2025-08-20',
			occupation: 100
		},
		{
			id: '3',
			adresse: '789 Boulevard de la République',
			type: 'Bureau 2 pièces',
			statut: 'vacant',
			loyer: 1800000,
			occupation: 0
		},
		{
			id: '4',
			adresse: '321 Rue des Artisans, Kaloum',
			type: 'Appartement 2 pièces',
			statut: 'maintenance',
			loyer: 2000000,
			locataire: 'Ibrahima Bah',
			dateFinBail: '2025-05-10',
			occupation: 75
		}
	];

	const locations: Location[] = [
		{
			id: '1',
			bien: '123 Rue de la Paix, Conakry',
			locataire: 'Mamadou Diallo',
			dateDebut: '2024-06-15',
			dateFin: '2025-06-15',
			loyer: 2500000,
			statut: 'active',
			prochainPaiement: '2024-12-01'
		},
		{
			id: '2',
			bien: '456 Avenue du Commerce, Matoto',
			locataire: 'Fatou Camara',
			dateDebut: '2024-08-20',
			dateFin: '2025-08-20',
			loyer: 3500000,
			statut: 'active',
			prochainPaiement: '2024-12-01'
		},
		{
			id: '3',
			bien: '321 Rue des Artisans, Kaloum',
			locataire: 'Ibrahima Bah',
			dateDebut: '2024-05-10',
			dateFin: '2025-05-10',
			loyer: 2000000,
			statut: 'active',
			prochainPaiement: '2024-12-01'
		}
	];

	const locataires: Locataire[] = [
		{
			id: '1',
			nom: 'Mamadou Diallo',
			email: 'mamadou.diallo@email.com',
			telephone: '+224 612345678',
			bien: '123 Rue de la Paix, Conakry',
			dateEntree: '2024-06-15',
			statut: 'actif',
			dernierPaiement: '2024-11-01'
		},
		{
			id: '2',
			nom: 'Fatou Camara',
			email: 'fatou.camara@email.com',
			telephone: '+224 623456789',
			bien: '456 Avenue du Commerce, Matoto',
			dateEntree: '2024-08-20',
			statut: 'actif',
			dernierPaiement: '2024-11-01'
		},
		{
			id: '3',
			nom: 'Ibrahima Bah',
			email: 'ibrahima.bah@email.com',
			telephone: '+224 634567890',
			bien: '321 Rue des Artisans, Kaloum',
			dateEntree: '2024-05-10',
			statut: 'en retard',
			dernierPaiement: '2024-10-01'
		}
	];

	const stats = {
		totalBiens: biens.length,
		biensLoues: biens.filter(b => b.statut === 'loué').length,
		revenusMensuels: biens.filter(b => b.statut === 'loué').reduce((sum, b) => sum + b.loyer, 0),
		tauxOccupation: Math.round(biens.reduce((sum, b) => sum + b.occupation, 0) / biens.length)
	};

	const getStatutColor = (statut: string) => {
		switch (statut) {
			case 'loué':
			case 'active':
			case 'actif':
				return 'text-emerald-500 bg-emerald-500/10';
			case 'vacant':
			case 'expirée':
			case 'expiré':
				return 'text-red-500 bg-red-500/10';
			case 'maintenance':
			case 'en retard':
				return 'text-amber-500 bg-amber-500/10';
			default:
				return 'text-slate-500 bg-slate-500/10';
		}
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: 'GNF',
			minimumFractionDigits: 0
		}).format(amount);
	};

	return (
		<div className="bg-slate-950 min-h-screen">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-8"
				>
					<div className="flex items-center gap-3 mb-4">
						<div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center">
							<Building2 className="h-6 w-6" />
						</div>
						<div>
							<h1 className="text-3xl font-bold text-white">Espace Propriétaire</h1>
							<p className="text-slate-400">Gérez vos biens et suivez vos locations</p>
						</div>
					</div>
				</motion.div>

				{/* Navigation Tabs */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="mb-8"
				>
					{/* Desktop Tabs */}
					<div className="hidden md:flex space-x-1 bg-white/5 rounded-xl p-1 backdrop-blur-sm">
						{[
							{ id: 'tableau', label: 'Tableau de bord', icon: TrendingUp },
							{ id: 'biens', label: 'Mes Biens', icon: Home },
							{ id: 'locations', label: 'Locations', icon: Calendar },
							{ id: 'locataires', label: 'Locataires', icon: Users }
						].map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id as any)}
								className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
									activeTab === tab.id
										? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
										: 'text-slate-400 hover:text-white hover:bg-white/5'
								}`}
							>
								<tab.icon className="h-4 w-4" />
								{tab.label}
							</button>
						))}
					</div>

					{/* Mobile Tabs - Scrollable */}
					<div className="md:hidden">
						<div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
							{[
								{ id: 'tableau', label: 'Tableau', icon: TrendingUp },
								{ id: 'biens', label: 'Biens', icon: Home },
								{ id: 'locations', label: 'Locations', icon: Calendar },
								{ id: 'locataires', label: 'Locataires', icon: Users }
							].map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id as any)}
									className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
										activeTab === tab.id
											? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
											: 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
									}`}
								>
									<tab.icon className="h-4 w-4" />
									{tab.label}
								</button>
							))}
						</div>
					</div>
				</motion.div>

				{/* Content */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					{/* Tableau de bord */}
					{activeTab === 'tableau' && (
						<div className="space-y-8">
							{/* Stats Cards */}
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
								{[
									{
										title: 'Total Biens',
										value: stats.totalBiens,
										icon: Home,
										color: 'from-blue-500 to-blue-600'
									},
									{
										title: 'Biens Loués',
										value: stats.biensLoues,
										icon: CheckCircle,
										color: 'from-emerald-500 to-emerald-600'
									},
									{
										title: 'Revenus Mensuels',
										value: formatCurrency(stats.revenusMensuels),
										icon: Euro,
										color: 'from-purple-500 to-purple-600'
									},
									{
										title: 'Taux d\'Occupation',
										value: `${stats.tauxOccupation}%`,
										icon: TrendingUp,
										color: 'from-orange-500 to-orange-600'
									}
								].map((stat, index) => (
									<motion.div
										key={stat.title}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.1 * index }}
										className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
									>
										<div className="flex items-center justify-between">
											<div>
												<p className="text-slate-400 text-sm">{stat.title}</p>
												<p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
											</div>
											<div className={`h-12 w-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
												<stat.icon className="h-6 w-6 text-white" />
											</div>
										</div>
									</motion.div>
								))}
							</div>

							{/* Biens récents */}
							<div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
								<div className="flex items-center justify-between mb-6">
									<h3 className="text-xl font-semibold text-white">Biens Récents</h3>
									<button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
										Voir tout
									</button>
								</div>
								<div className="space-y-4">
									{biens.slice(0, 3).map((bien) => (
										<div key={bien.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
											<div className="flex items-center gap-4">
												<div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
													<Home className="h-5 w-5 text-white" />
												</div>
												<div>
													<p className="font-medium text-white">{bien.adresse}</p>
													<p className="text-sm text-slate-400">{bien.type}</p>
												</div>
											</div>
											<div className="text-right">
												<p className="font-semibold text-white">{formatCurrency(bien.loyer)}</p>
												<span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(bien.statut)}`}>
													{bien.statut}
												</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Mes Biens */}
					{activeTab === 'biens' && (
						<div className="space-y-6">
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
								<h3 className="text-xl font-semibold text-white">Mes Biens Immobiliers</h3>
								<button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all text-sm">
									<Plus className="h-4 w-4" />
									<span className="hidden sm:inline">Ajouter un bien</span>
									<span className="sm:hidden">Ajouter</span>
								</button>
							</div>

							{/* Barre de recherche et filtres */}
							<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
								<div className="relative flex-1">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
									<input
										type="text"
										placeholder="Rechercher un bien..."
										className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
									/>
								</div>
								<button className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all text-sm">
									<Filter className="h-4 w-4" />
									<span className="hidden sm:inline">Filtres</span>
									<span className="sm:hidden">Filtrer</span>
								</button>
							</div>

							{/* Grille de cartes */}
							<div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{biens.map((bien, index) => (
									<motion.div
										key={bien.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
										className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
									>
										{/* Badge de statut */}
										<div className="absolute top-4 right-4">
											<span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatutColor(bien.statut)}`}>
												{bien.statut}
											</span>
										</div>

										{/* Icône et type */}
										<div className="flex items-center gap-3 mb-4">
											<div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
												<Home className="h-6 w-6 text-white" />
											</div>
											<div>
												<p className="text-sm text-slate-400">Type</p>
												<p className="font-semibold text-white">{bien.type}</p>
											</div>
										</div>

										{/* Adresse */}
										<div className="mb-4">
											<p className="text-sm text-slate-400 mb-1">Adresse</p>
											<p className="font-medium text-white leading-relaxed">{bien.adresse}</p>
										</div>

										{/* Loyer */}
										<div className="mb-4">
											<p className="text-sm text-slate-400 mb-1">Loyer mensuel</p>
											<p className="text-2xl font-bold text-white">{formatCurrency(bien.loyer)}</p>
										</div>

										{/* Occupation */}
										<div className="mb-6">
											<div className="flex items-center justify-between mb-2">
												<p className="text-sm text-slate-400">Taux d'occupation</p>
												<p className="text-sm font-medium text-white">{bien.occupation}%</p>
											</div>
											<div className="w-full bg-white/10 rounded-full h-2">
												<div 
													className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
													style={{ width: `${bien.occupation}%` }}
												/>
											</div>
										</div>

										{/* Informations locataire */}
										{bien.locataire && (
											<div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
												<p className="text-sm text-slate-400 mb-1">Locataire actuel</p>
												<p className="font-medium text-white">{bien.locataire}</p>
												{bien.dateFinBail && (
													<p className="text-xs text-slate-400 mt-1">
														Bail jusqu'au {new Date(bien.dateFinBail).toLocaleDateString('fr-FR')}
													</p>
												)}
											</div>
										)}

										{/* Actions */}
										<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
											<button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all text-sm font-medium">
												<Eye className="h-4 w-4" />
												<span className="hidden sm:inline">Voir détails</span>
												<span className="sm:hidden">Détails</span>
											</button>
											<div className="flex items-center gap-2">
												<button className="flex-1 sm:flex-none inline-flex items-center justify-center p-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all group-hover:scale-110">
													<Edit className="h-4 w-4" />
												</button>
												<button className="flex-1 sm:flex-none inline-flex items-center justify-center p-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all group-hover:scale-110">
													<Settings className="h-4 w-4" />
												</button>
											</div>
										</div>

										{/* Effet de brillance au hover */}
										<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
									</motion.div>
								))}
							</div>
						</div>
					)}

					{/* Locations */}
					{activeTab === 'locations' && (
						<div className="space-y-6">
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
								<h3 className="text-xl font-semibold text-white">Gestion des Locations</h3>
								<button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all text-sm">
									<Plus className="h-4 w-4" />
									<span className="hidden sm:inline">Nouvelle Location</span>
									<span className="sm:hidden">Nouvelle</span>
								</button>
							</div>

							<div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
								<div className="overflow-x-auto scrollbar-hide">
									<table className="w-full min-w-[800px]">
										<thead className="bg-white/5">
											<tr>
												<th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Bien</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Locataire</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Période</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Loyer</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Statut</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Prochain Paiement</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-white/10">
											{locations.map((location) => (
												<tr key={location.id} className="hover:bg-white/5 transition-colors">
													<td className="px-6 py-4">
														<p className="font-medium text-white">{location.bien}</p>
													</td>
													<td className="px-6 py-4">
														<div>
															<p className="text-white">{location.locataire}</p>
														</div>
													</td>
													<td className="px-6 py-4 text-slate-300">
														<div>
															<p className="text-sm">Du {new Date(location.dateDebut).toLocaleDateString('fr-FR')}</p>
															<p className="text-sm">Au {new Date(location.dateFin).toLocaleDateString('fr-FR')}</p>
														</div>
													</td>
													<td className="px-6 py-4 text-white font-medium">{formatCurrency(location.loyer)}</td>
													<td className="px-6 py-4">
														<span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(location.statut)}`}>
															{location.statut}
														</span>
													</td>
													<td className="px-6 py-4 text-slate-300">
														{new Date(location.prochainPaiement).toLocaleDateString('fr-FR')}
													</td>
													<td className="px-6 py-4">
														<div className="flex items-center gap-2">
															<button className="p-1 text-slate-400 hover:text-white transition-colors">
																<Eye className="h-4 w-4" />
															</button>
															<button className="p-1 text-slate-400 hover:text-white transition-colors">
																<FileText className="h-4 w-4" />
															</button>
															<button className="p-1 text-slate-400 hover:text-white transition-colors">
																<Mail className="h-4 w-4" />
															</button>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					)}

					{/* Locataires */}
					{activeTab === 'locataires' && (
						<div className="space-y-6">
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
								<h3 className="text-xl font-semibold text-white">Mes Locataires</h3>
								<button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all text-sm">
									<Plus className="h-4 w-4" />
									<span className="hidden sm:inline">Ajouter Locataire</span>
									<span className="sm:hidden">Ajouter</span>
								</button>
							</div>

							<div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{locataires.map((locataire) => (
									<motion.div
										key={locataire.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
									>
										<div className="flex items-start justify-between mb-4">
											<div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
												<Users className="h-6 w-6 text-white" />
											</div>
											<span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(locataire.statut)}`}>
												{locataire.statut}
											</span>
										</div>

										<h4 className="text-lg font-semibold text-white mb-2">{locataire.nom}</h4>
										<p className="text-slate-400 text-sm mb-4">{locataire.bien}</p>

										<div className="space-y-3 mb-6">
											<div className="flex items-center gap-3 text-sm">
												<Mail className="h-4 w-4 text-slate-400" />
												<span className="text-slate-300">{locataire.email}</span>
											</div>
											<div className="flex items-center gap-3 text-sm">
												<Phone className="h-4 w-4 text-slate-400" />
												<span className="text-slate-300">{locataire.telephone}</span>
											</div>
											<div className="flex items-center gap-3 text-sm">
												<Calendar className="h-4 w-4 text-slate-400" />
												<span className="text-slate-300">Entrée: {new Date(locataire.dateEntree).toLocaleDateString('fr-FR')}</span>
											</div>
											<div className="flex items-center gap-3 text-sm">
												<Clock className="h-4 w-4 text-slate-400" />
												<span className="text-slate-300">Dernier paiement: {new Date(locataire.dernierPaiement).toLocaleDateString('fr-FR')}</span>
											</div>
										</div>

										<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
											<button className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all text-sm">
												<Mail className="h-4 w-4" />
												<span className="hidden sm:inline">Contacter</span>
												<span className="sm:hidden">Contact</span>
											</button>
											<button className="inline-flex items-center justify-center p-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all">
												<Eye className="h-4 w-4" />
											</button>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					)}
				</motion.div>
			</div>
		</div>
	);
};

export default ProprietairePage;
