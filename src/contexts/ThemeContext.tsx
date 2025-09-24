import React, { createContext, useContext, useState, useEffect } from 'react';
import { me, logoutReq } from '../lib/auth';

type Theme = 'dark' | 'light';

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
	setTheme: (theme: Theme) => void;
  currentUser: any | null;
  setCurrentUser: (u: any | null) => void;
  authLoading: boolean;
  logout: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

interface ThemeProviderProps {
	children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [theme, setThemeState] = useState<Theme>(() => {
		// Récupérer le thème depuis localStorage ou utiliser 'dark' par défaut
		const savedTheme = localStorage.getItem('proprietaire-theme') as Theme;
		return savedTheme || 'dark';
	});

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
		localStorage.setItem('proprietaire-theme', newTheme);
	};

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    me()
      .then((res) => setCurrentUser(res.authenticated ? res.user : null))
      .finally(() => setAuthLoading(false));
  }, []);

  const logout = async () => {
    await logoutReq();
    setCurrentUser(null);
    window.location.href = '/login';
  };

	// Appliquer le thème au document
	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, currentUser, setCurrentUser, authLoading, logout }}>
        {children}
    </ThemeContext.Provider>
);
};
