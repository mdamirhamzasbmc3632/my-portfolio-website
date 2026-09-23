import React, { useState } from 'react';
import {
  Sliders,
  Type,
  Palette,
  Layout,
  Link as LinkIcon,
  Image as ImageIcon,
  X,
  Check,
  RotateCcw,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eye,
  EyeOff,
  Sparkles,
  MoveLeft,
  MoveRight,
  Layers,
  ChevronRight,
  Plus,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { ElementStyleOverride } from '../types';

export const ElementorInspector: React.FC = () => {
  const {
    config,
    updateSection,
    updateProfile,
    updateElementStyle,
    resetElementStyle,
    selectedElementId,
    setSelectedElementId,
    isElementorPanelOpen,
    setIsElementorPanelOpen,
    dockPosition,
    setDockPosition,
  } = useSiteConfig();

  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'advanced'>('content');
  const [saveToast, setSaveToast] = useState(false);

  if (!isElementorPanelOpen) return null;

  const currentElementId = selectedElementId || 'hero.title';
  const elementStyle: ElementStyleOverride = config.elementStyles?.[currentElementId] || {};

  const triggerSaveToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleStyleChange = (key: keyof ElementStyleOverride, value: any) => {
    updateElementStyle(currentElementId, { [key]: value });
    triggerSaveToast();
  };

  const handleResetCurrentElementStyle = () => {
    resetElementStyle(currentElementId);
    triggerSaveToast();
  };

  // Human-readable labels for elements
  const getElementMeta = (id: string) => {
    switch (id) {
      case 'hero.badge':
        return { section: 'Hero', title: 'স্ট্যাটাস ব্যাজ (Available for work)', type: 'Badge' };
      case 'hero.title':
        return { section: 'Hero', title: 'মূল নাম / টাইটেল (AMIR HAMZA)', type: 'Heading' };
      case 'hero.subtitle':
        return { section: 'Hero', title: 'সাবটাইটেল ও ডেজিগনেশন', type: 'Text' };
      case 'hero.cta_primary':
        return { section: 'Hero', title: 'প্রাইমারি বাটন (Explore Works)', type: 'Button' };
      case 'hero.cta_secondary':
        return { section: 'Hero', title: 'সেকেন্ডারি বাটন (Let\'s Talk)', type: 'Button' };
      case 'hero.avatar':
        return { section: 'Hero', title: 'আমির হামজা ছবি (Main Photo)', type: 'Image' };
      case 'hero.background':
        return { section: 'Hero', title: 'ব্যাকগ্রাউন্ড ছবি (BG Photo)', type: 'Image' };
      case 'hero.stats':
        return { section: 'Hero', title: 'কাউন্টার স্ট্যাটস (Stats Box)', type: 'Container' };
      case 'portfolio.header':
        return { section: 'Portfolio', title: 'পোর্টফোলিও সেকশন হেডার', type: 'Heading' };
      case 'portfolio.videos':
        return { section: 'Portfolio', title: 'ভিডিও প্রজেক্টস শোকেস', type: 'Grid / List' };
      case 'portfolio.designs':
        return { section: 'Portfolio', title: 'গ্রাফিক্স ডিজাইন শোকেস', type: 'Grid / List' };
      case 'expertise.header':
        return { section: 'Expertise', title: 'স্কিলস সেকশন হেডার', type: 'Heading' };
      case 'expertise.cards':
        return { section: 'Expertise', title: 'কোর স্কিলস কার্ডসমূহ', type: 'Cards' };
      case 'expertise.tools':
        return { section: 'Expertise', title: 'সফটওয়্যার টুলস স্ট্যাক', type: 'Pills' };
      case 'education.header':
        return { section: 'Education', title: 'শিক্ষা সেকশন হেডার', type: 'Heading' };
      case 'education.academic':
        return { section: 'Education', title: 'প্রাতিষ্ঠানিক শিক্ষা (Academic)', type: 'Cards' };
      case 'education.training':
        return { section: 'Education', title: 'আস-সুন্নাহ ট্রেনিং (SBMC)', type: 'Card' };
      case 'contact.header':
        return { section: 'Contact', title: 'যোগাযোগ সেকশন হেডার', type: 'Heading' };
      case 'contact.email':
        return { section: 'Contact', title: 'অফিসিয়াল ইমেইল কার্ড', type: 'Card' };
      case 'contact.whatsapp':
        return { section: 'Contact', title: 'হোয়াটসঅ্যাপ ডিরেক্ট কার্ড', type: 'Card' };
      case 'contact.socials':
        return { section: 'Contact', title: 'ফেসবুক ও ইনস্টাগ্রাম লিংক', type: 'Card' };
      case 'contact.location':
        return { section: 'Contact', title: 'কর্মস্থল ও ঠিকানা ব্যানার', type: 'Banner' };
      case 'footer.content':
        return { section: 'Footer', title: 'ফুটার ও কপিরাইট', type: 'Footer' };
      default:
        return { section: 'Element', title: id, type: 'Widget' };
    }
  };

  const meta = getElementMeta(currentElementId);

  // Quick preset colors for styling
  const quickColors = [
    { label: 'হোয়াইট', value: '#ffffff' },
    { label: 'স্কাই ব্লু', value: '#38bdf8' },
    { label: 'সায়ান', value: '#06b6d4' },
    { label: 'পান্না সবুজ', value: '#10b981' },
    { label: 'হলুদ সোনালী', value: '#f59e0b' },
    { label: 'রোজ পিংক', value: '#f43f5e' },
    { label: 'পার্পল', value: '#c084fc' },
    { label: 'সফট গ্রে', value: '#94a3b8' },
  ];

  return (
    <aside
      id="elementor-inspector-panel"
      className={`fixed top-12 bottom-0 z-40 w-full sm:w-96 bg-[#0b0f19]/98 border-y sm:border-y-0 ${
        dockPosition === 'left' ? 'left-0 sm:border-r border-sky-500/30' : 'right-0 sm:border-l border-sky-500/30'
      } backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col transition-all duration-300 animate-in fade-in`}
    >
      {/* Panel Top Header (Elementor Style) */}
      <div className="px-4 py-3 bg-[#0d1322] border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-tr from-purple-600 to-sky-400 flex items-center justify-center text-white font-black text-xs font-mono shadow-sm">
            E
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-sky-400 flex items-center gap-1">
              <span>{meta.section}</span>
              <ChevronRight className="w-3 h-3" />
              <span>{meta.type}</span>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px]">
              {meta.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Dock position toggle */}
          <button
            type="button"
            onClick={() => setDockPosition(dockPosition === 'left' ? 'right' : 'left')}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={dockPosition === 'left' ? 'ডানপাশে ডক করুন' : 'বামপাশে ডক করুন'}
          >
            {dockPosition === 'left' ? <MoveRight className="w-3.5 h-3.5" /> : <MoveLeft className="w-3.5 h-3.5" />}
          </button>

          {/* Close panel */}
          <button
            type="button"
            onClick={() => setIsElementorPanelOpen(false)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-300 transition-colors cursor-pointer"
            title="প্যানেল বন্ধ করুন"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Elementor 3-Tab Bar (Content | Style | Advanced) */}
      <div className="grid grid-cols-3 bg-[#080c14] border-b border-white/10 text-xs font-bold shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
            activeTab === 'content'
              ? 'border-sky-400 text-sky-300 bg-sky-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>কন্টেন্ট</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('style')}
          className={`py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
            activeTab === 'style'
              ? 'border-sky-400 text-sky-300 bg-sky-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>স্টাইল</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('advanced')}
          className={`py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
            activeTab === 'advanced'
              ? 'border-sky-400 text-sky-300 bg-sky-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>অ্যাডভান্সড</span>
        </button>
      </div>

      {/* Save feedback toast */}
      {saveToast && (
        <div className="mx-4 mt-2 py-1 px-3 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold flex items-center gap-1.5 animate-in fade-in">
          <Check className="w-3 h-3 text-emerald-400" />
          <span>পরিবর্তন স্বয়ংক্রিয়ভাবে সেভ হয়েছে!</span>
        </div>
      )}

      {/* Tab Body with Custom Scroll */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-slate-300 text-xs">
        {/* ================================================================ */}
        {/* TAB 1: CONTENT (কন্টেন্ট)                                         */}
        {/* ================================================================ */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            {/* HERO BADGE */}
            {currentElementId === 'hero.badge' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    ব্যাজ লেখা (ইংরেজি)
                  </label>
                  <input
                    type="text"
                    value={config.hero.badgeTextEn}
                    onChange={(e) => updateSection('hero', { badgeTextEn: e.target.value })}
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    ব্যাজ লেখা (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={config.hero.badgeTextBn}
                    onChange={(e) => updateSection('hero', { badgeTextBn: e.target.value })}
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    রোল ব্যাজ (যেমন: Video Editor)
                  </label>
                  <input
                    type="text"
                    value={config.hero.badgeRoleEn}
                    onChange={(e) => updateSection('hero', { badgeRoleEn: e.target.value })}
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
            )}

            {/* HERO TITLE */}
            {currentElementId === 'hero.title' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    নামের প্রথমাংশ (First Part)
                  </label>
                  <input
                    type="text"
                    value={config.hero.titleFirst}
                    onChange={(e) => updateSection('hero', { titleFirst: e.target.value })}
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    নামের দ্বিতীয়াংশ (Second Part - Highlighted)
                  </label>
                  <input
                    type="text"
                    value={config.hero.titleLast}
                    onChange={(e) => updateSection('hero', { titleLast: e.target.value })}
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white font-bold"
                  />
                </div>
                <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-sky-300 block">টিপস:</span>
                  <p className="text-[11px] text-slate-300">
                    নামের দ্বিতীয় অংশটি অ্যাকসেন্ট কালার (Sky Blue / Emerald) গ্রেডিয়েন্টে প্রদর্শিত হয়। স্টাইল ট্যাব থেকে কালার কাস্টমাইজ করতে পারবেন।
                  </p>
                </div>
              </div>
            )}

            {/* HERO SUBTITLE */}
            {currentElementId === 'hero.subtitle' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    সাবটাইটেল ও বায়ো (ইংরেজি)
                  </label>
                  <textarea
                    rows={3}
                    value={config.hero.subtitleEn}
                    onChange={(e) => updateSection('hero', { subtitleEn: e.target.value })}
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    সাবটাইটেল ও বায়ো (বাংলা)
                  </label>
                  <textarea
                    rows={3}
                    value={config.hero.subtitleBn}
                    onChange={(e) => updateSection('hero', { subtitleBn: e.target.value })}
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
            )}

            {/* HERO CTA BUTTONS */}
            {(currentElementId === 'hero.cta_primary' || currentElementId === 'hero.cta_secondary') && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    বাটন টেক্সট (ইংরেজি)
                  </label>
                  <input
                    type="text"
                    value={
                      currentElementId === 'hero.cta_primary'
                        ? config.hero.ctaPrimaryTextEn
                        : config.hero.ctaSecondaryTextEn
                    }
                    onChange={(e) =>
                      updateSection('hero', {
                        [currentElementId === 'hero.cta_primary'
                          ? 'ctaPrimaryTextEn'
                          : 'ctaSecondaryTextEn']: e.target.value,
                      })
                    }
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    বাটন টেক্সট (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={
                      currentElementId === 'hero.cta_primary'
                        ? config.hero.ctaPrimaryTextBn
                        : config.hero.ctaSecondaryTextBn
                    }
                    onChange={(e) =>
                      updateSection('hero', {
                        [currentElementId === 'hero.cta_primary'
                          ? 'ctaPrimaryTextBn'
                          : 'ctaSecondaryTextBn']: e.target.value,
                      })
                    }
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1 flex items-center gap-1">
                    <LinkIcon className="w-3 h-3 text-sky-400" />
                    <span>বাটন লিংক / ডেস্টিনেশন</span>
                  </label>
                  <input
                    type="text"
                    value={
                      currentElementId === 'hero.cta_primary'
                        ? config.hero.ctaPrimaryLink
                        : config.hero.ctaSecondaryLink
                    }
                    onChange={(e) =>
                      updateSection('hero', {
                        [currentElementId === 'hero.cta_primary'
                          ? 'ctaPrimaryLink'
                          : 'ctaSecondaryLink']: e.target.value,
                      })
                    }
                    placeholder="#portfolio অথবা https://..."
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white font-mono text-xs"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">
                    সেকশনে জাম্প করতে যেমন: #portfolio, #contact অথবা যেকোনো বাহ্যিক URL
                  </span>
                </div>
              </div>
            )}

            {/* HERO PHOTOS (AVATAR & BG) */}
            {(currentElementId === 'hero.avatar' || currentElementId === 'hero.background') && (
              <div className="space-y-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-sky-300 font-bold text-xs">
                    <ImageIcon className="w-4 h-4 text-sky-400" />
                    <span>
                      {currentElementId === 'hero.avatar'
                        ? 'আমির হামজা ছবি (Amir hamza png.png)'
                        : 'ব্যাকগ্রাউন্ড ছবি (IMG_20240226_120641~2.jpg)'}
                    </span>
                  </div>
                  <div className="h-28 rounded-lg overflow-hidden border border-white/10 bg-[#050608] flex items-center justify-center">
                    <img
                      src={
                        currentElementId === 'hero.avatar'
                          ? config.profile.defaultAvatar
                          : config.profile.defaultBackground
                      }
                      alt="Preview"
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = '/amir-white-punjabi-default.jpg';
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    ছবির সরাসরি লিংক / পাথ
                  </label>
                  <input
                    type="text"
                    value={
                      currentElementId === 'hero.avatar'
                        ? config.profile.defaultAvatar
                        : config.profile.defaultBackground
                    }
                    onChange={(e) =>
                      updateProfile({
                        [currentElementId === 'hero.avatar'
                          ? 'defaultAvatar'
                          : 'defaultBackground']: e.target.value,
                      })
                    }
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    ডিভাইস থেকে আপলোড করুন (ছবি পরিবর্তন)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          const result = ev.target?.result as string;
                          if (result) {
                            updateProfile({
                              [currentElementId === 'hero.avatar'
                                ? 'defaultAvatar'
                                : 'defaultBackground']: result,
                            });
                            triggerSaveToast();
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-sky-500 file:text-slate-950 hover:file:bg-sky-400 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* PORTFOLIO HEADER */}
            {currentElementId === 'portfolio.header' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    টাইটেল (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={config.portfolio.titleBn}
                    onChange={(e) => updateSection('portfolio', { titleBn: e.target.value })}
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    হাইলাইট করা শব্দ (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={config.portfolio.highlightWordBn}
                    onChange={(e) => updateSection('portfolio', { highlightWordBn: e.target.value })}
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    বিবরণ (বাংলা)
                  </label>
                  <textarea
                    rows={3}
                    value={config.portfolio.descBn}
                    onChange={(e) => updateSection('portfolio', { descBn: e.target.value })}
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
            )}

            {/* CONTACT CARDS & CHANNELS */}
            {(currentElementId === 'contact.email' ||
              currentElementId === 'contact.whatsapp' ||
              currentElementId === 'contact.socials') && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    ইমেইল ঠিকানা (Email)
                  </label>
                  <input
                    type="email"
                    value={config.profile.email}
                    onChange={(e) => updateProfile({ email: e.target.value })}
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    হোয়াটসঅ্যাপ নম্বর (WhatsApp)
                  </label>
                  <input
                    type="text"
                    value={config.profile.whatsapp}
                    onChange={(e) => updateProfile({ whatsapp: e.target.value })}
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    হোয়াটসঅ্যাপ সরাসরি লিংক (wa.me Link)
                  </label>
                  <input
                    type="url"
                    value={config.profile.whatsappUrl || 'https://wa.me/8801716689667'}
                    onChange={(e) => updateProfile({ whatsappUrl: e.target.value })}
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    ফেসবুক প্রোফাইল URL
                  </label>
                  <input
                    type="url"
                    value={config.profile.socials.facebook}
                    onChange={(e) =>
                      updateProfile({
                        socials: { ...config.profile.socials, facebook: e.target.value },
                      })
                    }
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white font-mono text-xs"
                  />
                </div>
              </div>
            )}

            {/* LOCATION BANNER */}
            {currentElementId === 'contact.location' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    বর্তমান কর্মস্থল ও ঠিকানা
                  </label>
                  <input
                    type="text"
                    value={config.profile.location}
                    onChange={(e) => updateProfile({ location: e.target.value })}
                    className="w-full bg-[#0d1322] border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
            )}

            {/* GENERIC / FALLBACK TEXT EDIT */}
            {!['hero.badge', 'hero.title', 'hero.subtitle', 'hero.cta_primary', 'hero.cta_secondary', 'hero.avatar', 'hero.background', 'portfolio.header', 'contact.email', 'contact.whatsapp', 'contact.socials', 'contact.location'].includes(currentElementId) && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-sky-300 font-bold">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>{meta.title}</span>
                </div>
                <p className="text-xs text-slate-400">
                  এই এলিমেন্টের স্টাইল, কালার, সাইজ ও মার্জিন পরিবর্তন করতে পাশের <strong>স্টাইল</strong> ও <strong>অ্যাডভান্সড</strong> ট্যাব ব্যবহার করুন।
                </p>
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 2: STYLE (স্টাইল)                                             */}
        {/* ================================================================ */}
        {activeTab === 'style' && (
          <div className="space-y-5">
            {/* TEXT COLOR */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-300 flex items-center justify-between">
                <span>টেক্সট কালার (Text Color)</span>
                <span className="font-mono text-sky-400">{elementStyle.color || 'ডিফল্ট'}</span>
              </label>

              {/* Color Preset Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {quickColors.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => handleStyleChange('color', c.value)}
                    className="w-6 h-6 rounded-full border border-white/20 hover:scale-110 transition-transform cursor-pointer shadow-sm relative"
                    style={{ backgroundColor: c.value }}
                    title={c.label}
                  >
                    {elementStyle.color === c.value && (
                      <Check className="w-3 h-3 text-black absolute inset-0 m-auto" />
                    )}
                  </button>
                ))}
              </div>

              {/* Custom Color Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="color"
                  value={elementStyle.color || '#38bdf8'}
                  onChange={(e) => handleStyleChange('color', e.target.value)}
                  className="w-8 h-8 rounded border border-white/10 bg-transparent cursor-pointer p-0"
                />
                <input
                  type="text"
                  placeholder="#38bdf8"
                  value={elementStyle.color || ''}
                  onChange={(e) => handleStyleChange('color', e.target.value)}
                  className="flex-1 bg-[#0d1322] border border-white/10 rounded-lg p-1.5 text-white font-mono text-xs"
                />
              </div>
            </div>

            {/* FONT SIZE SLIDER / BUTTONS */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <label className="block text-[11px] font-bold text-slate-300">
                ফন্ট সাইজ (Font Size)
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: 'ছোট (SM)', val: '14px' },
                  { label: 'নরমাল (MD)', val: '16px' },
                  { label: 'বড় (LG)', val: '20px' },
                  { label: 'এক্সট্রা (XL)', val: '28px' },
                  { label: '2XL', val: '36px' },
                  { label: '3XL', val: '48px' },
                  { label: '4XL', val: '56px' },
                  { label: 'জায়ান্ট', val: '72px' },
                ].map((s) => (
                  <button
                    key={s.val}
                    type="button"
                    onClick={() => handleStyleChange('fontSize', s.val)}
                    className={`py-1.5 px-1 text-[11px] rounded-lg font-medium border transition-colors cursor-pointer text-center ${
                      elementStyle.fontSize === s.val
                        ? 'bg-sky-500 text-slate-950 border-sky-400 font-bold'
                        : 'bg-white/5 text-slate-400 hover:text-white border-white/10'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TEXT ALIGNMENT */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <label className="block text-[11px] font-bold text-slate-300">
                অ্যালাইনমেন্ট (Text Alignment)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'left', label: 'বামপাশে', icon: <AlignLeft className="w-3.5 h-3.5" /> },
                  { id: 'center', label: 'মাঝখানে', icon: <AlignCenter className="w-3.5 h-3.5" /> },
                  { id: 'right', label: 'ডানপাশে', icon: <AlignRight className="w-3.5 h-3.5" /> },
                ].map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => handleStyleChange('textAlign', a.id)}
                    className={`py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 border transition-colors cursor-pointer ${
                      elementStyle.textAlign === a.id
                        ? 'bg-sky-500 text-slate-950 border-sky-400'
                        : 'bg-white/5 text-slate-400 hover:text-white border-white/10'
                    }`}
                  >
                    {a.icon}
                    <span>{a.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* BACKGROUND COLOR */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <label className="block text-[11px] font-bold text-slate-300">
                ব্যাকগ্রাউন্ড কালার (Background Color)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={elementStyle.backgroundColor || '#090d16'}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="w-8 h-8 rounded border border-white/10 bg-transparent cursor-pointer p-0"
                />
                <input
                  type="text"
                  placeholder="স্বচ্ছ বা রঙ (যেমন: rgba(56,189,248,0.1))"
                  value={elementStyle.backgroundColor || ''}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="flex-1 bg-[#0d1322] border border-white/10 rounded-lg p-1.5 text-white font-mono text-xs"
                />
              </div>
            </div>

            {/* PADDING & SPACING */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <label className="block text-[11px] font-bold text-slate-300">
                প্যাডিং ও স্পেসিং (Padding)
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: 'কোনোটি না', val: '0px' },
                  { label: 'ছোট (8px)', val: '8px' },
                  { label: 'মাঝারি (16px)', val: '16px' },
                  { label: 'বড় (24px)', val: '24px' },
                ].map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    onClick={() => handleStyleChange('padding', p.val)}
                    className={`py-1.5 text-[11px] rounded-lg font-medium border transition-colors cursor-pointer text-center ${
                      elementStyle.padding === p.val
                        ? 'bg-sky-500 text-slate-950 border-sky-400 font-bold'
                        : 'bg-white/5 text-slate-400 hover:text-white border-white/10'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* BORDER RADIUS */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <label className="block text-[11px] font-bold text-slate-300">
                বর্ডার কার্ভ বা রাউন্ডনেস (Corner Radius)
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: 'সোজা (0)', val: '0px' },
                  { label: 'নরমাল (8px)', val: '8px' },
                  { label: 'গোলাকার (16px)', val: '16px' },
                  { label: 'পিল (999px)', val: '9999px' },
                ].map((r) => (
                  <button
                    key={r.val}
                    type="button"
                    onClick={() => handleStyleChange('borderRadius', r.val)}
                    className={`py-1.5 text-[11px] rounded-lg font-medium border transition-colors cursor-pointer text-center ${
                      elementStyle.borderRadius === r.val
                        ? 'bg-sky-500 text-slate-950 border-sky-400 font-bold'
                        : 'bg-white/5 text-slate-400 hover:text-white border-white/10'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* RESET STYLES FOR THIS ELEMENT */}
            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleResetCurrentElementStyle}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>এই এলিমেন্টের কাস্টম স্টাইল রিসেট করুন</span>
              </button>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 3: ADVANCED (অ্যাডভান্সড)                                      */}
        {/* ================================================================ */}
        {activeTab === 'advanced' && (
          <div className="space-y-5">
            {/* VISIBILITY TOGGLE */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">এলিমেন্ট প্রদর্শন (Visibility)</span>
                  <span className="text-[11px] text-slate-400">
                    {elementStyle.hidden ? 'বর্তমানে লুকানো রয়েছে' : 'ওয়েবসাইটে দৃশ্যমান'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleStyleChange('hidden', !elementStyle.hidden)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border ${
                    elementStyle.hidden
                      ? 'bg-red-500/20 text-red-300 border-red-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {elementStyle.hidden ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>লুকানো</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>দৃশ্যমান</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* OPACITY SLIDER */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-300 flex items-center justify-between">
                <span>স্বচ্ছতা (Opacity)</span>
                <span className="font-mono text-sky-400">
                  {elementStyle.opacity !== undefined ? `${Math.round(elementStyle.opacity * 100)}%` : '100%'}
                </span>
              </label>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.1"
                value={elementStyle.opacity !== undefined ? elementStyle.opacity : 1}
                onChange={(e) => handleStyleChange('opacity', parseFloat(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            {/* BORDER STROKE */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <label className="block text-[11px] font-bold text-slate-300">
                বর্ডার বা আউটলাইন স্ট্রোক
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'নেই', w: '0px' },
                  { label: 'পাতলা (1px)', w: '1px solid rgba(56,189,248,0.4)' },
                  { label: 'স্পষ্ট (2px)', w: '2px solid rgba(56,189,248,0.8)' },
                ].map((b) => (
                  <button
                    key={b.label}
                    type="button"
                    onClick={() => handleStyleChange('borderWidth', b.w)}
                    className="py-1.5 px-2 text-[11px] rounded-lg font-medium bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer text-center"
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TECHNICAL DETAILS */}
            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1 font-mono text-[10px] text-slate-500">
              <div>Elementor ID: <span className="text-sky-400">{currentElementId}</span></div>
              <div>DOM Selector: <span className="text-slate-400">[data-elementor-id="{currentElementId}"]</span></div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-3 bg-[#0d1322] border-t border-white/10 flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={() => setIsElementorPanelOpen(false)}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 hover:from-sky-400 hover:to-teal-300 text-slate-950 font-black text-xs shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Check className="w-4 h-4" />
          <span>সম্পন্ন (Done Editing)</span>
        </button>
      </div>
    </aside>
  );
};
