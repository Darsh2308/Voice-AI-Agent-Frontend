import { Routes, Route } from 'react-router-dom';
import { SuhaasProvider } from './components/SuhaasWidget/SuhaasContext';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage';
import { PlansPage } from './pages/PlansPage';
import { NetworkPage } from './pages/NetworkPage';
import { FiberPage } from './pages/FiberPage';
import { RechargePage } from './pages/RechargePage';
import { SupportPage } from './pages/SupportPage';
import { AboutPage } from './pages/AboutPage';

function App() {
  return (
    <SuhaasProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/fiber" element={<FiberPage />} />
          <Route path="/recharge" element={<RechargePage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </SuhaasProvider>
  );
}

export default App;
