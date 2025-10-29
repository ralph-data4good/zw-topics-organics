import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SkipLinks } from '@zwa/a11y';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SkipLinks />
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

