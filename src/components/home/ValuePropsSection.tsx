import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CreditCard, Headphones, LineChart } from 'lucide-react';

const ITEMS = [
	{
		title: 'Sécurité de bout en bout',
		desc: 'Chiffrement, audit, conformité — vos données et transactions sont protégées.',
		Icon: ShieldCheck,
		accent: 'from-indigo-500 to-purple-600',
	},
	{
		title: 'Paiements sécurisés',
		desc: 'Encaissements et versements fiables, traçables, avec rapprochement automatique.',
		Icon: CreditCard,
		accent: 'from-blue-500 to-indigo-600',
	},
	{
		title: 'Support 24/7',
		desc: 'Accompagnement réactif pour propriétaires et locataires, partout, tout le temps.',
		Icon: Headphones,
		accent: 'from-fuchsia-500 to-pink-600',
	},
	{
		title: 'Pilotage en temps réel',
		desc: 'Tableaux de bord, alertes intelligentes, indicateurs clés en un coup d’œil.',
		Icon: LineChart,
		accent: 'from-purple-500 to-fuchsia-600',
	},
];

export const ValuePropsSection: React.FC = () => {
	return (
		<section className="relative py-18" id="services">
			{/* Soft background tint */}
			<div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/0 via-white/2 to-white/0" />

			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.6 }}
					className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
				>
					{ITEMS.map(({ title, desc, Icon, accent }, index) => (
						<motion.div
							key={title}
							initial={{ opacity: 0, y: 50, rotateX: -30, rotateY: -15 }}
							whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 100 }}
							whileHover={{ 
								y: -20, 
								rotateX: -15, 
								rotateY: 10,
								scale: 1.05,
								transition: { duration: 0.4, type: "spring", stiffness: 300 }
							}}
							className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-2xl transition-all duration-300"
							style={{
								transformStyle: 'preserve-3d',
								perspective: '800px'
							}}
						>
							{/* Effet 3D - Ombre portée */}
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							
							{/* Effet 3D - Bordure lumineuse */}
							<div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm`} />
							
							{/* Decorative gradient blob avec transformation 3D */}
							<motion.div 
								className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${accent} opacity-20 blur-2xl`}
								whileHover={{ 
									scale: 1.5, 
									rotateX: 360,
									rotateY: 180,
									rotateZ: 90
								}}
								transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
								style={{ transformStyle: 'preserve-3d' }}
							/>

							{/* Icône avec transformation 3D */}
							<motion.div 
								className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-lg`}
								whileHover={{ 
									rotateX: 180, 
									rotateY: 180,
									rotateZ: 45,
									scale: 1.2,
									boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
								}}
								transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
								style={{ transformStyle: 'preserve-3d' }}
							> 
								<Icon className="h-6 w-6" />
							</motion.div>

							{/* Contenu avec transformation 3D */}
							<div className="relative z-10">
								<motion.h3 
									className="text-base font-semibold text-white mb-1.5 tracking-tight"
									whileHover={{ 
										scale: 1.1,
										rotateX: 5,
										rotateY: 5
									}}
									transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
									style={{ transformStyle: 'preserve-3d' }}
								>
									{title}
								</motion.h3>
								<motion.p 
									className="text-slate-200 text-sm leading-relaxed"
									whileHover={{ 
										scale: 1.05,
										rotateX: -3,
										rotateY: -3
									}}
									transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
									style={{ transformStyle: 'preserve-3d' }}
								>
									{desc}
								</motion.p>
							</div>

							{/* Underline accent avec transformation 3D */}
							<motion.span 
								className={`absolute left-6 bottom-6 h-px bg-gradient-to-r ${accent} transition-all duration-300`}
								initial={{ width: '4rem', rotateX: 0 }}
								whileHover={{ 
									width: '6rem',
									rotateX: 15,
									rotateY: 10,
									scale: 1.1
								}}
								transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
								style={{ transformStyle: 'preserve-3d' }}
							/>

							{/* Effet de reflet 3D */}
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default ValuePropsSection;


