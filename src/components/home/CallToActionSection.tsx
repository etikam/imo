import React from 'react';
import { SectionOrnament } from '../ui/SectionOrnament';
import { Link } from 'react-router-dom';

export const CallToActionSection: React.FC = () => {
	return (
		<section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
			<SectionOrnament variant="corners" />
			<div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600 to-purple-600 p-8 md:p-12 shadow">
				<div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
				<div className="grid md:grid-cols-2 gap-6 items-center">
					<div>
						<h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">Prêt à simplifier votre gestion immobilière ?</h3>
						<p className="text-indigo-50/95">Créez un compte en quelques secondes et commencez dès aujourd’hui.</p>
					</div>
					<div className="flex flex-col sm:flex-row items-center md:justify-end gap-3">
						<Link to="/contact" className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow hover:shadow-md transition">Commencer maintenant</Link>
						<a href="#demo" className="inline-flex items-center justify-center rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white/95 hover:bg-white/10 transition">Demander une démo</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CallToActionSection;


