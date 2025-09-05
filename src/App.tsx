import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { ProprietairePage } from './pages/ProprietairePage';
import { Layout } from './components/layout/Layout';
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
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/proprietaire" element={<ProprietairePage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;