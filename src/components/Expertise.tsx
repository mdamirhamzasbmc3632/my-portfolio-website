import React from 'react';
import { SupportedLanguage } from '../types';
import {
  Zap,
  Video,
  Palette,
  Eye,
  FileText,
  Mic,
  Award,
  TrendingUp,
  Layout,
  Shield,
  Cpu,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { SectionEditButton } from './SectionEditButton';
import { EditableElement } from './EditableElement';
import {
  getSectionPaddingClass,
  getContainerWidthClass,
  getCardRadiusClass,
} from '../utils/themeStyles';

interface ExpertiseProps {
  lang?: SupportedLanguage;
}

export const Expertise: React.FC<ExpertiseProps> = ({ lang = 'en' }) => {
  const { config, updateSection } = useSiteConfig();

  const paddingClass = getSectionPaddingClass(config.theme.sectionPadding);
  const containerWidthClass = getContainerWidthClass(config.theme.containerWidth);
  const cardRadiusClass = getCardRadiusClass(config.theme.cardRadius);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trending-up':
        return <TrendingUp className="w-6 h-6 text-sky-400" />;
      case 'layout':
        return <Layout className="w-6 h-6 text-cyan-400" />;
      case 'video':
        return <Video className="w-6 h-6 text-sky-400" />;
      case 'palette':
        return <Palette className="w-6 h-6 text-teal-400" />;
      case 'shield':
        return <Shield className="w-6 h-6 text-emerald-400" />;
      case 'cpu':
        return <Cpu className="w-6 h-6 text-indigo-400" />;
      case 'eye':
        return <Eye className="w-6 h-6 text-cyan-400" />;
      case 'file-text':
        return <FileText className="w-6 h-6 text-amber-400" />;
      case 'mic':
        return <Mic className="w-6 h-6 text-emerald-400" />;
      case 'award':
      default:
        return <Award className="w-6 h-6 text-emerald-400" />;
    }
  };

  const items = config.expertise.items || [];
  const toolsStack = config.expertise.toolsStack || [];

  return (
    <section id="expertise" className={`${paddingClass} relative overflow-hidden bg-[#050608]/60`}>
      <SectionEditButton sectionKey="expertise" labelBn="দক্ষতা ও স্কিলস এডিট করুন" labelEn="Edit Skills" />

      <div className={`${containerWidthClass} mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12`}>
        {/* Section Header with EditableElement */}
        <EditableElement
          elementId="expertise.header"
          label="স্কিলস সেকশন হেডার"
          elementType="heading"
          inlineText={lang === 'bn' ? config.expertise.titleBn : config.expertise.titleEn}
          onInlineTextChange={(val) => {
            updateSection('expertise', lang === 'bn' ? { titleBn: val } : { titleEn: val });
          }}
          className="text-center space-y-2.5 sm:space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/35 text-sky-300 text-[11px] sm:text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-sky-400" />
            <span>{lang === 'bn' ? config.expertise.badgeBn : config.expertise.badgeEn}</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            {lang === 'bn' ? (
              <>
                {config.expertise.titleBn}{' '}
                <span style={{ color: config.theme.accentColor }}>
                  {config.expertise.highlightWordBn}
                </span>
              </>
            ) : (
              <>
                {config.expertise.titleEn}{' '}
                <span style={{ color: config.theme.accentColor }}>
                  {config.expertise.highlightWordEn}
                </span>
              </>
            )}
          </h2>

          <p className="text-xs xs:text-sm sm:text-base text-slate-400 max-w-2xl mx-auto px-2">
            {lang === 'bn' ? config.expertise.descBn : config.expertise.descEn}
          </p>
        </EditableElement>

        {/* 6 Capabilities Grid wrapped with EditableElement */}
        <EditableElement
          elementId="expertise.cards"
          label="কোর স্কিলস কার্ডসমূহ"
          elementType="card"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                id={`expertise-card-${item.id}`}
                className={`group p-4.5 sm:p-6 lg:p-7 ${cardRadiusClass} bg-[#090b0e]/80 border border-sky-500/20 hover:border-sky-400/60 backdrop-blur-xl shadow-xl shadow-black/60 hover:shadow-[0_0_28px_rgba(56,189,248,0.25)] transition-all duration-300 flex flex-col justify-between`}
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-sky-500/15 transition-all">
                      {getIcon(item.iconName)}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      #0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-white group-hover:text-sky-400 transition-colors">
                      {lang === 'bn' ? item.titleBn : item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1.5 sm:mt-2 leading-relaxed">
                      {lang === 'bn' ? item.descriptionBn : item.description}
                    </p>
                  </div>
                </div>

                {item.tools && item.tools.length > 0 && (
                  <div className="pt-3.5 sm:pt-5 mt-3.5 sm:mt-5 border-t border-white/5 flex flex-wrap gap-1.5 sm:gap-2">
                    {item.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/5 text-[10px] sm:text-[11px] font-mono text-slate-300 border border-white/10"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </EditableElement>

        {/* Software & Tools Stack Banner wrapped with EditableElement */}
        <EditableElement
          elementId="expertise.tools"
          label="সফটওয়্যার টুলস স্ট্যাক"
          elementType="card"
        >
          <div className={`p-4 sm:p-6 lg:p-8 ${cardRadiusClass} bg-[#090b0e]/90 border border-sky-500/30 backdrop-blur-xl shadow-2xl`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="text-center md:text-left space-y-1">
                <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-sky-300">
                  {lang === 'bn' ? 'টুলস ও সফটওয়্যার' : 'Software & Stack'}
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-white">
                  {lang === 'bn' ? 'ব্যবহৃত প্রধান সফটওয়্যার ও ফ্রেমওয়ার্ক' : 'Primary Creative & Production Tools'}
                </h3>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-end gap-1.5 sm:gap-2.5">
                {toolsStack.map((tool, idx) => (
                  <div
                    key={idx}
                    className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/[0.04] border border-sky-500/30 hover:border-sky-400 hover:bg-sky-500/15 transition-all text-xs font-semibold text-slate-200 hover:text-white shadow-sm"
                  >
                    <span>{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </EditableElement>
      </div>
    </section>
  );
};
