import React, { useState } from 'react';
import {
  Palette,
  Layout,
  Type,
  Maximize2,
  FolderKanban,
  Zap,
  GraduationCap,
  Phone,
  Eye,
  RotateCcw,
  Download,
  Upload,
  X,
  Check,
  Plus,
  Trash2,
  ExternalLink,
  Sliders,
  Sparkles,
  Link as LinkIcon,
  HelpCircle,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { VideoProject } from '../types';

interface SiteEditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: string | null;
}

export const SiteEditorDrawer: React.FC<SiteEditorDrawerProps> = ({
  isOpen,
  onClose,
  defaultTab = 'theme',
}) => {
  const {
    config,
    updateConfig,
    updateTheme,
    updateSection,
    resetConfig,
    exportConfig,
    importConfig,
    isEditMode,
    setIsEditMode,
  } = useSiteConfig();

  const [activeTab, setActiveTab] = useState<string>(defaultTab || 'theme');
  const [saveToast, setSaveToast] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  // Sync active tab if passed from outside
  React.useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  if (!isOpen) return null;

  const showSaveSuccess = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importConfig(content);
        if (success) {
          showSaveSuccess();
          setImportError(null);
        } else {
          setImportError('Invalid JSON configuration file');
        }
      }
    };
    reader.readAsText(file);
  };

  const colorPresets = [
    {
      id: 'sky',
      name: 'Sky Blue & Mint (ডিফল্ট)',
      primary: '#38bdf8',
      secondary: '#10b981',
    },
    {
      id: 'teal',
      name: 'Electric Cyan & Blue',
      primary: '#06b6d4',
      secondary: '#3b82f6',
    },
    {
      id: 'emerald',
      name: 'Emerald Green',
      primary: '#10b981',
      secondary: '#14b8a6',
    },
    {
      id: 'violet',
      name: 'Royal Purple & Violet',
      primary: '#a855f7',
      secondary: '#6366f1',
    },
    {
      id: 'amber',
      name: 'Sunset Gold & Amber',
      primary: '#f59e0b',
      secondary: '#ef4444',
    },
    {
      id: 'rose',
      name: 'Crimson Rose & Pink',
      primary: '#f43f5e',
      secondary: '#fb7185',
    },
  ];

  const bgTonePresets = [
    { id: '#07080a', name: 'Pitch Dark Void (#07080a)' },
    { id: '#0b0f19', name: 'Deep Midnight Slate (#0b0f19)' },
    { id: '#10121a', name: 'Charcoal Studio (#10121a)' },
    { id: '#060c18', name: 'Deep Oceanic Navy (#060c18)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl h-full bg-[#0d0e14] border-l border-sky-500/30 flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#08090d] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  পোর্টফোলিও সেকশন ও সাইজ এডিটর
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Live Builder
                </span>
              </div>
              <p className="text-xs text-slate-400">
                সাইজের মাপ, রঙ, টেক্সট এবং লিংক সরাসরি এডিট করুন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Edit Mode Quick Toggle Banner */}
        <div className="px-4 py-2 bg-sky-950/40 border-b border-sky-500/20 flex items-center justify-between text-xs shrink-0">
          <span className="text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>পেজে সরাসরি এডিট ব্যাজ বাটন দেখান:</span>
          </span>
          <button
            type="button"
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              isEditMode
                ? 'bg-sky-500 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                : 'bg-white/10 text-slate-300 hover:text-white'
            }`}
          >
            {isEditMode ? 'এডিট মোড চালু (ON)' : 'এডিট মোড বন্ধ (OFF)'}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-white/10 bg-[#0a0b10] px-3 py-2 gap-1.5 shrink-0 scrollbar-none">
          {[
            { id: 'theme', label: 'রঙ ও সাইজ', icon: <Palette className="w-4 h-4" /> },
            { id: 'hero', label: 'হিরো সেকশন', icon: <Layout className="w-4 h-4" /> },
            { id: 'portfolio', label: 'প্রজেক্টস', icon: <FolderKanban className="w-4 h-4" /> },
            { id: 'expertise', label: 'স্কিলস ও টুলস', icon: <Zap className="w-4 h-4" /> },
            { id: 'education', label: 'এডুকেশন', icon: <GraduationCap className="w-4 h-4" /> },
            { id: 'contact', label: 'যোগাযোগ ও লিংক', icon: <Phone className="w-4 h-4" /> },
            { id: 'visibility', label: 'ব্যাকআপ ও সেটিংস', icon: <Eye className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-200 text-sm">
          {/* ================= TAB 1: THEME & SIZES ================= */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              {/* 1.1 Color Presets */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  <span>১. প্রাইমারি অ্যাকসেন্ট কালার (Theme Accent Color)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {colorPresets.map((preset) => {
                    const isSelected =
                      config.theme.accentPreset === preset.id ||
                      config.theme.accentColor === preset.primary;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          updateTheme({
                            accentPreset: preset.id as any,
                            accentColor: preset.primary,
                            accentSecondary: preset.secondary,
                          });
                        }}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-white bg-white/10 ring-2 ring-sky-400 shadow-md'
                            : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.06]'
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-full shrink-0 shadow-inner border border-white/20"
                          style={{
                            background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})`,
                          }}
                        />
                        <span className="text-xs font-medium text-slate-200 truncate">
                          {preset.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Color Input */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.theme.accentColor}
                      onChange={(e) => {
                        updateTheme({
                          accentPreset: 'custom',
                          accentColor: e.target.value,
                        });
                      }}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <div className="text-xs">
                      <p className="font-semibold text-white">পছন্দমতো যেকোনো হেক্স রঙ দিন:</p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {config.theme.accentColor}
                      </p>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={config.theme.accentColor}
                    onChange={(e) => {
                      updateTheme({
                        accentPreset: 'custom',
                        accentColor: e.target.value,
                      });
                    }}
                    placeholder="#38bdf8"
                    className="w-24 px-2.5 py-1 rounded-lg bg-black/50 border border-white/20 text-xs font-mono text-center text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              {/* 1.2 Background Tone */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>২. ব্যাকগ্রাউন্ড ক্যানভাস টোন (Background Tone)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {bgTonePresets.map((tone) => (
                    <button
                      key={tone.id}
                      type="button"
                      onClick={() => updateTheme({ bgTone: tone.id })}
                      className={`p-2.5 rounded-xl border text-xs text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        config.theme.bgTone === tone.id
                          ? 'border-sky-400 bg-sky-500/15 text-white font-semibold'
                          : 'border-white/10 bg-white/[0.02] text-slate-300 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full shrink-0 border border-white/30"
                        style={{ backgroundColor: tone.id }}
                      />
                      <span className="truncate">{tone.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 1.3 Section Vertical Spacing (Padding Size) */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>৩. সেকশনের ভার্টিক্যাল প্যাডিং / উচ্চতা সাইজ (Section Padding)</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'compact', label: 'ছোট (Compact)', desc: 'কম ফাঁকা জায়গা (py-12)' },
                    { id: 'normal', label: 'স্বাভাবিক (Normal)', desc: 'ব্যালেন্সড ফাঁকা জায়গা (py-20)' },
                    { id: 'spacious', label: 'বড় (Spacious)', desc: 'বেশি ফাঁকা ও প্রশস্ত (py-28)' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => updateTheme({ sectionPadding: s.id as any })}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        config.theme.sectionPadding === s.id
                          ? 'border-sky-400 bg-sky-500/15 text-white font-bold'
                          : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <p className="text-xs font-bold">{s.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 1.4 Container Max Width */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layout className="w-3.5 h-3.5" />
                  <span>৪. সেকশনের প্রস্থ / কন্টেইনার সাইজ (Container Width)</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'standard', label: 'সাধারণ (Standard)', width: 'max-w-6xl' },
                    { id: 'wide', label: 'প্রশস্ত (Wide)', width: 'max-w-7xl' },
                    { id: 'ultra', label: 'সর্বোচ্চ চওড়া (Ultra)', width: 'max-w-[1440px]' },
                  ].map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => updateTheme({ containerWidth: w.id as any })}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        config.theme.containerWidth === w.id
                          ? 'border-sky-400 bg-sky-500/15 text-white font-bold'
                          : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <p className="text-xs font-bold">{w.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{w.width}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 1.5 Typography Scaling */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5" />
                  <span>৫. লেখার ফন্ট সাইজ স্কেল (Typography Scale)</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'compact', label: 'ছোট ফন্ট (Compact)', desc: 'অল্প জায়গায় বেশি লেখা' },
                    { id: 'normal', label: 'স্বাভাবিক (Balanced)', desc: 'আদর্শ রিডিবিলিটি' },
                    { id: 'large', label: 'বড় ফন্ট (Bold & Large)', desc: 'বড় ও স্পষ্ট হেডিং' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => updateTheme({ fontScale: f.id as any })}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        config.theme.fontScale === f.id
                          ? 'border-sky-400 bg-sky-500/15 text-white font-bold'
                          : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <p className="text-xs font-bold">{f.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{f.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 1.6 Card Border Radius */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>৬. কার্ড ও বাটনের কোণার গোল মাপ (Border Radius)</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'md', label: 'কম গোল', radius: 'rounded-md' },
                    { id: 'xl', label: 'মডার্ন', radius: 'rounded-xl' },
                    { id: '2xl', label: 'বেশি গোল', radius: 'rounded-2xl' },
                    { id: '3xl', label: 'সফট পিল', radius: 'rounded-3xl' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => updateTheme({ cardRadius: r.id as any })}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        config.theme.cardRadius === r.id
                          ? 'border-sky-400 bg-sky-500/15 text-white font-bold'
                          : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <p className="text-xs font-bold">{r.label}</p>
                      <p className="text-[10px] text-slate-400">{r.radius}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: HERO SECTION ================= */}
          {activeTab === 'hero' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-300">
                হিরো সেকশনের নাম, ডেজিগনেশন, সাবটাইটেল এবং বাটন টেক্সট ও লিংক এডিট করুন।
              </div>

              {/* Names */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">নামের প্রথমাংশ (First Name)</label>
                  <input
                    type="text"
                    value={config.hero.titleFirst}
                    onChange={(e) =>
                      updateSection('hero', { titleFirst: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">নামের শেষাংশ (Last Name)</label>
                  <input
                    type="text"
                    value={config.hero.titleLast}
                    onChange={(e) =>
                      updateSection('hero', { titleLast: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              {/* Status Badge */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">ব্যাজ টাইটেল ১ (English)</label>
                  <input
                    type="text"
                    value={config.hero.badgeTextEn}
                    onChange={(e) =>
                      updateSection('hero', { badgeTextEn: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">ব্যাজ টাইটেল ২ (Role English)</label>
                  <input
                    type="text"
                    value={config.hero.badgeRoleEn}
                    onChange={(e) =>
                      updateSection('hero', { badgeRoleEn: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              {/* Subtitles */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">সাবটাইটেল / স্লোগান (English)</label>
                <textarea
                  rows={2}
                  value={config.hero.subtitleEn}
                  onChange={(e) =>
                    updateSection('hero', { subtitleEn: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">সাবটাইটেল / স্লোগান (বাংলা)</label>
                <textarea
                  rows={2}
                  value={config.hero.subtitleBn}
                  onChange={(e) =>
                    updateSection('hero', { subtitleBn: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              {/* CTA Buttons & Links */}
              <div className="pt-2 border-t border-white/10 space-y-3">
                <p className="text-xs font-bold text-sky-400">হিরো বাটন ও লিংকসমূহ</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300">বাটন ১ টেক্সট (Explore Works)</label>
                    <input
                      type="text"
                      value={config.hero.ctaPrimaryTextEn}
                      onChange={(e) =>
                        updateSection('hero', { ctaPrimaryTextEn: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300">বাটন ১ লিংক (Target URL)</label>
                    <input
                      type="text"
                      value={config.hero.ctaPrimaryLink}
                      onChange={(e) =>
                        updateSection('hero', { ctaPrimaryLink: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300">বাটন ২ টেক্সট (Let's Talk)</label>
                    <input
                      type="text"
                      value={config.hero.ctaSecondaryTextEn}
                      onChange={(e) =>
                        updateSection('hero', { ctaSecondaryTextEn: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300">বাটন ২ লিংক (Target URL)</label>
                    <input
                      type="text"
                      value={config.hero.ctaSecondaryLink}
                      onChange={(e) =>
                        updateSection('hero', { ctaSecondaryLink: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: PORTFOLIO & PROJECTS ================= */}
          {activeTab === 'portfolio' && (
            <div className="space-y-5">
              {/* Headings */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                <p className="text-xs font-bold text-sky-400">পোর্টফোলিও সেকশন হেডিং</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">টাইটেল (English)</label>
                    <input
                      type="text"
                      value={config.portfolio.titleEn}
                      onChange={(e) =>
                        updateSection('portfolio', { titleEn: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">হাইলাইটেড শব্দ (English)</label>
                    <input
                      type="text"
                      value={config.portfolio.highlightWordEn}
                      onChange={(e) =>
                        updateSection('portfolio', { highlightWordEn: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-sky-400"
                    />
                  </div>
                </div>
              </div>

              {/* Video Projects List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <FolderKanban className="w-4 h-4 text-sky-400" />
                    <span>ভিডিও প্রজেক্ট তালিকা ({config.portfolio.videoProjects.length}টি)</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const newProj: VideoProject = {
                        id: `custom-video-${Date.now()}`,
                        title: 'New Video Project',
                        titleBn: 'নতুন ভিডিও প্রজেক্ট',
                        category: 'commercial',
                        categoryLabel: 'Commercial Promo',
                        categoryLabelBn: 'কমার্শিয়াল প্রোমো',
                        vimeoId: '1226358153',
                        vimeoEmbedUrl: 'https://player.vimeo.com/video/1226358153?badge=0&autopause=1',
                        thumbnail: 'https://vumbnail.com/1226358153.jpg',
                        duration: 'Promo',
                        client: 'Client Project',
                        views: 'Featured',
                        aspectRatio: '16:9',
                        description: 'Dynamic professional video project with cinematic cuts.',
                        descriptionBn: 'ছন্দময় ও আকর্ষণীয় সিনেমাটিক ভিডিও প্রজেক্ট।',
                        toolsUsed: ['Premiere Pro', 'After Effects'],
                        keyFeatures: ['Cinematic Pacing', 'Sound Design'],
                        keyFeaturesBn: ['সিনেমাটিক পেসিং', 'সাউন্ড ডিজাইন'],
                      };
                      updateSection('portfolio', {
                        videoProjects: [newProj, ...config.portfolio.videoProjects],
                      });
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/40 text-sky-300 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>নতুন ভিডিও যোগ করুন</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                  {config.portfolio.videoProjects.map((proj, idx) => (
                    <div
                      key={proj.id}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                          #{idx + 1}: {proj.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            updateSection('portfolio', {
                              videoProjects: config.portfolio.videoProjects.filter(
                                (p) => p.id !== proj.id
                              ),
                            });
                          }}
                          className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                          title="প্রজেক্টটি মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400">প্রজেক্ট নাম (Title)</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...config.portfolio.videoProjects];
                              updated[idx].title = e.target.value;
                              updateSection('portfolio', { videoProjects: updated });
                            }}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400">ভিডিও আইডি (YouTube / Vimeo ID)</label>
                          <input
                            type="text"
                            value={proj.youtubeId || proj.vimeoId || ''}
                            onChange={(e) => {
                              const updated = [...config.portfolio.videoProjects];
                              const val = e.target.value.trim();
                              if (proj.platform === 'youtube' || proj.youtubeId) {
                                updated[idx].youtubeId = val;
                                updated[idx].youtubeUrl = `https://www.youtube.com/watch?v=${val}`;
                                updated[idx].youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${val}?autoplay=1&rel=0`;
                                updated[idx].thumbnail = `https://i.ytimg.com/vi/${val}/hqdefault.jpg`;
                              } else {
                                updated[idx].vimeoId = val;
                                updated[idx].vimeoEmbedUrl = `https://player.vimeo.com/video/${val}?badge=0&autopause=1`;
                                updated[idx].thumbnail = `https://vumbnail.com/${val}.jpg`;
                              }
                              updateSection('portfolio', { videoProjects: updated });
                            }}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-xs font-mono text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400">ক্লায়েন্ট (Client)</label>
                          <input
                            type="text"
                            value={proj.client}
                            onChange={(e) => {
                              const updated = [...config.portfolio.videoProjects];
                              updated[idx].client = e.target.value;
                              updateSection('portfolio', { videoProjects: updated });
                            }}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400">ক্যাটাগরি (Category)</label>
                          <input
                            type="text"
                            value={proj.categoryLabel}
                            onChange={(e) => {
                              const updated = [...config.portfolio.videoProjects];
                              updated[idx].categoryLabel = e.target.value;
                              updateSection('portfolio', { videoProjects: updated });
                            }}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400">বিবরণ (Description)</label>
                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => {
                            const updated = [...config.portfolio.videoProjects];
                            updated[idx].description = e.target.value;
                            updateSection('portfolio', { videoProjects: updated });
                          }}
                          className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-xs text-slate-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 4: EXPERTISE & SKILLS ================= */}
          {activeTab === 'expertise' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                <p className="text-xs font-bold text-sky-400">স্কিলস সেকশন হেডিং</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">টাইটেল (English)</label>
                    <input
                      type="text"
                      value={config.expertise.titleEn}
                      onChange={(e) =>
                        updateSection('expertise', { titleEn: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">হাইলাইটেড শব্দ (English)</label>
                    <input
                      type="text"
                      value={config.expertise.highlightWordEn}
                      onChange={(e) =>
                        updateSection('expertise', { highlightWordEn: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-sky-400"
                    />
                  </div>
                </div>
              </div>

              {/* Skills Items */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-sky-400" />
                  <span>দক্ষতার বিষয়সমূহ ({config.expertise.items.length}টি)</span>
                </p>
                <div className="space-y-2.5">
                  {config.expertise.items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400">দক্ষতার নাম (English)</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...config.expertise.items];
                              updated[idx].title = e.target.value;
                              updateSection('expertise', { items: updated });
                            }}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-xs text-white font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400">দক্ষতার নাম (বাংলা)</label>
                          <input
                            type="text"
                            value={item.titleBn}
                            onChange={(e) => {
                              const updated = [...config.expertise.items];
                              updated[idx].titleBn = e.target.value;
                              updateSection('expertise', { items: updated });
                            }}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-xs text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400">সংক্ষিপ্ত বিবরণ (Description)</label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...config.expertise.items];
                            updated[idx].description = e.target.value;
                            updateSection('expertise', { items: updated });
                          }}
                          className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-xs text-slate-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 5: EDUCATION & TRAINING ================= */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                <p className="text-xs font-bold text-sky-400">এডুকেশন সেকশন হেডিং</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400">টাইটেল (English)</label>
                    <input
                      type="text"
                      value={config.education.titleEn}
                      onChange={(e) =>
                        updateSection('education', { titleEn: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400">হাইলাইটেড শব্দ</label>
                    <input
                      type="text"
                      value={config.education.highlightWordEn}
                      onChange={(e) =>
                        updateSection('education', { highlightWordEn: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs text-sky-400"
                    />
                  </div>
                </div>
              </div>

              {/* Academics */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-sky-400" />
                  <span>প্রাতিষ্ঠানিক শিক্ষা (Academic Track)</span>
                </p>
                {config.education.academicList.map((acad, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="text-[10px] text-slate-400">ডিগ্রি / পরীক্ষা</label>
                        <input
                          type="text"
                          value={acad.degree}
                          onChange={(e) => {
                            const updated = [...config.education.academicList];
                            updated[idx].degree = e.target.value;
                            updateSection('education', { academicList: updated });
                          }}
                          className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-xs text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400">সাল / ব্যাচ</label>
                        <input
                          type="text"
                          value={acad.year}
                          onChange={(e) => {
                            const updated = [...config.education.academicList];
                            updated[idx].year = e.target.value;
                            updateSection('education', { academicList: updated });
                          }}
                          className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Training */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2.5">
                <p className="text-xs font-bold text-sky-400">প্রফেশনাল স্কিল ট্রেনিং ইনস্টিটিউট</p>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">ইনস্টিটিউটের নাম</label>
                  <input
                    type="text"
                    value={config.education.trainingDataEn.institution}
                    onChange={(e) => {
                      updateSection('education', {
                        trainingDataEn: {
                          ...config.education.trainingDataEn,
                          institution: e.target.value,
                        },
                      });
                    }}
                    className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400">কোর্সের নাম</label>
                    <input
                      type="text"
                      value={config.education.trainingDataEn.courseName}
                      onChange={(e) => {
                        updateSection('education', {
                          trainingDataEn: {
                            ...config.education.trainingDataEn,
                            courseName: e.target.value,
                          },
                        });
                      }}
                      className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400">ব্যাচ নম্বর</label>
                    <input
                      type="text"
                      value={config.education.trainingDataEn.batch}
                      onChange={(e) => {
                        updateSection('education', {
                          trainingDataEn: {
                            ...config.education.trainingDataEn,
                            batch: e.target.value,
                          },
                        });
                      }}
                      className="w-full px-2 py-1 rounded bg-black/40 border border-white/15 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 6: CONTACT & LINKS ================= */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-300">
                আপনার ইমেইল, হোয়াটসঅ্যাপ, সোশ্যাল মিডিয়া লিংক ও যোগাযোগের ঠিকানা সরাসরি আপডেট করুন।
              </div>

              {/* Direct Contacts */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">অফিসিয়াল ইমেইল (Email Address)</label>
                  <input
                    type="email"
                    value={config.profile.email}
                    onChange={(e) => {
                      updateSection('profile', { email: e.target.value });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">হোয়াটসঅ্যাপ নম্বর (WhatsApp Number)</label>
                  <input
                    type="text"
                    value={config.profile.whatsapp}
                    onChange={(e) => {
                      updateSection('profile', { whatsapp: e.target.value });
                    }}
                    placeholder="01716689667"
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">হোয়াটসঅ্যাপ ডিরেক্ট লিংক (WhatsApp Direct Link)</label>
                  <input
                    type="text"
                    value={config.profile.whatsappUrl || 'https://wa.me/8801716689667'}
                    onChange={(e) => {
                      updateSection('profile', { whatsappUrl: e.target.value });
                    }}
                    placeholder="https://wa.me/8801716689667"
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">ঠিকানা / লোকেশন (Location Address)</label>
                  <input
                    type="text"
                    value={config.profile.location}
                    onChange={(e) => {
                      updateSection('profile', { location: e.target.value });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <p className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                  <LinkIcon className="w-4 h-4" />
                  <span>সোশ্যাল মিডিয়া প্রোফাইল লিংকসমূহ</span>
                </p>

                <div className="space-y-2">
                  <div>
                    <label className="text-[11px] text-slate-400">ফেসবুক প্রোফাইল URL (Facebook)</label>
                    <input
                      type="url"
                      value={config.profile.socials.facebook}
                      placeholder="https://www.facebook.com/amirhamzasbmc3632"
                      onChange={(e) => {
                        updateSection('profile', {
                          socials: {
                            ...config.profile.socials,
                            facebook: e.target.value,
                          },
                        });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs font-mono text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400">ইউটিউব চ্যানেল URL (YouTube)</label>
                    <input
                      type="url"
                      value={config.profile.socials.youtube}
                      onChange={(e) => {
                        updateSection('profile', {
                          socials: {
                            ...config.profile.socials,
                            youtube: e.target.value,
                          },
                        });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs font-mono text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400">লিংকডইন প্রোফাইল URL (LinkedIn)</label>
                    <input
                      type="url"
                      value={config.profile.socials.linkedin}
                      onChange={(e) => {
                        updateSection('profile', {
                          socials: {
                            ...config.profile.socials,
                            linkedin: e.target.value,
                          },
                        });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 7: VISIBILITY & BACKUP ================= */}
          {activeTab === 'visibility' && (
            <div className="space-y-6">
              {/* Section Toggles */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>সেকশন চালু বা বন্ধ রাখুন (Section Visibility)</span>
                </p>
                <div className="space-y-2">
                  {[
                    { key: 'hero', label: '১. হিরো সেকশন (Hero Section)' },
                    { key: 'portfolio', label: '২. পোর্টফোলিও সেকশন (Portfolio & Projects)' },
                    { key: 'expertise', label: '৩. স্কিলস সেকশন (Core Expertise)' },
                    { key: 'education', label: '৪. এডুকেশন সেকশন (Education & Training)' },
                    { key: 'contact', label: '৫. কন্টাক্ট সেকশন (Contact Section)' },
                  ].map((sec) => (
                    <div
                      key={sec.key}
                      className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between"
                    >
                      <span className="text-xs font-medium text-white">{sec.label}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const k = sec.key as keyof typeof config.visibility;
                          updateSection('visibility', {
                            [k]: !config.visibility[k],
                          } as any);
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          (config.visibility as any)[sec.key]
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-red-500/20 text-red-400 border border-red-500/40'
                        }`}
                      >
                        {(config.visibility as any)[sec.key] ? 'দৃশ্যমান (Visible)' : 'লুকানো (Hidden)'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backup Export / Import */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <p className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  <span>ব্যাকআপ ও রিস্টোর (Configuration Backup)</span>
                </p>
                <p className="text-xs text-slate-400">
                  আপনার সম্পূর্ণ কাস্টমাইজেশন ও এডিট করা ডেটা কম্পিউটারে ডাউনলোড করে ব্যাকআপ রাখতে পারেন, অথবা পূর্বে সেভ করা ফাইল আপলোড করে রিস্টোর করতে পারেন।
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={exportConfig}
                    className="p-3 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/40 text-sky-300 hover:text-white text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-sky-400" />
                    <span>ব্যাকআপ ফাইল ডাউনলোড (Export)</span>
                  </button>

                  <label className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer">
                    <Upload className="w-4 h-4 text-slate-400" />
                    <span>ব্যাকআপ ফাইল আপলোড (Import)</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportFile}
                      className="hidden"
                    />
                  </label>
                </div>

                {importError && (
                  <p className="text-xs text-red-400 bg-red-950/40 p-2 rounded border border-red-500/30">
                    {importError}
                  </p>
                )}
              </div>

              {/* Reset to Factory Defaults */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <p className="text-xs font-bold text-red-400">সবকিছু ডিফল্টে রিসেট করুন</p>
                <p className="text-[11px] text-slate-400">
                  আপনার করা সকল কাস্টমাইজেশন মুছে দিয়ে ওয়েবসাইটের আদি ও আসল রূপে ফিরবে।
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('আপনি কি নিশ্চিত যে সমস্ত পরিবর্তন ডিফল্টে রিসেট করতে চান?')) {
                      resetConfig();
                      showSaveSuccess();
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>রিসেট করুন (Reset to Defaults)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="p-4 border-t border-white/10 bg-[#08090d] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-400">
              {saveToast ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  সবকিছু সফলভাবে সেভ হয়েছে!
                </span>
              ) : (
                'পরিবর্তনগুলো সাথে সাথে লাইভ সেভ হচ্ছে'
              )}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all cursor-pointer"
          >
            সম্পন্ন (Done)
          </button>
        </div>
      </div>
    </div>
  );
};
