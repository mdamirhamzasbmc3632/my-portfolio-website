import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { SupportedLanguage } from '../types';

interface FloatingWhatsAppProps {
  lang?: SupportedLanguage;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ lang = 'en' }) => {
  const { config } = useSiteConfig();
  const [isHovered, setIsHovered] = useState(false);
  const whatsappUrl = config.profile.whatsappUrl || 'https://wa.me/8801716689667';

  return (
    <aside
      id="floating-whatsapp-container"
      aria-label="WhatsApp quick contact"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5 sm:gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip Label */}
      <div
        className={`hidden sm:flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-[#080b0f]/95 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-2xl backdrop-blur-md transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে সরাসরি কথা বলুন' : 'Chat on WhatsApp'}</span>
      </div>

      {/* Floating Action Button */}
      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white shadow-[0_4px_25px_rgba(16,185,129,0.45)] hover:shadow-[0_6px_30px_rgba(16,185,129,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border border-emerald-300/40"
        title={lang === 'bn' ? 'হোয়াটসঅ্যাপে নক দিন' : 'Contact on WhatsApp'}
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400/25 animate-ping opacity-75 pointer-events-none" />

        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white/20 transition-transform duration-300 group-hover:rotate-12" />
      </a>
    </aside>
  );
};
