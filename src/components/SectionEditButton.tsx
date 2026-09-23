import React from 'react';
import { Pencil, Sliders } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface SectionEditButtonProps {
  sectionKey: 'hero' | 'portfolio' | 'expertise' | 'education' | 'contact' | 'theme';
  labelBn?: string;
  labelEn?: string;
  className?: string;
}

export const SectionEditButton: React.FC<SectionEditButtonProps> = ({
  sectionKey,
  labelBn = 'এই সেকশনটি এডিট করুন',
  labelEn = 'Edit Section',
  className = '',
}) => {
  const { isEditMode, setActiveEditSection } = useSiteConfig();

  // If edit mode is not active, display nothing so visitors cannot edit
  if (!isEditMode) {
    return null;
  }

  return (
    <div className={`absolute top-4 right-4 z-20 flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => setActiveEditSection(sectionKey)}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 text-xs font-bold shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-all cursor-pointer transform hover:scale-105"
        title={`${labelEn} / ${labelBn}`}
      >
        <Pencil className="w-3.5 h-3.5 shrink-0" />
        <span>{labelBn}</span>
      </button>
    </div>
  );
};
