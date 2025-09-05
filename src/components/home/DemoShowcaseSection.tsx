import React from 'react';
import { motion } from 'framer-motion';

// Démo: utilisez des images réelles dans src/assets/images ou public
import demo1 from '../../assets/images/image1.jpg';
import demo2 from '../../assets/images/image2.jpg';
import demo3 from '../../assets/images/image3.jpg';

const SLIDES = [
	{ src: demo1, title: 'Espace Locataire' },
	{ src: demo2, title: 'Espace Propriétaire' },
	{ src: demo3, title: 'Tableau de bord' },
];

export const DemoShowcaseSection: React.FC = () => {
	const [hovered, setHovered] = React.useState<number | null>(null);
	const [activeIndex, setActiveIndex] = React.useState<number>(1);
	const [isPaused, setIsPaused] = React.useState<boolean>(false);
	const [lightbox, setLightbox] = React.useState<number | null>(null);

	// Autoplay doux (pause au survol et quand lightbox ouverte)
	React.useEffect(() => {
		if (isPaused || hovered !== null || lightbox !== null) return;
		const id = setInterval(() => {
			setActiveIndex((i) => (i + 1) % SLIDES.length);
		}, 3200);
		return () => clearInterval(id);
	}, [isPaused, hovered, lightbox]);

	// Gestion clavier dans la lightbox
	React.useEffect(() => {
		if (lightbox === null) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setLightbox(null);
			if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? 0 : (i + 1) % SLIDES.length));
			if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? 0 : (i - 1 + SLIDES.length) % SLIDES.length));
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [lightbox]);

	// Positionnement par défaut (centre l'élément d'index 1)
	const defaultCenter = 1;

	return (
		<section className="relative py-16 overflow-x-hidden">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-end justify-between mb-6">
					<h2 className="text-2xl md:text-3xl font-bold text-white">Aperçu de la plateforme</h2>
					<p className="text-slate-300 text-sm">Parcourez quelques écrans clés</p>
				</div>

				{/* Coverflow 3D simple avec motion */}
				<div className="relative h-[320px] md:h-[380px] overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
					<div className="absolute inset-0 grid place-items-center">
						<div className="relative w-full max-w-5xl h-full">
							{SLIDES.map((s, i) => {
								const center = hovered ?? activeIndex ?? defaultCenter;
								const offset = (i - center) * 140; // distance horizontale
								const rotateY = -20 * (i - center);
								const isCenter = i === center;
								const z = isCenter ? 50 : 10 - Math.abs(i - center);

								return (
									<motion.div
										key={s.title}
										className="absolute top-1/2 left-1/2 w-56 sm:w-64 md:w-80 h-72 sm:h-80 md:h-96 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer will-change-transform"
										style={{ zIndex: z }}
										initial={{ opacity: 0, scale: 0.92, rotateY: -20 * (i - defaultCenter), x: (i - defaultCenter) * 140 }}
										animate={{ x: offset, rotateY, scale: isCenter ? 1.06 : 0.92, opacity: 1 }}
										transition={{ type: 'spring', stiffness: 260, damping: 22 }}
										onMouseEnter={() => setHovered(i)}
										onMouseLeave={() => setHovered(null)}
										onFocus={() => setHovered(i)}
										onBlur={() => setHovered(null)}
										onClick={() => setLightbox(i)}
										role="button"
										tabIndex={0}
									>
										<img src={s.src} alt={s.title} className="h-full w-full object-cover" />
										<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
											<p className="text-white text-sm font-semibold">{s.title}</p>
										</div>
									</motion.div>
								);
							})}
						</div>
					</div>
				</div>

				{/* Lightbox plein écran */}
				{lightbox !== null && (
					<div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							className="relative w-full max-w-5xl"
							onClick={(e) => e.stopPropagation()}
						>
							<img src={SLIDES[lightbox].src} alt={SLIDES[lightbox].title} className="w-full max-h-[80vh] object-contain rounded-xl border border-white/10 shadow-2xl" />
							<div className="absolute top-3 right-3 flex gap-2">
								<button aria-label="Fermer" className="rounded-lg bg-white/10 hover:bg-white/20 text-white px-3 py-2" onClick={() => setLightbox(null)}>Fermer</button>
							</div>
							<div className="absolute inset-y-0 left-0 flex items-center">
								<button aria-label="Précédent" className="m-2 rounded-full bg-white/10 hover:bg-white/20 text-white p-3" onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? 0 : (i - 1 + SLIDES.length) % SLIDES.length)); }}>
									‹
								</button>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center">
								<button aria-label="Suivant" className="m-2 rounded-full bg-white/10 hover:bg-white/20 text-white p-3" onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? 0 : (i + 1) % SLIDES.length)); }}>
									›
								</button>
							</div>
						</motion.div>
					</div>
				)}

			</div>
		</section>
	);
};

export default DemoShowcaseSection;


