import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Shield, TrendingUp, Users } from 'lucide-react';

interface StatItem {
	icon: React.ComponentType<{ className?: string }>;
	number: string;
	label: string;
}

const STATS: StatItem[] = [
	{ number: '500+', label: 'Biens gérés', icon: Building2 },
	{ number: '98%', label: 'Satisfaction', icon: Shield },
	{ number: '15+', label: 'Années d\'expérience', icon: TrendingUp },
	{ number: '24/7', label: 'Support', icon: Users },
];

export const TrustIndicators: React.FC = () => {
	return (
		<div className="relative">
			{/* Background avec effet de profondeur */}
			<div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/30 to-slate-900/50 rounded-3xl blur-xl" />
			<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-blue-500/10 rounded-3xl" />
			
			{/* Container principal */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.8 }}
				className="relative bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 md:p-12 shadow-2xl"
			>
				{/* Titre de section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="text-center mb-12"
				>
					<div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-4">
						<span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse" />
						Nos performances
					</div>
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
						Des chiffres qui
						<span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
							parlent d'excellence
						</span>
					</h2>
					<p className="text-slate-300 max-w-2xl mx-auto">
						Découvrez pourquoi ITCHO est le partenaire de confiance pour la gestion de votre patrimoine immobilier
					</p>
				</motion.div>

				{/* Grid des stats */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
					{STATS.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, scale: 0.8, y: 20 }}
							whileInView={{ opacity: 1, scale: 1, y: 0 }}
							viewport={{ once: true, amount: 0.4 }}
							transition={{ delay: 0.4 + index * 0.1, duration: 0.6, type: "spring" }}
							whileHover={{ scale: 1.05, y: -5 }}
							className="text-center group relative"
						>
							{/* Effet de glow au hover */}
							<div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
							
							{/* Container de la stat */}
							<div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 group-hover:border-indigo-500/50 transition-all duration-300">
								{/* Icône avec effet lumineux */}
								<motion.div
									whileHover={{ rotate: 360 }}
									transition={{ duration: 0.6 }}
									className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-indigo-500/25 transition-all duration-300"
								>
									<stat.icon className="w-8 h-8 text-white" />
								</motion.div>

								{/* Nombre avec animation */}
								<motion.div
									initial={{ scale: 0 }}
									whileInView={{ scale: 1 }}
									viewport={{ once: true }}
									transition={{ delay: 0.6 + index * 0.1, duration: 0.8, type: "spring" }}
									className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2"
								>
									{stat.number}
								</motion.div>

								{/* Label */}
								<div className="text-slate-300 text-sm font-medium">
									{stat.label}
								</div>

								{/* Ligne décorative */}
								<div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
							</div>
						</motion.div>
					))}
				</div>

				{/* CTA en bas */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 1, duration: 0.6 }}
					className="text-center mt-12"
				>
					<div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30 text-indigo-300 font-medium">
						<span className="w-2 h-2 bg-indigo-400 rounded-full mr-3 animate-pulse" />
						Rejoignez nos clients satisfaits dès aujourd'hui
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default TrustIndicators;


