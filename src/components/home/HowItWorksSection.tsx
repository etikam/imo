import React from 'react';
import { motion } from 'framer-motion';
import { SectionOrnament } from '../ui/SectionOrnament';
import { Search, ClipboardCheck, Home, FileCheck2, Settings, Wallet } from 'lucide-react';

const LOCATAIRE_STEPS = [
	{ title: 'Cherchez', desc: 'Filtres avancés, alertes personnalisées.', Icon: Search },
	{ title: 'Candidature', desc: 'Dossier numérique validé en un clic.', Icon: ClipboardCheck },
	{ title: 'Emménagez', desc: 'Signature et état des lieux simplifiés.', Icon: Home },
];

const PROPRIO_STEPS = [
	{ title: 'Publiez', desc: 'Annonce multi-diffusion en 2 min.', Icon: FileCheck2 },
	{ title: 'Gérez', desc: 'Loyers, charges, incidents centralisés.', Icon: Settings },
	{ title: 'Optimisez', desc: 'Suivi financier et reporting clair.', Icon: Wallet },
];

const Flow: React.FC<{ title: string; steps: { title: string; desc: string; Icon: any }[]; accent: string }>
	= ({ title, steps, accent }) => (
		<div className="relative">
			<h3 className="mb-4 text-lg font-bold text-white">{title}</h3>
			{/* connector line */}
			<motion.div
				initial={{ scaleY: 0 }}
				whileInView={{ scaleY: 1 }}
				viewport={{ once: true, amount: 0.4 }}
				transition={{ duration: 0.6 }}
				className="absolute left-5 top-10 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500/50 to-purple-500/50 origin-top"
			/>
			<ul className="space-y-6">
				{steps.map(({ title, desc, Icon }, i) => (
					<li key={title} className="relative pl-14">
						{/* step node */}
						<div className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${accent} text-white shadow`}> {i + 1} </div>
						<div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow">
							<div className="mb-1 flex items-center gap-2">
								<Icon className="h-5 w-5 text-indigo-300" />
								<span className="text-white font-semibold">{title}</span>
							</div>
							<p className="text-slate-200 text-sm leading-relaxed">{desc}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);

export const HowItWorksSection: React.FC = () => {
	return (
		<section className="relative py-16">
			<SectionOrnament variant="rings" />
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-center text-2xl md:text-3xl font-bold text-white mb-10">Comment ça marche</h2>
				<div className="grid gap-10 md:grid-cols-2">
					<Flow title="Locataire" steps={LOCATAIRE_STEPS} accent="from-indigo-500 to-purple-600" />
					<Flow title="Propriétaire" steps={PROPRIO_STEPS} accent="from-purple-500 to-fuchsia-600" />
				</div>
			</div>
		</section>
	);
};

export default HowItWorksSection;


