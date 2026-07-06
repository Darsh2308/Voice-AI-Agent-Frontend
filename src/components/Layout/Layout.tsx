import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SuhaasWidget } from '../SuhaasWidget/SuhaasWidget';

export function Layout() {
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen relative" style={{ background: 'var(--bc-cloud)' }}>
      {/* Scroll Progress Bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />
      
      <Navbar />
      <main className="flex-1" id="main-content">
        <div key={pathname}>
          <Outlet />
        </div>
      </main>
      <Footer />
      <SuhaasWidget />
    </div>
  );
}
