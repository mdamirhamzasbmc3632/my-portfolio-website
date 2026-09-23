import React, { useState } from 'react';
import {
  Sliders,
  Eye,
  EyeOff,
  Check,
  Save,
  RotateCcw,
  Download,
  Upload,
  Sparkles,
  ChevronDown,
  Layers,
  Palette,
  X,
  ChevronUp,
  ExternalLink,
  Laptop,
  Smartphone,
  Tablet,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface ElementorAdminBarProps {
  onOpenGlobalSettings: () => void;
}

export const ElementorAdminBar: React.FC<ElementorAdminBarProps> = ({ onOpenGlobalSettings }) => {
  const {
    isEditMode,
    setIsEditMode,
    isPreviewMode,
    setIsPreviewMode,
    selectedElementId,
    setSelectedElementId,
    isElementorPanelOpen,
    setIsElementorPanelOpen,
    resetConfig,
    exportConfig,
    importConfig,
    dockPosition,
    setDockPosition,
  } = useSiteConfig();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const elementCatalog = [
    { id: 'hero.badge', label: 'Hero - স্ট্যাটাস ব্যাজ (Available for work)' },
    { id: 'hero.title', label: 'Hero - মূল নাম / টাইটেল (Md Amir Hamza)' },
    { id: 'hero.subtitle', label: 'Hero - সাবটাইটেল ও ডেজিগনেশন' },
    { id: 'hero.cta_primary', label: 'Hero - প্রাইমারি বাটন (Explore Works)' },
    { id: 'hero.cta_secondary', label: 'Hero - সেকেন্ডারি বাটন (Let\'s Talk)' },
    { id: 'hero.avatar', label: 'Hero - আমির হামজা ছবি (Main Avatar)' },
    { id: 'hero.background', label: 'Hero - ব্যাকগ্রাউন্ড ছবি (BG Cover)' },
    { id: 'hero.stats', label: 'Hero - এক্সপেরিয়েন্স ও ভিউজ কাউন্টার' },
    { id: 'portfolio.header', label: 'Portfolio - সেকশন হেডার ও ডেসক্রিপশন' },
    { id: 'portfolio.videos', label: 'Portfolio - ভিডিও প্রজেক্টস লিস্ট' },
    { id: 'portfolio.designs', label: 'Portfolio - গ্রাফিক্স ডিজাইন প্রজেক্টস' },
    { id: 'expertise.header', label: 'Expertise - স্কিলস সেকশন হেডার' },
    { id: 'expertise.cards', label: 'Expertise - কোর স্কিল কার্ডসমূহ' },
    { id: 'expertise.tools', label: 'Expertise - সফটওয়্যার টুলস স্ট্যাক' },
    { id: 'education.header', label: 'Education - শিক্ষা সেকশন হেডার' },
    { id: 'education.academic', label: 'Education - প্রাতিষ্ঠানিক শিক্ষা' },
    { id: 'education.training', label: 'Education - আস-সুন্নাহ SBMC ট্রেনিং' },
    { id: 'contact.header', label: 'Contact - যোগাযোগ সেকশন হেডার' },
    { id: 'contact.email', label: 'Contact - অফিসিয়াল ইমেইল কার্ড' },
    { id: 'contact.whatsapp', label: 'Contact - হোয়াটসঅ্যাপ ডিরেক্ট' },
    { id: 'contact.socials', label: 'Contact - ফেসবুক প্রোফাইল' },
    { id: 'contact.location', label: 'Contact - কর্মস্থল ও ঠিকানা ব্যানার' },
    { id: 'footer.content', label: 'Footer - ফুটার ও কপিরাইট' },
  ];

  const handleManualSave = () => {
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
  };

  const handleSelectDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val) {
      setSelectedElementId(val);
      setIsElementorPanelOpen(true);
      // Scroll to element
      const target = document.querySelector(`[data-elementor-id="${val}"]`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  if (isCollapsed) {
    return (
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2">
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="px-3.5 py-1.5 rounded-full bg-[#0b1120]/95 border border-sky-500/40 text-sky-400 text-xs font-bold shadow-2xl backdrop-blur-xl flex items-center gap-2 hover:bg-sky-500 hover:text-slate-950 transition-all cursor-pointer"
          title="এলিমেন্টর অ্যাডমিন বার খুলুন"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>এলিমেন্টর অ্যাডমিন বার</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div
      id="elementor-admin-topbar"
      className="sticky top-0 left-0 right-0 z-50 bg-[#090d16]/95 border-b border-sky-500/30 backdrop-blur-xl shadow-2xl text-slate-200 text-xs select-none"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Elementor Pro Badge + Mode Switch */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#9333ea] to-[#38bdf8] text-white font-black text-[11px] shadow-sm tracking-wider">
            <span className="font-mono text-sm leading-none">E</span>
            <span>এলিমেন্টর মোড</span>
          </div>

          {/* On/Off Switch */}
          <button
            type="button"
            onClick={() => setIsEditMode((prev) => !prev)}
            className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
              isEditMode
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isEditMode ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
              }`}
            />
            <span>{isEditMode ? 'এডিটর চালু' : 'এডিটর বন্ধ'}</span>
          </button>

          {/* Open Elementor Inspector Button */}
          <button
            type="button"
            onClick={() => setIsElementorPanelOpen(!isElementorPanelOpen)}
            className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer border transition-all ${
              isElementorPanelOpen
                ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                : 'bg-sky-500/15 text-sky-300 hover:bg-sky-500/25 border-sky-500/35'
            }`}
            title="এলিমেন্টর ইন্সপেক্টর সাইডবার খুলুন বা বন্ধ করুন"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>ইন্সপেক্টর প্যানেল</span>
          </button>
        </div>

        {/* Center: Element Quick Jumper Dropdown */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#0f172a] border border-white/10 rounded-lg px-2 py-1 text-slate-300">
            <Layers className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="text-[11px] text-slate-400">এলিমেন্ট:</span>
            <select
              value={selectedElementId || ''}
              onChange={handleSelectDropdown}
              className="bg-transparent text-white font-medium text-xs focus:outline-none cursor-pointer pr-1"
            >
              <option value="" className="bg-[#0b1120] text-slate-400">
                -- সিলেক্ট করে এডিট করুন --
              </option>
              {elementCatalog.map((el) => (
                <option key={el.id} value={el.id} className="bg-[#0b1120] text-white">
                  {el.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Preview, Global Settings, Save, Export, Collapse */}
        <div className="flex items-center gap-2">
          {/* Visitor Preview Toggle */}
          <button
            type="button"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 cursor-pointer border transition-colors ${
              isPreviewMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-white/5 text-slate-300 hover:text-white border-white/10'
            }`}
            title={isPreviewMode ? 'প্রিভিউ বন্ধ করুন' : 'ভিজিটর প্রিভিউ মোড (আউটলাইন ছাড়া দেখুন)'}
          >
            {isPreviewMode ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">প্রিভিউ একটিভ</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ভিজিটর ভিউ</span>
              </>
            )}
          </button>

          {/* Global Theme & Sizing */}
          <button
            type="button"
            onClick={onOpenGlobalSettings}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center gap-1.5 cursor-pointer transition-colors"
            title="গ্লোবাল থিম, কালার ও কন্টেইনার সাইজ"
          >
            <Palette className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">গ্লোবাল সেটিংস</span>
          </button>

          {/* Save Status / Button */}
          <button
            type="button"
            onClick={handleManualSave}
            className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold flex items-center gap-1 cursor-pointer transition-all"
            title="সব পরিবর্তন ব্রাউজারে স্বয়ংক্রিয়ভাবে সংরক্ষিত রয়েছে"
          >
            {showSaveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>সংরক্ষিত!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">স্বয়ংক্রিয় সেভ</span>
              </>
            )}
          </button>

          {/* Export / Backup */}
          <button
            type="button"
            onClick={exportConfig}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 cursor-pointer"
            title="কনফিগারেশন ব্যাকআপ ডাউনলোড (Export JSON)"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 cursor-pointer"
            title="ডিফল্ট কনফিগারেশনে রিসেট করুন"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Collapse bar */}
          <button
            type="button"
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 cursor-pointer ml-1"
            title="বারটি ছোট করুন"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0d121f] border border-red-500/40 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-red-400" />
              <span>পূর্বাবস্থায় রিসেট করতে চান?</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              আপনার করা সকল পরিবর্তন মুছে গিয়ে মূল ওয়েবসাইট কনফিগারেশন ফিরে আসবে।
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={() => {
                  resetConfig();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold shadow-lg shadow-red-500/25 cursor-pointer"
              >
                হ্যাঁ, রিসেট করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
