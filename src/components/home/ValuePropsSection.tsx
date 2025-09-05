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
					{ITEMS.map(({ title, desc, Icon, accent }) => (
						<div key={title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow transition-transform duration-300 hover:-translate-y-1">
							{/* Decorative gradient blob */}
							<div className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${accent} opacity-20 blur-2xl`} />

							<div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow`}> 
								<Icon className="h-6 w-6" />
							</div>
							<h3 className="text-base font-semibold text-white mb-1.5 tracking-tight">{title}</h3>
							<p className="text-slate-200 text-sm leading-relaxed">{desc}</p>

							{/* Underline accent on hover */}
							<span className={`absolute left-6 bottom-6 h-px w-16 bg-gradient-to-r ${accent} transition-all duration-300 group-hover:w-24`} />
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default ValuePropsSection;


