import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { ProprietairePage } from './pages/ProprietairePage';
import { Layout } from './components/layout/Layout';
import { GestionnairePage } from './pages/GestionnairePage';
import { GestionnaireBienDetailsPage } from './pages/GestionnaireBienDetailsPage';
import { LoginPage } from './pages/LoginPage';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';
import './styles/theme.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/proprietaire" element={<ProprietairePage />} />
            <Route path="/gestionnaire" element={<GestionnairePage />} />
            <Route path="/gestionnaire/biens/:id" element={<GestionnaireBienDetailsPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;