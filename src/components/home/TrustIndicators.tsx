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
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration: 0.6 }}
			className="grid grid-cols-2 md:grid-cols-4 gap-8"
		>
			{STATS.map((stat, index) => (
				<motion.div
					key={stat.label}
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ delay: index * 0.08, duration: 0.4 }}
					className="text-center"
				>
					<div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
						<stat.icon className="w-6 h-6 text-indigo-300" />
					</div>
					<div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
						{stat.number}
					</div>
					<div className="text-slate-400 text-sm font-medium mt-1">
						{stat.label}
					</div>
				</motion.div>
			))}
		</motion.div>
	);
};

export default TrustIndicators;


