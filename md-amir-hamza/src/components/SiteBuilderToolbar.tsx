import React from 'react';
import { Sliders, Palette, Maximize2, Sparkles, Pencil } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface SiteBuilderToolbarProps {
  onOpenCustomizer: (tab?: string) => void;
}

export const SiteBuilderToolbar: React.FC<SiteBuilderToolbarProps> = ({ onOpenCustomizer }) => {
  const { isEditMode, setIsEditMode, config } = useSiteConfig();

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      {/* Quick Edit Mode Toggle Pill */}
      <button
        type="button"
        onClick={() => setIsEditMode((prev) => !prev)}
        className={`px-3 py-2 rounded-full text-xs font-bold border backdrop-blur-xl shadow-2xl flex items-center gap-2 transition-all cursor-pointer ${
          isEditMode
            ? 'bg-sky-500 text-slate-950 border-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.5)] scale-105'
            : 'bg-[#0d0e14]/90 hover:bg-[#161822] text-slate-200 border-white/20'
        }`}
        title={isEditMode ? 'এডিট মোড বন্ধ করুন' : 'সেকশন এডিট বাটন প্রদর্শন করুন'}
      >
        <Pencil className="w-3.5 h-3.5 shrink-0" />
        <span className="hidden sm:inline">
          {isEditMode ? 'এডিট মোড চালু' : 'এডিট মোড'}
        </span>
      </button>

      {/* Main Open Customizer Button */}
      <button
        type="button"
        onClick={() => onOpenCustomizer('theme')}
        className="px-4 py-2 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-400 hover:from-sky-400 hover:via-cyan-300 hover:to-teal-300 text-slate-950 text-xs font-black tracking-wide uppercase shadow-[0_0_25px_rgba(56,189,248,0.45)] border border-sky-300/80 backdrop-blur-xl flex items-center gap-2 transition-all transform hover:scale-105 cursor-pointer"
        id="open-site-builder-btn"
      >
        <Sliders className="w-4 h-4 shrink-0" />
        <span>সেকশন ও সাইজ এডিটর</span>
      </button>
    </div>
  );
};
