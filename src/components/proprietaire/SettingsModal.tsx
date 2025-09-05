import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
	X, 
	Sun, 
	Moon, 
	Bell, 
	Shield, 
	User, 
	Globe, 
	Palette,
	ChevronRight,
	Check
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

interface SettingItem {
	id: string;
	title: string;
	description: string;
	icon: React.ComponentType<any>;
	type: 'toggle' | 'select' | 'button';
	value?: boolean | string;
	onChange?: (value: any) => void;
	options?: { value: string; label: string }[];
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
	const { theme, toggleTheme } = useTheme();
	const [notifications, setNotifications] = useState(true);
	const [emailAlerts, setEmailAlerts] = useState(true);
	const [language, setLanguage] = useState('fr');
	const [currency, setCurrency] = useState('GNF');

	const settingsItems: SettingItem[] = [
		{
			id: 'theme',
			title: 'Thème',
			description: 'Choisissez entre le mode sombre et clair',
			icon: theme === 'dark' ? Moon : Sun,
			type: 'toggle',
			value: theme === 'dark',
			onChange: toggleTheme
		},
		{
			id: 'notifications',
			title: 'Notifications',
			description: 'Recevoir des notifications push',
			icon: Bell,
			type: 'toggle',
			value: notifications,
			onChange: setNotifications
		},
		{
			id: 'email-alerts',
			title: 'Alertes par email',
			description: 'Recevoir des alertes par email',
			icon: Bell,
			type: 'toggle',
			value: emailAlerts,
			onChange: setEmailAlerts
		},
		{
			id: 'language',
			title: 'Langue',
			description: 'Langue de l\'interface',
			icon: Globe,
			type: 'select',
			value: language,
			onChange: setLanguage,
			options: [
				{ value: 'fr', label: 'Français' },
				{ value: 'en', label: 'English' }
			]
		},
		{
			id: 'currency',
			title: 'Devise',
			description: 'Devise d\'affichage',
			icon: Palette,
			type: 'select',
			value: currency,
			onChange: setCurrency,
			options: [
				{ value: 'GNF', label: 'Franc Guinéen (GNF)' },
				{ value: 'USD', label: 'Dollar US (USD)' },
				{ value: 'EUR', label: 'Euro (EUR)' }
			]
		}
	];

	const renderSettingItem = (item: SettingItem) => {
		const Icon = item.icon;

		return (
			<motion.div
				key={item.id}
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: settingsItems.indexOf(item) * 0.1 }}
				className="group p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
				onClick={() => {
					if (item.type === 'toggle' && item.onChange) {
						item.onChange(!item.value);
					}
				}}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
							theme === 'dark' 
								? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
								: 'bg-gradient-to-br from-indigo-100 to-purple-100'
						}`}>
							<Icon className={`h-5 w-5 ${
								theme === 'dark' ? 'text-white' : 'text-indigo-600'
							}`} />
						</div>
						<div>
							<h4 className={`font-medium ${
								theme === 'dark' ? 'text-white' : 'text-gray-900'
							}`}>
								{item.title}
							</h4>
							<p className={`text-sm ${
								theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
							}`}>
								{item.description}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-2">
						{item.type === 'toggle' && (
							<div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
								item.value 
									? 'bg-gradient-to-r from-indigo-500 to-purple-600' 
									: theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300'
							}`}>
								<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
									item.value ? 'translate-x-6' : 'translate-x-1'
								}`} />
							</div>
						)}

						{item.type === 'select' && (
							<div className="flex items-center gap-2">
								<span className={`text-sm ${
									theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
								}`}>
									{item.options?.find(opt => opt.value === item.value)?.label}
								</span>
								<ChevronRight className={`h-4 w-4 ${
									theme === 'dark' ? 'text-slate-400' : 'text-gray-400'
								}`} />
							</div>
						)}

						{item.type === 'button' && (
							<ChevronRight className={`h-4 w-4 ${
								theme === 'dark' ? 'text-slate-400' : 'text-gray-400'
							}`} />
						)}
					</div>
				</div>
			</motion.div>
		);
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Overlay */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
						onClick={onClose}
					/>

					{/* Modal */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className={`fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto max-h-[80vh] overflow-hidden rounded-2xl shadow-2xl z-50 ${
							theme === 'dark' 
								? 'bg-slate-900 border border-slate-700' 
								: 'bg-white border border-gray-200'
						}`}
					>
						{/* Header */}
						<div className={`p-6 border-b ${
							theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
						}`}>
							<div className="flex items-center justify-between">
								<div>
									<h2 className={`text-xl font-semibold ${
										theme === 'dark' ? 'text-white' : 'text-gray-900'
									}`}>
										Paramètres
									</h2>
									<p className={`text-sm mt-1 ${
										theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
									}`}>
										Personnalisez votre expérience
									</p>
								</div>
								<button
									onClick={onClose}
									className={`p-2 rounded-lg transition-colors ${
										theme === 'dark' 
											? 'hover:bg-slate-800 text-slate-400 hover:text-white' 
											: 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
									}`}
								>
									<X className="h-5 w-5" />
								</button>
							</div>
						</div>

						{/* Content */}
						<div className="p-6 overflow-y-auto max-h-[60vh]">
							<div className="space-y-2">
								{settingsItems.map(renderSettingItem)}
							</div>
						</div>

						{/* Footer */}
						<div className={`p-6 border-t ${
							theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
						}`}>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Check className={`h-4 w-4 ${
										theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
									}`} />
									<span className={`text-sm ${
										theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
									}`}>
										Paramètres sauvegardés automatiquement
									</span>
								</div>
								<button
									onClick={onClose}
									className={`px-4 py-2 rounded-lg font-medium transition-colors ${
										theme === 'dark'
											? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700'
											: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700'
									}`}
								>
									Terminé
								</button>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default SettingsModal;
