import React, { useState } from 'react';
import { VideoProject, DesignProject, SupportedLanguage } from '../types';
import { VideoCarousel } from './VideoCarousel';
import { DesignCarousel } from './DesignCarousel';
import { VideoModal } from './VideoModal';
import { DesignModal } from './DesignModal';
import { Video, Palette } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { SectionEditButton } from './SectionEditButton';
import { EditableElement } from './EditableElement';
import { getSectionPaddingClass, getContainerWidthClass } from '../utils/themeStyles';

interface PortfolioProps {
  lang?: SupportedLanguage;
}

export const Portfolio: React.FC<PortfolioProps> = ({ lang = 'en' }) => {
  const { config, updateSection } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<'video' | 'design'>('video');
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<DesignProject | null>(null);

  const paddingClass = getSectionPaddingClass(config.theme.sectionPadding);
  const containerWidthClass = getContainerWidthClass(config.theme.containerWidth);

  const videoList = config.portfolio.videoProjects || [];
  const designList = config.portfolio.designProjects || [];

  return (
    <section id="portfolio" className={`${paddingClass} relative overflow-hidden`}>
      <SectionEditButton sectionKey="portfolio" labelBn="পোর্টফোলিও এডিট করুন" labelEn="Edit Portfolio" />

      {/* Subtle Background Lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] rounded-full blur-[140px] pointer-events-none -z-10 opacity-15"
        style={{ backgroundColor: config.theme.accentColor }}
      />

      <div className={`${containerWidthClass} mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10`}>
        {/* Section Header with Elementor EditableElement */}
        <EditableElement
          elementId="portfolio.header"
          label="পোর্টফোলিও সেকশন হেডার"
          elementType="heading"
          inlineText={lang === 'bn' ? config.portfolio.titleBn : config.portfolio.titleEn}
          onInlineTextChange={(val) => {
            updateSection('portfolio', lang === 'bn' ? { titleBn: val } : { titleEn: val });
          }}
          className="text-center space-y-2.5 sm:space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/35 text-sky-300 text-[11px] sm:text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <span>{lang === 'bn' ? config.portfolio.badgeBn : config.portfolio.badgeEn}</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            {lang === 'bn' ? (
              <>
                {config.portfolio.titleBn}{' '}
                <span style={{ color: config.theme.accentColor }}>
                  {config.portfolio.highlightWordBn}
                </span>
              </>
            ) : (
              <>
                {config.portfolio.titleEn}{' '}
                <span style={{ color: config.theme.accentColor }}>
                  {config.portfolio.highlightWordEn}
                </span>
              </>
            )}
          </h2>

          <p className="text-xs xs:text-sm sm:text-base text-slate-400 max-w-2xl mx-auto px-2">
            {lang === 'bn' ? config.portfolio.descBn : config.portfolio.descEn}
          </p>
        </EditableElement>

        {/* Tab Switcher */}
        <div className="flex justify-center items-center px-2">
          <div className="inline-flex p-1 sm:p-1.5 rounded-full bg-[#0a0c10] border border-sky-500/35 shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-xl max-w-full overflow-x-auto">
            <button
              type="button"
              id="tab-video-projects"
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeTab === 'video'
                  ? 'text-slate-950 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              style={
                activeTab === 'video'
                  ? {
                      background: `linear-gradient(to right, ${config.theme.accentSecondary}, ${config.theme.accentColor})`,
                    }
                  : undefined
              }
            >
              <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{lang === 'bn' ? 'ভিডিও এডিটিং' : 'Video Editing'}</span>
              <span className="text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full bg-black/30 border border-white/10 font-mono">
                {videoList.length}
              </span>
            </button>

            <button
              type="button"
              id="tab-design-projects"
              onClick={() => setActiveTab('design')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeTab === 'design'
                  ? 'text-slate-950 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              style={
                activeTab === 'design'
                  ? {
                      background: `linear-gradient(to right, ${config.theme.accentSecondary}, ${config.theme.accentColor})`,
                    }
                  : undefined
              }
            >
              <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{lang === 'bn' ? 'গ্রাফিক ডিজাইন' : 'Graphic Design'}</span>
              <span className="text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full bg-black/30 border border-white/10 font-mono">
                {designList.length}
              </span>
            </button>
          </div>
        </div>

        {/* Carousel Render wrapped with EditableElement for Video and Design */}
        <div className="pt-2">
          {activeTab === 'video' ? (
            <EditableElement
              elementId="portfolio.videos"
              label="ভিডিও প্রজেক্টস শোকেস"
              elementType="card"
            >
              <VideoCarousel
                projects={videoList}
                lang={lang}
                onOpenVideo={(p) => setSelectedVideo(p)}
              />
            </EditableElement>
          ) : (
            <EditableElement
              elementId="portfolio.designs"
              label="গ্রাফিক্স ডিজাইন শোকেস"
              elementType="card"
            >
              <DesignCarousel
                projects={designList}
                lang={lang}
                onOpenDesign={(p) => setSelectedDesign(p)}
              />
            </EditableElement>
          )}
        </div>
      </div>

      {/* Modals */}
      <VideoModal
        project={selectedVideo}
        isOpen={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
        lang={lang}
      />

      <DesignModal
        project={selectedDesign}
        isOpen={Boolean(selectedDesign)}
        onClose={() => setSelectedDesign(null)}
        lang={lang}
      />
    </section>
  );
};
