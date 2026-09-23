import React from 'react';
import { Logo } from './Logo';
import { downloadCV, CV_PDF_URL } from '../utils/downloadCV';
import { SupportedLanguage } from '../types';
import {
  Download,
  Youtube,
  Facebook,
  Linkedin,
  MessageCircle,
  ArrowUp,
  Sparkles,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { getContainerWidthClass } from '../utils/themeStyles';

interface FooterProps {
  lang?: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({ lang = 'en' }) => {
  const { config } = useSiteConfig();
  const profile = config.profile;
  const containerWidthClass = getContainerWidthClass(config.theme.containerWidth);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608]/80 backdrop-blur-md border-t border-sky-500/25 py-12 text-slate-400 text-xs relative z-20">
      <div className={`${containerWidthClass} mx-auto px-4 sm:px-6 lg:px-8 space-y-8`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo Brand */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <Logo size="md" />
            <div>
              <span className="text-base font-bold text-white block">
                {lang === 'bn' ? (profile.name || 'মোঃ আমির হামজা') : (profile.nameEn || 'Md Amir Hamza')}
              </span>
              <span className="text-xs text-[#2dd4bf] font-medium tracking-wider uppercase">
                {lang === 'bn' ? 'ডিজিটাল মার্কেটিং ও মিডিয়া' : 'Digital Marketing & Media'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-slate-300 font-medium">
            <a href="#home" className="hover:text-sky-400 transition-colors">
              {lang === 'bn' ? 'হোম' : 'Home'}
            </a>
            <a href="#portfolio" className="hover:text-sky-400 transition-colors">
              {lang === 'bn' ? 'মাই প্রজেক্টস' : 'My Projects'}
            </a>
            <a href="#expertise" className="hover:text-sky-400 transition-colors">
              {lang === 'bn' ? 'কোর এক্সপার্টিজ অ্যান্ড স্কিলস' : 'Core Expertise & Skills'}
            </a>
            <a href="#education" className="hover:text-sky-400 transition-colors">
              {lang === 'bn' ? 'এডুকেশন' : 'Education'}
            </a>
            <a href="#contact" className="hover:text-sky-400 transition-colors">
              {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </a>
            <a
              href={CV_PDF_URL}
              download="Amir-Hamza-3632-Cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                downloadCV();
              }}
              className="inline-flex items-center gap-1.5 text-sky-400 hover:text-white transition-colors cursor-pointer"
              title={lang === 'bn' ? 'সিভি ডাউনলোড করুন' : 'Download CV'}
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>{lang === 'bn' ? 'ডাউনলোড সিভি' : 'Download CV'}</span>
            </a>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-2.5">
            <a
              href={profile.whatsappUrl || 'https://wa.me/8801716689667'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 hover:text-emerald-300 transition-colors border border-emerald-500/35 hover:border-emerald-400 shadow-sm"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            {profile.socials.youtube && (
              <a
                href={profile.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-white transition-colors border border-sky-500/35 hover:border-sky-400 shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            )}
            {profile.socials.facebook && (
              <a
                href={profile.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-white transition-colors border border-sky-500/35 hover:border-sky-400 shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {profile.socials.linkedin && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-white transition-colors border border-sky-500/35 hover:border-sky-400 shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <button
              type="button"
              onClick={scrollToTop}
              id="back-to-top-btn"
              className="p-2 rounded-full bg-white/5 hover:bg-sky-500 hover:text-slate-950 text-slate-300 transition-all border border-sky-500/35 hover:border-sky-400 ml-2 cursor-pointer shadow-sm"
              title="Back to Top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright & Tagline */}
        <div className="border-t border-sky-500/15 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-2 text-center sm:text-left">
          <p>© 2026 {profile.nameEn} | All Right Reserved.</p>
          <p className="flex items-center gap-1 justify-center">
            <span>Crafting visual stories that connect, convert & elevate brands</span>
            <Sparkles className="w-3 h-3 text-sky-400 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
