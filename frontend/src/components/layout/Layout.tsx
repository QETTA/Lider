import { useEffect, useState } from 'react';
import { Sidebar2026 } from './Sidebar2026';
import { Header2026 } from './Header2026';

interface LayoutProps {
  children: React.ReactNode;
}

const DESKTOP_BREAKPOINT = 1024;

function getIsDesktop() {
  if (typeof window === 'undefined') {
    return true;
  }

  return window.innerWidth >= DESKTOP_BREAKPOINT;
}

export function Layout({ children }: LayoutProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const syncViewport = () => {
      const desktop = getIsDesktop();
      setIsDesktop(desktop);
      setSidebarOpen(desktop);
    };

    syncViewport();
    window.addEventListener('resize', syncViewport);

    return () => {
      window.removeEventListener('resize', syncViewport);
    };
  }, []);

  const handleMenuToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleNavigate = () => {
    if (!isDesktop) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-smooth text-[color:var(--text-strong)]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(118,145,129,0.14),_transparent_26%),radial-gradient(circle_at_82%_10%,_rgba(223,244,244,0.75),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(93,119,105,0.08),_transparent_28%)]" />

      {!isDesktop && sidebarOpen && (
        <button
          aria-label="사이드바 닫기"
          className="fixed inset-0 z-40 bg-[rgba(39,53,45,0.16)] backdrop-blur-[3px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar2026
        isDesktop={isDesktop}
        isOpen={sidebarOpen}
        onToggle={handleMenuToggle}
        onNavigate={handleNavigate}
      />

      <div
        className={`min-h-screen transition-[padding] duration-[var(--duration-normal)] ease-[var(--ease-smooth)] ${
          isDesktop ? (sidebarOpen ? 'lg:pl-72' : 'lg:pl-24') : ''
        }`}
      >
        <Header2026 onMenuToggle={handleMenuToggle} sidebarOpen={sidebarOpen} isDesktop={isDesktop} />
        <main className="px-4 pb-10 pt-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
