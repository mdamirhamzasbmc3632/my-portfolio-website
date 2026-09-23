/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Expertise } from './components/Expertise';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PhotoCustomizer } from './components/PhotoCustomizer';
import { PhotoUploadBanner } from './components/PhotoUploadBanner';
import { SiteConfigProvider, useSiteConfig } from './context/SiteConfigContext';
import { ElementorAdminBar } from './components/ElementorAdminBar';
import { ElementorInspector } from './components/ElementorInspector';
import { SiteEditorDrawer } from './components/SiteEditorDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { getFontScaleClass } from './utils/themeStyles';
import { SupportedLanguage } from './types';

function PortfolioApp() {
  const { config, updateProfile, isEditMode } = useSiteConfig();
  const [showBgAvatar, setShowBgAvatar] = useState(false);
  const [lang] = useState<SupportedLanguage>('en');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerDefaultTab, setDrawerDefaultTab] = useState<string | null>('theme');

  // Synchronize avatar and background images with configuration
  const avatarUrl =
    config.profile.defaultAvatar ||
    'https://cdn.jsdelivr.net/gh/mdamirhamzasbmc3632/my-portfolio-images@main/Amir%20Hamzxa.png';
  const bgImageUrl = config.profile.defaultBackground || '/amir-lab-bg.jpg';

  const handleUpdateAvatar = (url: string) => {
    updateProfile({ defaultAvatar: url });
    try {
      localStorage.setItem('hamza_avatar_url', url);
    } catch {
      // ignore
    }
  };

  const handleUpdateBgImage = (url: string) => {
    updateProfile({ defaultBackground: url });
    try {
      localStorage.setItem('hamza_bg_url', url);
    } catch {
      // ignore
    }
  };

  const handleResetPhotos = () => {
    updateProfile({
      defaultAvatar:
        'https://cdn.jsdelivr.net/gh/mdamirhamzasbmc3632/my-portfolio-images@main/Amir%20Hamzxa.png',
      defaultBackground: '/amir-lab-bg.jpg',
    });
    try {
      localStorage.removeItem('hamza_avatar_url');
      localStorage.removeItem('hamza_bg_url');
    } catch {
      // ignore
    }
  };

  const handleOpenGlobalSettings = (tab: string = 'theme') => {
    setDrawerDefaultTab(tab);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    document.documentElement.lang = 'en';

    const handleScroll = () => {
      const homeEl = document.getElementById('home');
      if (homeEl) {
        const isPastHome =
          homeEl.getBoundingClientRect().bottom <= 100 && window.scrollY > 300;
        setShowBgAvatar(isPastHome);
      } else {
        setShowBgAvatar(window.scrollY > window.innerHeight * 0.75);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fontScaleClass = getFontScaleClass(config.theme.fontScale);

  return (
    <div
      className={`min-h-screen bg-[#07080a] text-slate-100 selection:bg-sky-400 selection:text-slate-950 relative overflow-x-hidden ${fontScaleClass}`}
    >
      {/* Ambient background avatar when scrolled down past hero */}
      <div
        className={`hidden lg:flex fixed inset-0 pointer-events-none z-0 items-center justify-center transition-all ${
          showBgAvatar
            ? 'opacity-75 sm:opacity-80 lg:opacity-85 duration-500 ease-out'
            : 'opacity-0 duration-200 ease-in'
        }`}
        aria-hidden="true"
      >
        <div
          className="relative w-full max-w-2xl sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl h-[80vh] sm:h-[88vh] md:h-[94vh] max-h-[960px] flex items-end justify-center"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
          }}
        >
          <img
            src={avatarUrl}
            alt=""
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.fallback) {
                target.dataset.fallback = 'true';
                target.src = '/amir-white-punjabi-default.jpg';
              }
            }}
            className="w-full h-full object-contain object-bottom filter blur-[0.5px] contrast-110 brightness-108 drop-shadow-[0_0_40px_rgba(56,189,248,0.45)] select-none"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Quick Photo Upload Sticky Banner (Admin Only) */}
      {isEditMode && (
        <PhotoUploadBanner
          lang={lang}
          avatarUrl={avatarUrl}
          bgImageUrl={bgImageUrl}
          onUpdateAvatar={handleUpdateAvatar}
          onUpdateBgImage={handleUpdateBgImage}
        />
      )}

      <Navbar lang={lang} />

      <main id="main-content" className="relative z-10">
        {config.visibility.hero && (
          <Hero lang={lang} avatarUrl={avatarUrl} bgImageUrl={bgImageUrl} />
        )}
        {config.visibility.portfolio && <Portfolio lang={lang} />}
        {config.visibility.expertise && <Expertise lang={lang} />}
        {config.visibility.education && <Education lang={lang} />}
        {config.visibility.contact && <Contact lang={lang} />}
      </main>

      <Footer lang={lang} />

      {/* Floating WhatsApp Quick Connect Button */}
      <FloatingWhatsApp lang={lang} />

      {/* Admin / Elementor Live Editor Controls - Hidden completely for regular visitors */}
      {isEditMode && (
        <>
          <PhotoCustomizer
            lang={lang}
            avatarUrl={avatarUrl}
            bgImageUrl={bgImageUrl}
            onUpdateAvatar={handleUpdateAvatar}
            onUpdateBgImage={handleUpdateBgImage}
            onReset={handleResetPhotos}
          />
          <ElementorAdminBar onOpenGlobalSettings={() => handleOpenGlobalSettings('theme')} />
          <ElementorInspector />
          <SiteEditorDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            defaultTab={drawerDefaultTab}
          />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <SiteConfigProvider>
      <PortfolioApp />
    </SiteConfigProvider>
  );
}
