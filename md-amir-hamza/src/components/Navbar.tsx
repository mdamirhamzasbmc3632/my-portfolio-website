import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { downloadCV, CV_PDF_URL } from '../utils/downloadCV';
import { Check, Download, Share2, MessageSquare, Menu, X, CircleCheck } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';

interface NavbarProps {
  lang?: SupportedLanguage;
}

export const Navbar: React.FC<NavbarProps> = ({ lang = 'en' }) => {
  const { config } = useSiteConfig();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [copiedLink, setCopiedLink] = useState(false);
  const [cvDownloaded, setCvDownloaded] = useState(false);

  const profile = config.profile;

  const handleDownloadCV = () => {
    downloadCV();
    setCvDownloaded(true);
    setTimeout(() => setCvDownloaded(false), 3000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['home', 'portfolio', 'expertise', 'education', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'হোম', labelEn: 'Home', href: '#home' },
    { id: 'portfolio', label: 'মাই প্রজেক্টস', labelEn: 'My Projects', href: '#portfolio' },
    { id: 'expertise', label: 'কোর এক্সপার্টিজ অ্যান্ড স্কিলস', labelEn: 'Core Expertise & Skills', href: '#expertise' },
    { id: 'education', label: 'এডুকেশন', labelEn: 'Education', href: '#education' },
    { id: 'contact', label: 'যোগাযোগ', labelEn: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${profile.nameEn} - Creative Visualizer & Video Editor`,
      text: `Explore ${profile.nameEn}'s Video Editing and Digital Marketing Portfolio.`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07080a]/95 backdrop-blur-md border-b border-sky-500/25 shadow-2xl shadow-black/60 py-2.5 sm:py-3.5'
          : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none shrink min-w-0"
            id="brand-logo-link"
          >
            <Logo size="md" />
            <div className="text-left min-w-0">
              <span className="text-sm sm:text-base md:text-lg font-black tracking-tight text-white block leading-tight truncate max-w-[150px] xs:max-w-[210px] sm:max-w-none">
                {lang === 'bn' ? (profile.name || 'মোঃ আমির হামজা') : (profile.nameEn || 'Md Amir Hamza')}
              </span>
              <span className="text-[9px] sm:text-[11px] font-semibold text-cyan-400 tracking-wider uppercase block truncate max-w-[150px] xs:max-w-[210px] sm:max-w-none">
                {lang === 'bn' ? 'ডিজিটাল মার্কেটিং ও মিডিয়া' : 'Digital Marketing & Media'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden xl:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-sky-500/35 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.12)]"
            id="desktop-nav-menu"
          >
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  id={`nav-link-${item.id}`}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white/15 text-white shadow-sm border border-sky-400/50 shadow-[0_0_10px_rgba(56,189,248,0.25)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{lang === 'bn' ? item.label : item.labelEn}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
                </a>
              );
            })}

            <a
              href={CV_PDF_URL}
              download="Amir-Hamza-3632-Cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleDownloadCV();
              }}
              id="nav-download-cv-btn"
              className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 text-sky-300 hover:text-white hover:bg-sky-500/20 border border-sky-500/35 hover:border-sky-400 cursor-pointer ml-1"
              title={lang === 'bn' ? 'সিভি ডাউনলোড করুন' : 'Download CV'}
            >
              {cvDownloaded ? (
                <>
                  <CircleCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">{lang === 'bn' ? 'ডাউনলোড!' : 'Done!'}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-sky-400" />
                  <span>{lang === 'bn' ? 'ডাউনলোড সিভি' : 'Download CV'}</span>
                </>
              )}
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              id="share-portfolio-btn"
              onClick={handleShare}
              className="p-2.5 rounded-full bg-white/5 hover:bg-sky-500/15 text-slate-300 hover:text-white border border-sky-500/35 hover:border-sky-400 transition-all cursor-pointer relative group shadow-sm"
              title={lang === 'bn' ? 'পোর্টফোলিও লিংক শেয়ার করুন' : 'Share Portfolio'}
            >
              {copiedLink ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Share2 className="w-4 h-4 text-slate-300 group-hover:text-white" />
              )}
              {copiedLink && (
                <span className="absolute -bottom-8 right-0 text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 whitespace-nowrap shadow-lg">
                  {lang === 'bn' ? 'লিংক কপি হয়েছে!' : 'Link Copied!'}
                </span>
              )}
            </button>

            <a
              id="nav-contact-cta-btn"
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="flex items-center gap-2 px-4 sm:px-5 py-2 text-xs sm:text-sm font-black text-slate-950 bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#38bdf8] hover:from-[#059669] hover:via-[#0891b2] hover:to-[#0284c7] rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950/30 text-slate-950" />
              <span>{lang === 'bn' ? 'কথা বলুন' : "Let's Talk"}</span>
            </a>
          </div>

          {/* Mobile Menu Toggle & Quick Action */}
          <div className="flex xl:hidden items-center gap-2 shrink-0">
            <button
              type="button"
              id="mobile-share-btn"
              onClick={handleShare}
              className="sm:hidden p-2.5 rounded-full bg-white/5 text-slate-300 hover:text-white border border-sky-500/35 active:scale-95 transition-all"
              aria-label="Share portfolio"
            >
              {copiedLink ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Share2 className="w-4 h-4 text-slate-300" />
              )}
            </button>
            <button
              type="button"
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-slate-200 hover:text-white border border-sky-500/35 hover:border-sky-400 focus:outline-none active:scale-95 transition-all cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-sky-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="xl:hidden mt-2.5 p-3.5 sm:p-4 bg-[#090b0e]/95 border border-sky-500/40 rounded-2xl backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.85),0_0_20px_rgba(56,189,248,0.2)] flex flex-col gap-1 max-h-[80vh] overflow-y-auto"
          >
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  id={`mobile-nav-${item.id}`}
                  className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{lang === 'bn' ? item.label : item.labelEn}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
                </a>
              );
            })}

            <div className="pt-3 border-t border-sky-500/25 flex flex-col gap-2">
              <a
                href={CV_PDF_URL}
                download="Amir-Hamza-3632-Cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  handleDownloadCV();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-slate-100 bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/40 rounded-full shadow-md cursor-pointer active:scale-98 transition-all"
              >
                {cvDownloaded ? (
                  <>
                    <CircleCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">{lang === 'bn' ? 'ডাউনলোড সম্পন্ন!' : 'Downloaded!'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-sky-400" />
                    <span>{lang === 'bn' ? 'ডাউনলোড সিভি' : 'Download CV'}</span>
                  </>
                )}
              </a>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-black text-slate-950 bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#38bdf8] rounded-full shadow-lg shadow-cyan-500/25 active:scale-98 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{lang === 'bn' ? 'কথা বলুন' : "Let's Talk"}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
