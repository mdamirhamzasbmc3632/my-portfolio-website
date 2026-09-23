import React, { useEffect } from 'react';
import { DesignProject, SupportedLanguage } from '../types';
import { X, ExternalLink } from 'lucide-react';

interface DesignModalProps {
  project: DesignProject | null;
  isOpen: boolean;
  onClose: () => void;
  lang?: SupportedLanguage;
}

export const DesignModal: React.FC<DesignModalProps> = ({
  project,
  isOpen,
  onClose,
  lang = 'en',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[95vh] flex flex-col items-center my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="w-full flex items-center justify-between px-4 py-3 mb-2 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-md">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white truncate max-w-[70vw]">
            {lang === 'bn' ? project.titleBn : project.title}
          </h3>
          <div className="flex items-center gap-2">
            <a
              href={project.image}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/10 hover:bg-teal-500 text-white hover:text-slate-950 transition-colors cursor-pointer"
              title={lang === 'bn' ? 'আসল রেজোলিউশনে দেখুন' : 'View Full Image'}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-sky-500 hover:text-slate-950 text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="relative w-full flex items-center justify-center overflow-hidden rounded-2xl bg-black/60 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.9)] p-2">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-auto h-auto max-h-[82vh] max-w-full object-contain rounded-xl select-none"
          />
        </div>
      </div>
    </div>
  );
};
