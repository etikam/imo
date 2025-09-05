import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Building2 } from 'lucide-react';

export const LocationSection: React.FC = () => {
	return (
		<section className="relative py-16" id="location">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-8 flex items-center gap-3">
					<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center">
						<MapPin className="h-5 w-5" />
					</div>
					<h2 className="text-2xl md:text-3xl font-bold text-white">Localisation</h2>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					{/* Carte */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6 }}
						className="relative rounded-2xl overflow-hidden border border-white/10 shadow bg-white/5"
					>
						<iframe
							title="map"
							className="w-full h-[320px] md:h-[400px]"
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.1234567890123!2d-13.71234567890123!3d9.51234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMzAnNDQuNCJOIDEzwrA0Mic0NC40Ilc!5e0!3m2!1sfr!2sfr!4v1710000000000"
						/>
					</motion.div>

					{/* Coordonnées */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ delay: 0.1, duration: 0.6 }}
						className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow text-slate-200"
					>
						<ul className="space-y-4">
							<li className="flex items-start gap-3">
								<Building2 className="h-5 w-5 text-indigo-400 mt-0.5" />
								<span>Matoto, Conakry, Guinée</span>
							</li>
							<li className="flex items-start gap-3">
								<Phone className="h-5 w-5 text-indigo-400 mt-0.5" />
								<span>+224 627613835</span>
							</li>
							<li className="flex items-start gap-3">
								<Mail className="h-5 w-5 text-indigo-400 mt-0.5" />
								<span>contact@itchoh.com</span>
							</li>
						</ul>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default LocationSection;


