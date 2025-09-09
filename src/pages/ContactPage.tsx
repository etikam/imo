import React, { useState } from 'react';
import { SectionOrnament } from '../components/ui/SectionOrnament';
import { motion } from 'framer-motion';
import { 
	Building2, 
	Phone, 
	Mail, 
	MapPin, 
	MessageSquare, 
	CheckCircle,
	ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface FormData {
	nom: string;
	prenom: string;
	email: string;
	telephone: string;
	adresse: string;
	ville: string;
	typeBien: string;
	nombreBiens: string;
	message: string;
}

export const ContactPage: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		nom: '',
		prenom: '',
		email: '',
		telephone: '',
		adresse: '',
		ville: '',
		typeBien: '',
		nombreBiens: '',
		message: ''
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		
		// Simuler l'envoi
		await new Promise(resolve => setTimeout(resolve, 2000));
		
		setIsSubmitting(false);
		setIsSubmitted(true);
	};

	if (isSubmitted) {
		return (
			<div className="relative min-h-screen flex items-center justify-center px-4 pt-24">
				<SectionOrnament variant="corners" />
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className="max-w-md w-full text-center"
				>
					<div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
						<CheckCircle className="h-16 w-16 text-emerald-400 mx-auto mb-6" />
						<h2 className="text-2xl font-bold text-white mb-4">Message envoyé !</h2>
						<p className="text-slate-300 mb-6">
							Merci pour votre intérêt. Notre équipe vous contactera dans les plus brefs délais pour organiser la gestion de vos biens.
						</p>
						<Link
							to="/"
							className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
						>
							<ArrowLeft className="h-4 w-4" />
							Retour à l'accueil
						</Link>
					</div>
				</motion.div>
			</div>
		);
	}

	return (
		<div className="relative">
			<SectionOrnament variant="corners" />
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
				{/* Titre */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center mb-12"
				>
					<div className="inline-flex items-center gap-3 mb-4">
						<div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center">
							<Building2 className="h-6 w-6" />
						</div>
						<h1 className="text-3xl md:text-4xl font-bold text-white">
							Devenez Partenaire
						</h1>
					</div>
					<p className="text-xl text-slate-300 max-w-2xl mx-auto">
						Confiez-nous la gestion de vos biens immobiliers. Notre équipe vous accompagne pour optimiser vos revenus locatifs.
					</p>
				</motion.div>

				<div className="grid gap-8 lg:grid-cols-3">
					{/* Informations */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.1 }}
						className="lg:col-span-1"
					>
						<div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
							<h3 className="text-xl font-semibold text-white mb-6">Pourquoi nous choisir ?</h3>
							
							<div className="space-y-6">
								<div className="flex items-start gap-3">
									<div className="h-8 w-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
										<CheckCircle className="h-4 w-4" />
									</div>
									<div>
										<h4 className="font-medium text-white mb-1">Gestion complète</h4>
										<p className="text-sm text-slate-400">De la recherche de locataires à l'entretien</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<div className="h-8 w-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
										<CheckCircle className="h-4 w-4" />
									</div>
									<div>
										<h4 className="font-medium text-white mb-1">Optimisation des revenus</h4>
										<p className="text-sm text-slate-400">Tarifs adaptés au marché local</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<div className="h-8 w-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
										<CheckCircle className="h-4 w-4" />
									</div>
									<div>
										<h4 className="font-medium text-white mb-1">Suivi personnalisé</h4>
										<p className="text-sm text-slate-400">Rapports détaillés et transparence</p>
									</div>
								</div>
							</div>

							<div className="mt-8 pt-6 border-t border-white/10">
								<h4 className="font-medium text-white mb-4">Nos coordonnées</h4>
								<div className="space-y-3 text-sm">
									<div className="flex items-center gap-3 text-slate-300">
										<MapPin className="h-4 w-4 text-indigo-400" />
										<span>Matoto, Conakry, Guinée</span>
									</div>
									<div className="flex items-center gap-3 text-slate-300">
										<Phone className="h-4 w-4 text-indigo-400" />
										<span>+224 627613835</span>
									</div>
									<div className="flex items-center gap-3 text-slate-300">
										<Mail className="h-4 w-4 text-indigo-400" />
										<span>contact@itchoh.com</span>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Formulaire */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2 }}
						className="lg:col-span-2"
					>
						<form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<label className="block text-sm font-medium text-white mb-2">
										Nom *
									</label>
									<input
										type="text"
										name="nom"
										value={formData.nom}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
										placeholder="Votre nom"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-white mb-2">
										Prénom *
									</label>
									<input
										type="text"
										name="prenom"
										value={formData.prenom}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
										placeholder="Votre prénom"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-white mb-2">
										Email *
									</label>
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
										placeholder="votre@email.com"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-white mb-2">
										Téléphone *
									</label>
									<input
										type="tel"
										name="telephone"
										value={formData.telephone}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
										placeholder="+224 XXX XXX XXX"
									/>
								</div>

								<div className="md:col-span-2">
									<label className="block text-sm font-medium text-white mb-2">
										Adresse *
									</label>
									<input
										type="text"
										name="adresse"
										value={formData.adresse}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
										placeholder="Adresse complète"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-white mb-2">
										Ville *
									</label>
									<input
										type="text"
										name="ville"
										value={formData.ville}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
										placeholder="Conakry"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-white mb-2">
										Type de bien *
									</label>
									<select
										name="typeBien"
										value={formData.typeBien}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
									>
										<option value="">Sélectionnez...</option>
										<option value="appartement">Appartement</option>
										<option value="maison">Maison</option>
										<option value="bureau">Bureau/Commerce</option>
										<option value="terrain">Terrain</option>
										<option value="autre">Autre</option>
									</select>
								</div>

								<div>
									<label className="block text-sm font-medium text-white mb-2">
										Nombre de biens *
									</label>
									<select
										name="nombreBiens"
										value={formData.nombreBiens}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
									>
										<option value="">Sélectionnez...</option>
										<option value="1">1 bien</option>
										<option value="2-5">2 à 5 biens</option>
										<option value="6-10">6 à 10 biens</option>
										<option value="10+">Plus de 10 biens</option>
									</select>
								</div>

								<div className="md:col-span-2">
									<label className="block text-sm font-medium text-white mb-2">
										Message (optionnel)
									</label>
									<textarea
										name="message"
										value={formData.message}
										onChange={handleInputChange}
										rows={4}
										className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
										placeholder="Décrivez vos besoins spécifiques, questions ou informations supplémentaires..."
									/>
								</div>
							</div>

							<div className="mt-8">
								<button
									type="submit"
									disabled={isSubmitting}
									className="w-full px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
								>
									{isSubmitting ? (
										<>
											<div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
											Envoi en cours...
										</>
									) : (
										<>
											<MessageSquare className="h-5 w-5" />
											Envoyer ma demande
										</>
									)}
								</button>
							</div>
						</form>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
