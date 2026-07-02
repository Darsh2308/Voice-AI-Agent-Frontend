import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SuhaasWidget } from '../SuhaasWidget/SuhaasWidget';

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--bc-cloud)' }}>
      <Navbar />
      <main className="flex-1" id="main-content">
        <div key={pathname} className="animate-fade-in-up">
          <Outlet />
        </div>
      </main>
      <Footer />
      <SuhaasWidget />
    </div>
  );
}
