import { Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import DemoPage from './pages/DemoPage';
import InvoicesPage from './pages/InvoicesPage';
import CompaniesPage from './pages/CompaniesPage';
import ClientsPage from './pages/ClientsPage';
import SettingsPage from './pages/SettingsPage';

const theme = createTheme({
  typography: {
    fontFamily: 'Jost, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
