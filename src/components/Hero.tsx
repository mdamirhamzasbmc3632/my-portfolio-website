import React from 'react';
import { motion } from 'motion/react';
import { Play, Send } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';
import { SectionEditButton } from './SectionEditButton';
import { EditableElement } from './EditableElement';
import { getContainerWidthClass } from '../utils/themeStyles';

interface HeroProps {
  lang?: SupportedLanguage;
  avatarUrl?: string;
  bgImageUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  lang = 'en',
  avatarUrl: propAvatarUrl,
  bgImageUrl: propBgImageUrl,
}) => {
  const { config, updateSection } = useSiteConfig();
  const avatarUrl =
    propAvatarUrl ||
    config.profile.defaultAvatar ||
    'https://cdn.jsdelivr.net/gh/mdamirhamzasbmc3632/my-portfolio-images@main/Amir%20Hamzxa.png';
  const bgImageUrl = propBgImageUrl || config.profile.defaultBackground || '/amir-lab-bg.jpg';

  const firstName = config.hero.titleFirst || 'AMIR';
  const lastName = config.hero.titleLast || 'HAMZA';

  const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    const stage = target.dataset.fallbackStage || '0';
    if (stage === '0') {
      target.dataset.fallbackStage = '1';
      target.src = '/Amir hamza png.png';
    } else if (stage === '1') {
      target.dataset.fallbackStage = '2';
      target.src = '/amir-hamza-white.png';
    } else if (stage === '2') {
      target.dataset.fallbackStage = '3';
      target.src = '/amir-white-punjabi-default.jpg';
    }
  };

  const containerWidthClass = getContainerWidthClass(config.theme.containerWidth);

  return (
    <section
      id="home"
      className="relative min-h-[82vh] sm:min-h-[86vh] lg:min-h-[90vh] flex flex-col justify-center items-center pt-16 sm:pt-24 pb-8 sm:pb-14 overflow-hidden"
    >
      <SectionEditButton sectionKey="hero" labelBn="হিরো সেকশন এডিট করুন" labelEn="Edit Hero" />

      {/* Background Computer Lab Image - Wrapped with Elementor EditableElement */}
      <EditableElement
        elementId="hero.background"
        label="ব্যাকগ্রাউন্ড কাভার"
        elementType="image"
        className="!absolute inset-0 w-full h-full -z-20 overflow-hidden select-none pointer-events-none"
      >
        <div className="relative w-full h-full">
          <img
            src={bgImageUrl}
            alt={`${firstName} ${lastName} Studio Computer Lab`}
            className="w-full h-full object-cover object-[center_32%] sm:object-[center_35%] scale-105 filter brightness-[0.38] contrast-[1.18] saturate-[0.85] transition-all duration-700 pointer-events-none"
            loading="eager"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.fallback) {
                target.dataset.fallback = 'true';
                target.src = '/IMG_20240226_120641~2.jpg';
              }
            }}
            referrerPolicy="no-referrer"
          />
          {/* Multilayer cinematic overlays for contrast & brand harmony */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#07080a] via-[#07080a]/65 to-[#07080a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/92 via-[#07080a]/45 to-[#07080a]/92" />
          <div
            className="absolute inset-0 opacity-20 mix-blend-color"
            style={{ backgroundColor: config.theme.accentColor }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#07080a_85%)]" />
        </div>
      </EditableElement>

      {/* Background Ambient Glows with dynamic accent colors */}
      <div
        className="absolute top-1/3 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10 opacity-20"
        style={{ backgroundColor: config.theme.accentColor }}
      />
      <div
        className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none -z-10 opacity-15"
        style={{ backgroundColor: config.theme.accentSecondary }}
      />

      <div className={`${containerWidthClass} mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col justify-center my-auto`}>
        {/* MOBILE & TABLET LAYOUT (lg:hidden) */}
        <div className="lg:hidden flex flex-col items-center text-center max-w-xl mx-auto my-auto py-1 sm:py-2">
          {/* Status Badge */}
          <EditableElement elementId="hero.badge" label="স্ট্যাটাস ব্যাজ" elementType="badge" className="w-fit mx-auto mb-2.5 sm:mb-3">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#0d0e12]/90 border border-sky-500/40 text-slate-200 text-[11px] sm:text-xs font-semibold tracking-wider uppercase backdrop-blur-xl shadow-[0_0_16px_rgba(56,189,248,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-white font-bold">
                {lang === 'bn' ? config.hero.badgeTextBn : config.hero.badgeTextEn}
              </span>
              <span className="text-slate-500">•</span>
              <span
                className="font-bold"
                style={{ color: config.theme.accentColor }}
              >
                {lang === 'bn' ? config.hero.badgeRoleBn : config.hero.badgeRoleEn}
              </span>
            </div>
          </EditableElement>

          {/* Name & Avatar Composition */}
          <div className="relative w-full flex flex-col items-center justify-center -mt-1 mb-1">
            <EditableElement
              elementId="hero.title"
              label="মূল নাম / টাইটেল"
              elementType="heading"
              className="w-full flex justify-center text-center -mb-12 xs:-mb-14 sm:-mb-18 relative z-0"
              inlineText={`${firstName} ${lastName}`}
              onInlineTextChange={(val) => {
                const parts = val.trim().split(' ');
                if (parts.length > 1) {
                  updateSection('hero', {
                    titleFirst: parts.slice(0, -1).join(' '),
                    titleLast: parts[parts.length - 1],
                  });
                } else {
                  updateSection('hero', { titleFirst: val, titleLast: '' });
                }
              }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[2.5rem] xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.92] uppercase select-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
              >
                <span className="block text-white">{firstName}</span>
                <span
                  className="block bg-clip-text text-transparent drop-shadow-[0_4px_32px_rgba(56,189,248,0.5)]"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${config.theme.accentColor}, ${config.theme.accentSecondary})`,
                  }}
                >
                  {lastName}
                </span>
              </motion.h1>
            </EditableElement>

            <EditableElement
              elementId="hero.avatar"
              label="আমির হামজা ছবি"
              elementType="image"
              className="relative z-10 flex justify-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-56 h-72 xs:w-64 xs:h-80 sm:w-76 sm:h-96 flex items-end justify-center"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 0%, black 76%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 76%, transparent 100%)',
                }}
              >
                <img
                  src={avatarUrl}
                  alt={`${firstName} ${lastName}`}
                  loading="eager"
                  decoding="async"
                  onError={handleAvatarError}
                  className="w-full h-full object-contain object-bottom select-none pointer-events-none drop-shadow-[0_12px_35px_rgba(0,0,0,0.9)]"
                  style={{
                    filter: `drop-shadow(0 0 3px ${config.theme.accentColor}) drop-shadow(0 0 9px ${config.theme.accentColor}99) drop-shadow(0 0 18px ${config.theme.accentSecondary}66) contrast(106%) brightness(104%)`,
                  }}
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </EditableElement>
          </div>

          {/* Subtitle */}
          <EditableElement
            elementId="hero.subtitle"
            label="সাবটাইটেল ও ডেজিগনেশন"
            elementType="text"
            className="w-full text-center px-3 -mt-6 sm:-mt-9 relative z-20"
            inlineText={lang === 'bn' ? config.hero.subtitleBn : config.hero.subtitleEn}
            onInlineTextChange={(val) => {
              updateSection('hero', lang === 'bn' ? { subtitleBn: val } : { subtitleEn: val });
            }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg xs:text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
            >
              {lang === 'bn' ? config.hero.subtitleBn : config.hero.subtitleEn}
            </motion.h2>
          </EditableElement>

          {/* Call to Actions */}
          <div className="flex flex-col xs:flex-row items-center justify-center gap-2.5 sm:gap-3 mt-4 sm:mt-5 px-3 relative z-20 w-full max-w-sm mx-auto">
            <EditableElement elementId="hero.cta_primary" label="বাটন: Explore Works" elementType="button" className="w-full xs:flex-1">
              <a
                href={config.hero.ctaPrimaryLink || '#portfolio'}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg active:scale-95 transition-all cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${config.theme.accentSecondary}, ${config.theme.accentColor})`,
                }}
              >
                <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>
                  {lang === 'bn' ? config.hero.ctaPrimaryTextBn : config.hero.ctaPrimaryTextEn}
                </span>
              </a>
            </EditableElement>

            <EditableElement elementId="hero.cta_secondary" label="বাটন: Let's Talk" elementType="button" className="w-full xs:flex-1">
              <a
                href={config.hero.ctaSecondaryLink || '#contact'}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl bg-[#0e1017]/90 hover:bg-[#181a24] text-slate-200 hover:text-white font-bold text-xs sm:text-sm tracking-wide border border-white/15 hover:border-sky-400/60 active:scale-95 transition-all cursor-pointer backdrop-blur-xl"
              >
                <Send className="w-4 h-4 text-sky-400" />
                <span>
                  {lang === 'bn' ? config.hero.ctaSecondaryTextBn : config.hero.ctaSecondaryTextEn}
                </span>
              </a>
            </EditableElement>
          </div>
        </div>

        {/* DESKTOP LAYOUT (hidden lg:grid lg:grid-cols-12) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          {/* Left Column: Typography and CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:space-y-7 text-left my-auto"
          >
            {/* Status Badge */}
            <EditableElement elementId="hero.badge" label="স্ট্যাটাস ব্যাজ" elementType="badge" className="w-fit">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0d0e12]/90 border border-sky-500/40 text-slate-200 text-xs font-semibold tracking-wider uppercase backdrop-blur-xl shadow-[0_0_20px_rgba(56,189,248,0.22)] w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-white font-bold tracking-wider">
                  {lang === 'bn' ? config.hero.badgeTextBn : config.hero.badgeTextEn}
                </span>
                <span className="text-slate-500">•</span>
                <span
                  className="font-bold tracking-wider"
                  style={{ color: config.theme.accentColor }}
                >
                  {lang === 'bn' ? config.hero.badgeRoleBn : config.hero.badgeRoleEn}
                </span>
              </div>
            </EditableElement>

            {/* Main Name Heading */}
            <EditableElement
              elementId="hero.title"
              label="মূল নাম / টাইটেল"
              elementType="heading"
              className="w-full"
              inlineText={`${firstName} ${lastName}`}
              onInlineTextChange={(val) => {
                const parts = val.trim().split(' ');
                if (parts.length > 1) {
                  updateSection('hero', {
                    titleFirst: parts.slice(0, -1).join(' '),
                    titleLast: parts[parts.length - 1],
                  });
                } else {
                  updateSection('hero', { titleFirst: val, titleLast: '' });
                }
              }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.93] uppercase select-none">
                <span className="block text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                  {firstName}
                </span>
                <span
                  className="block bg-clip-text text-transparent drop-shadow-[0_4px_32px_rgba(56,189,248,0.45)]"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${config.theme.accentColor}, ${config.theme.accentSecondary})`,
                  }}
                >
                  {lastName}
                </span>
              </h1>
            </EditableElement>

            {/* Subtitle */}
            <EditableElement
              elementId="hero.subtitle"
              label="সাবটাইটেল ও ডেজিগনেশন"
              elementType="text"
              className="w-full"
              inlineText={lang === 'bn' ? config.hero.subtitleBn : config.hero.subtitleEn}
              onInlineTextChange={(val) => {
                updateSection('hero', lang === 'bn' ? { subtitleBn: val } : { subtitleEn: val });
              }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-[34px] xl:text-[38px] font-extrabold text-white tracking-tight leading-snug drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] max-w-xl">
                {lang === 'bn' ? config.hero.subtitleBn : config.hero.subtitleEn}
              </h2>
            </EditableElement>

            {/* Desktop Action Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <EditableElement elementId="hero.cta_primary" label="বাটন: Explore Works" elementType="button">
                <a
                  href={config.hero.ctaPrimaryLink || '#portfolio'}
                  className="inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl text-slate-950 font-black text-sm tracking-wide shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${config.theme.accentSecondary}, ${config.theme.accentColor})`,
                  }}
                >
                  <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
                  <span>
                    {lang === 'bn' ? config.hero.ctaPrimaryTextBn : config.hero.ctaPrimaryTextEn}
                  </span>
                </a>
              </EditableElement>

              <EditableElement elementId="hero.cta_secondary" label="বাটন: Let's Talk" elementType="button">
                <a
                  href={config.hero.ctaSecondaryLink || '#contact'}
                  className="inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[#0e1017]/90 hover:bg-[#181a24] text-slate-200 hover:text-white font-bold text-sm tracking-wide border border-white/15 hover:border-sky-400/60 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer backdrop-blur-xl shadow-lg"
                >
                  <Send className="w-4 h-4 text-sky-400" />
                  <span>
                    {lang === 'bn' ? config.hero.ctaSecondaryTextBn : config.hero.ctaSecondaryTextEn}
                  </span>
                </a>
              </EditableElement>
            </div>
          </motion.div>

          {/* Right Column: Hero Portrait Image */}
          <div className="lg:col-span-5 flex items-center justify-end relative">
            <EditableElement elementId="hero.avatar" label="আমির হামজা ছবি" elementType="image">
              <motion.div
                initial={{ opacity: 0, x: 160 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-none flex items-end justify-center"
              >
                <div
                  className="relative w-full h-[480px] md:h-[540px] lg:h-[580px] flex items-end justify-center overflow-visible"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
                  }}
                >
                  <img
                    src={avatarUrl}
                    alt={`${firstName} ${lastName}`}
                    loading="eager"
                    decoding="async"
                    onError={handleAvatarError}
                    className="w-full h-full object-contain object-bottom select-none pointer-events-none"
                    style={{
                      filter: `drop-shadow(0 0 2px ${config.theme.accentColor}) drop-shadow(0 0 7px ${config.theme.accentColor}99) drop-shadow(0 0 14px ${config.theme.accentSecondary}55) contrast(106%) brightness(104%)`,
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            </EditableElement>
          </div>
        </div>
      </div>
    </section>
  );
};
