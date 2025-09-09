import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
	Settings,
	Menu,
	X,
	ChevronRight
} from 'lucide-react';
import { LocationCard } from '../components/proprietaire/LocationCard';
import { SectionOrnament } from '../components/ui/SectionOrnament';
import { BienCard } from '../components/proprietaire/BienCard';
import { BienFilters } from '../components/proprietaire/BienFilters';
import { SettingsModal } from '../components/proprietaire/SettingsModal';
import { useTheme } from '../contexts/ThemeContext';

interface Bien {
	id: string;
	adresse: string;
	type: 'appartement' | 'maison' | 'bureau' | 'commerce' | 'entrepot';
	statut: 'loué' | 'vacant' | 'maintenance';
	loyer: number;
	locataire?: string;
	dateFinBail?: string;
	occupation: number; // pourcentage
	image: string;
	surface?: number;
	chambres?: number;
	etage?: number;
	description?: string;
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
	image: string;
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
	const { theme } = useTheme();
	const [activeTab, setActiveTab] = useState<'tableau' | 'biens' | 'locations' | 'locataires'>('tableau');
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [settingsOpen, setSettingsOpen] = useState(false);
	
	// États pour les filtres des biens
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedType, setSelectedType] = useState<string | null>(null);
	const [selectedStatut, setSelectedStatut] = useState<string | null>(null);

	// Données simulées
	const biens: Bien[] = [
		{
			id: '1',
			adresse: '123 Rue de la Paix, Conakry',
			type: 'appartement',
			statut: 'loué',
			loyer: 2500000,
			locataire: 'Mamadou Diallo',
			dateFinBail: '2025-06-15',
			occupation: 100,
			image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop&crop=center',
			surface: 85,
			chambres: 3,
			etage: 2,
			description: 'Appartement moderne avec balcon'
		},
		{
			id: '2',
			adresse: '456 Avenue du Commerce, Matoto',
			type: 'maison',
			statut: 'loué',
			loyer: 3500000,
			locataire: 'Fatou Camara',
			dateFinBail: '2025-08-20',
			occupation: 100,
			image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&h=300&fit=crop&crop=center',
			surface: 120,
			chambres: 4,
			description: 'Maison avec jardin privé'
		},
		{
			id: '3',
			adresse: '789 Boulevard de la République',
			type: 'bureau',
			statut: 'vacant',
			loyer: 1800000,
			occupation: 0,
			image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop&crop=center',
			surface: 60,
			etage: 5,
			description: 'Bureau moderne en centre-ville'
		},
		{
			id: '4',
			adresse: '321 Rue des Artisans, Kaloum',
			type: 'appartement',
			statut: 'maintenance',
			loyer: 2000000,
			locataire: 'Ibrahima Bah',
			dateFinBail: '2025-05-10',
			occupation: 75,
			image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=300&fit=crop&crop=center',
			surface: 65,
			chambres: 2,
			etage: 1,
			description: 'Appartement rénové'
		},
		{
			id: '5',
			adresse: '555 Rue du Marché, Dixinn',
			type: 'commerce',
			statut: 'loué',
			loyer: 2200000,
			locataire: 'Aminata Traoré',
			dateFinBail: '2025-12-31',
			occupation: 100,
			image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop&crop=center',
			surface: 45,
			description: 'Local commercial en rez-de-chaussée'
		},
		{
			id: '6',
			adresse: '777 Zone Industrielle, Ratoma',
			type: 'entrepot',
			statut: 'vacant',
			loyer: 1500000,
			occupation: 0,
			image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&h=300&fit=crop&crop=center',
			surface: 200,
			description: 'Entrepôt de stockage'
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
			prochainPaiement: '2024-12-01',
			image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop&crop=center'
		},
		{
			id: '2',
			bien: '456 Avenue du Commerce, Matoto',
			locataire: 'Fatou Camara',
			dateDebut: '2024-08-20',
			dateFin: '2025-08-20',
			loyer: 3500000,
			statut: 'active',
			prochainPaiement: '2024-12-01',
			image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&h=300&fit=crop&crop=center'
		},
		{
			id: '3',
			bien: '321 Rue des Artisans, Kaloum',
			locataire: 'Ibrahima Bah',
			dateDebut: '2024-05-10',
			dateFin: '2025-05-10',
			loyer: 2000000,
			statut: 'active',
			prochainPaiement: '2024-12-01',
			image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=300&fit=crop&crop=center'
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
		if (theme === 'light') {
			switch (statut) {
				case 'loué':
				case 'active':
				case 'actif':
					return 'text-emerald-800 bg-emerald-100 border-emerald-200';
				case 'vacant':
				case 'expirée':
				case 'expiré':
					return 'text-red-800 bg-red-100 border-red-200';
				case 'maintenance':
				case 'en retard':
					return 'text-amber-800 bg-amber-100 border-amber-200';
				default:
					return 'text-gray-800 bg-gray-100 border-gray-200';
			}
		} else {
		switch (statut) {
			case 'loué':
			case 'active':
			case 'actif':
					return 'text-emerald-100 bg-emerald-500/90 border-emerald-400/50';
			case 'vacant':
			case 'expirée':
			case 'expiré':
					return 'text-red-100 bg-red-500/90 border-red-400/50';
			case 'maintenance':
			case 'en retard':
					return 'text-amber-100 bg-amber-500/90 border-amber-400/50';
			default:
					return 'text-slate-100 bg-slate-500/90 border-slate-400/50';
			}
		}
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: 'GNF',
			minimumFractionDigits: 0
		}).format(amount);
	};

	// Logique de filtrage des biens
	const filteredBiens = biens.filter(bien => {
		const matchesSearch = bien.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 bien.description?.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesType = !selectedType || bien.type === selectedType;
		const matchesStatut = !selectedStatut || bien.statut === selectedStatut;
		
		return matchesSearch && matchesType && matchesStatut;
	});

	const navigationItems = [
		{ id: 'tableau', label: 'Tableau de bord', icon: TrendingUp, description: 'Vue d\'ensemble' },
		{ id: 'biens', label: 'Mes Biens', icon: Home, description: 'Gestion des propriétés' },
		{ id: 'locations', label: 'Locations', icon: Calendar, description: 'Contrats de location' },
		{ id: 'locataires', label: 'Locataires', icon: Users, description: 'Gestion des locataires' }
	];

	return (
		<div className={`relative min-h-screen pt-20 transition-colors duration-300`}>
			<SectionOrnament variant="rings" />
			{/* Sidebar Mobile */}
			<AnimatePresence>
				{sidebarOpen && (
					<>
						{/* Overlay pour mobile */}
				<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setSidebarOpen(false)}
							className="fixed inset-0 bg-black/50 z-40 lg:hidden"
						/>
						
						{/* Sidebar Mobile */}
						<motion.aside
							initial={{ x: -320 }}
							animate={{ x: 0 }}
							exit={{ x: -320 }}
							transition={{ type: 'spring', stiffness: 300, damping: 30 }}
							className={`fixed left-0 top-0 h-full w-80 backdrop-blur-xl border-r z-50 lg:hidden ${
								theme === 'dark' 
									? 'bg-slate-900/95 border-white/10' 
									: 'bg-gradient-to-b from-blue-50/95 via-white/95 to-blue-50/95 border-blue-200'
							}`}
						>
							{/* Header Sidebar */}
							<div className={`p-6 border-b ${
								theme === 'dark' ? 'border-white/10' : 'border-blue-200'
							}`}>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center">
											<Building2 className="h-5 w-5" />
						</div>
						<div>
											<h2 className={`text-lg font-bold ${
												theme === 'dark' ? 'text-white' : 'text-blue-900'
											}`}>
												ITCHOH
											</h2>
											<p className={`text-xs ${
												theme === 'dark' ? 'text-slate-400' : 'text-blue-600'
											}`}>
												Espace Propriétaire
											</p>
										</div>
									</div>
									<button
										onClick={() => setSidebarOpen(false)}
										className={`lg:hidden p-2 rounded-lg transition-colors ${
											theme === 'dark'
												? 'hover:bg-white/10 text-slate-400'
												: 'hover:bg-blue-100 text-blue-500'
										}`}
									>
										<X className="h-5 w-5" />
									</button>
						</div>
					</div>

							{/* Navigation */}
							<nav className="p-4 space-y-2">
								{navigationItems.map((item) => (
									<motion.button
										key={item.id}
										onClick={() => {
											setActiveTab(item.id as any);
											setSidebarOpen(false);
										}}
										className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
											activeTab === item.id
												? 'bg-gradient-to-r from-indigo-500/20 to-purple-600/20 text-white border border-indigo-500/30'
										: 'text-slate-400 hover:text-white hover:bg-white/5'
										}`}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<div className={`p-2 rounded-lg transition-colors ${
											activeTab === item.id
												? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
												: 'bg-white/10 text-slate-400 group-hover:bg-white/20 group-hover:text-white'
										}`}>
											<item.icon className="h-4 w-4" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="font-medium truncate">{item.label}</p>
											<p className="text-xs text-slate-500 truncate">{item.description}</p>
										</div>
										{activeTab === item.id && (
											<ChevronRight className="h-4 w-4 text-indigo-400" />
										)}
									</motion.button>
								))}
							</nav>

							{/* Footer Sidebar */}
							<div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
								<div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
									<div className="h-8 w-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
										<Settings className="h-4 w-4 text-white" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-white truncate">Paramètres</p>
										<p className="text-xs text-slate-400">Configuration</p>
									</div>
								</div>
							</div>
						</motion.aside>
					</>
				)}
			</AnimatePresence>

			{/* Main Content */}
			<div className="flex">
				{/* Sidebar Desktop */}
				<aside className={`hidden lg:block w-80 backdrop-blur-xl border-r min-h-screen ${
					theme === 'dark' 
						? 'bg-slate-900/95 border-white/10' 
						: 'bg-gradient-to-b from-blue-50/95 via-white/95 to-blue-50/95 border-blue-200 shadow-lg'
				}`}>
					{/* Header Sidebar */}
					<div className={`p-6 border-b ${
						theme === 'dark' ? 'border-white/10' : 'border-blue-200'
					}`}>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center">
									<Building2 className="h-5 w-5" />
								</div>
								<div>
									<h2 className={`text-lg font-bold ${
										theme === 'dark' ? 'text-white' : 'text-blue-900'
									}`}>
										ITCHOH
									</h2>
									<p className={`text-xs ${
										theme === 'dark' ? 'text-slate-400' : 'text-blue-600'
									}`}>
										Espace Propriétaire
									</p>
								</div>
							</div>
							<button
								onClick={() => setSettingsOpen(true)}
								className={`p-2 rounded-lg transition-colors ${
									theme === 'dark'
										? 'hover:bg-white/10 text-slate-400 hover:text-white'
										: 'hover:bg-blue-100 text-blue-500 hover:text-blue-700'
								}`}
							>
								<Settings className="h-5 w-5" />
							</button>
						</div>
					</div>

					{/* Navigation */}
					<nav className="p-4 space-y-2">
						{navigationItems.map((item) => (
							<motion.button
								key={item.id}
								onClick={() => setActiveTab(item.id as any)}
								className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
									activeTab === item.id
										? 'bg-gradient-to-r from-indigo-500/20 to-purple-600/20 text-white border border-indigo-500/30'
										: theme === 'dark'
											? 'text-slate-400 hover:text-white hover:bg-white/5'
											: 'text-blue-600 hover:text-blue-900 hover:bg-blue-50'
								}`}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<div className={`p-2 rounded-lg transition-colors ${
									activeTab === item.id
										? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
										: theme === 'dark'
											? 'bg-white/10 text-slate-400 group-hover:bg-white/20 group-hover:text-white'
											: 'bg-blue-100 text-blue-500 group-hover:bg-blue-200 group-hover:text-blue-700'
								}`}>
									<item.icon className="h-4 w-4" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="font-medium truncate">{item.label}</p>
									<p className={`text-xs truncate ${
										theme === 'dark' ? 'text-slate-500' : 'text-blue-500'
									}`}>
										{item.description}
									</p>
								</div>
								{activeTab === item.id && (
									<ChevronRight className="h-4 w-4 text-indigo-400" />
								)}
							</motion.button>
						))}
					</nav>

					{/* Footer Sidebar */}
					<div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${
						theme === 'dark' ? 'border-white/10' : 'border-blue-200'
					}`}>
						<button
							onClick={() => setSettingsOpen(true)}
							className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
								theme === 'dark' 
									? 'bg-white/5 hover:bg-white/10' 
									: 'bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200'
							}`}
						>
							<div className="h-8 w-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
								<Settings className="h-4 w-4 text-white" />
							</div>
							<div className="flex-1 min-w-0 text-left">
								<p className={`text-sm font-medium truncate ${
									theme === 'dark' ? 'text-white' : 'text-blue-900'
								}`}>
									Paramètres
								</p>
								<p className={`text-xs ${
									theme === 'dark' ? 'text-slate-400' : 'text-blue-600'
								}`}>
									Configuration
								</p>
							</div>
						</button>
					</div>
				</aside>

				{/* Content Area */}
				<div className="flex-1 flex flex-col">
					{/* Top Header */}
					<header className={`backdrop-blur-sm border-b p-4 lg:p-6 ${
						theme === 'dark' 
							? 'bg-slate-900/50 border-white/10' 
							: 'bg-gradient-to-r from-blue-50/90 via-white/90 to-blue-50/90 border-blue-200 shadow-sm'
					}`}>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								{/* Bouton Hamburger Mobile - Dans la page */}
								<button
									onClick={() => setSidebarOpen(true)}
									className="lg:hidden p-3 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 hover:from-indigo-500/30 hover:to-purple-600/30 transition-all duration-200"
								>
									<Menu className="h-5 w-5 text-indigo-400" />
								</button>
								<div>
									<h1 className={`text-2xl font-bold ${
										theme === 'dark' ? 'text-white' : 'text-blue-900'
									}`}>
										{navigationItems.find(item => item.id === activeTab)?.label}
									</h1>
									<p className={`text-sm ${
										theme === 'dark' ? 'text-slate-400' : 'text-blue-600'
									}`}>
										{navigationItems.find(item => item.id === activeTab)?.description}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
																<button 
									onClick={() => setSettingsOpen(true)}
									className={`p-2 rounded-lg transition-colors ${
										theme === 'dark'
											? 'hover:bg-white/10 text-slate-400'
											: 'hover:bg-blue-100 text-blue-500'
									}`}
								>
									<Settings className="h-5 w-5" />
								</button>
						</div>
					</div>
					</header>

				{/* Content Area */}
				<main className={`flex-1 p-4 lg:p-6 overflow-auto`}>
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
										className={`rounded-xl p-6 backdrop-blur-sm ${
											theme === 'dark'
												? 'bg-white/5 border border-white/10'
												: 'bg-white/80 border border-blue-200 shadow-sm'
										}`}
									>
										<div className="flex items-center justify-between">
											<div>
												<p className={`text-sm ${
													theme === 'dark' ? 'text-slate-400' : 'text-blue-600'
												}`}>
													{stat.title}
												</p>
												<p className={`text-2xl font-bold mt-1 ${
													theme === 'dark' ? 'text-white' : 'text-blue-900'
												}`}>
													{stat.value}
												</p>
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
								<div>
								<h3 className="text-xl font-semibold text-white">Mes Biens Immobiliers</h3>
									<p className="text-sm text-slate-400 mt-1">
										{filteredBiens.length} bien{filteredBiens.length > 1 ? 's' : ''} trouvé{filteredBiens.length > 1 ? 's' : ''}
									</p>
								</div>
								<button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all text-sm">
									<Plus className="h-4 w-4" />
									<span className="hidden sm:inline">Ajouter un bien</span>
									<span className="sm:hidden">Ajouter</span>
								</button>
							</div>

							{/* Filtres et recherche */}
							<BienFilters
								onSearchChange={setSearchTerm}
								onTypeFilter={setSelectedType}
								onStatutFilter={setSelectedStatut}
								searchValue={searchTerm}
								selectedType={selectedType}
								selectedStatut={selectedStatut}
							/>

							{/* Grille de cartes */}
							{filteredBiens.length > 0 ? (
							<div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
									{filteredBiens.map((bien, index) => (
										<BienCard
										key={bien.id}
											bien={bien}
											index={index}
											formatCurrency={formatCurrency}
											getStatutColor={getStatutColor}
										/>
									))}
											</div>
							) : (
								<div className="text-center py-12">
									<div className="h-16 w-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
										<Home className="h-8 w-8 text-slate-400" />
										</div>
									<h4 className="text-lg font-medium text-white mb-2">Aucun bien trouvé</h4>
									<p className="text-slate-400 mb-4">
										{searchTerm || selectedType || selectedStatut
											? 'Essayez de modifier vos critères de recherche'
											: 'Commencez par ajouter votre premier bien'
										}
									</p>
									<button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all text-sm">
										<Plus className="h-4 w-4" />
										Ajouter un bien
									</button>
								</div>
							)}
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

							{/* Grille de cartes de locations */}
							<div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{locations.map((location, index) => (
									<LocationCard
										key={location.id}
										location={location}
										index={index}
										formatCurrency={formatCurrency}
										getStatutColor={getStatutColor}
									/>
								))}
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
				</main>
			</div>
			</div>

			{/* Modale de paramètres */}
			<SettingsModal 
				isOpen={settingsOpen} 
				onClose={() => setSettingsOpen(false)} 
			/>
		</div>
	);
};

export default ProprietairePage;
