import React from 'react';
import { SupportedLanguage } from '../types';
import {
  GraduationCap,
  Award,
  Sparkles,
  CircleCheck,
  Briefcase,
  BookOpen,
  ExternalLink,
  TrendingUp,
  Download,
} from 'lucide-react';
import { downloadCV, CV_PDF_URL } from '../utils/downloadCV';
import { useSiteConfig } from '../context/SiteConfigContext';
import { SectionEditButton } from './SectionEditButton';
import { EditableElement } from './EditableElement';
import {
  getSectionPaddingClass,
  getContainerWidthClass,
  getCardRadiusClass,
} from '../utils/themeStyles';
import {
  academicList as defaultAcademicList,
  academicListBn as defaultAcademicListBn,
  trainingDataEn as defaultTrainingDataEn,
  trainingDataBn as defaultTrainingDataBn,
  workExperienceData,
} from '../data';

interface EducationProps {
  lang?: SupportedLanguage;
}

export const Education: React.FC<EducationProps> = ({ lang = 'en' }) => {
  const { config, updateSection } = useSiteConfig();

  const paddingClass = getSectionPaddingClass(config.theme?.sectionPadding || 'normal');
  const containerWidthClass = getContainerWidthClass(config.theme?.containerWidth || 'wide');
  const cardRadiusClass = getCardRadiusClass(config.theme?.cardRadius || '2xl');

  const educationConfig = config.education || {};

  const academics = lang === 'bn'
    ? (educationConfig.academicListBn || defaultAcademicListBn)
    : (educationConfig.academicList || defaultAcademicList);

  const training = lang === 'bn'
    ? (educationConfig.trainingDataBn || defaultTrainingDataBn)
    : (educationConfig.trainingDataEn || defaultTrainingDataEn);

  return (
    <section id="education" className={`${paddingClass} relative overflow-hidden bg-[#06070a]/60`}>
      <SectionEditButton sectionKey="education" labelBn="এডুকেশন এডিট করুন" labelEn="Edit Education" />

      <div className={`${containerWidthClass} mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12`}>
        {/* Section Header with EditableElement */}
        <EditableElement
          elementId="education.header"
          label="শিক্ষা সেকশন হেডার"
          elementType="heading"
          inlineText={
            lang === 'bn'
              ? `${educationConfig.titleBn || 'শিক্ষা ও'} ${educationConfig.highlightWordBn || 'প্রশিক্ষণ'}`
              : `${educationConfig.titleEn || 'Academic &'} ${educationConfig.highlightWordEn || 'Professional Track'}`
          }
          onInlineTextChange={(val) => {
            updateSection('education', lang === 'bn' ? { titleBn: val } : { titleEn: val });
          }}
          className="text-center space-y-2.5 sm:space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/35 text-sky-300 text-[11px] sm:text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
            <span>{lang === 'bn' ? (educationConfig.badgeBn || 'এডুকেশন ও ক্যারিয়ার') : (educationConfig.badgeEn || 'Education & Career')}</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            {lang === 'bn' ? (
              <>
                {educationConfig.titleBn || 'শিক্ষা ও'}{' '}
                <span style={{ color: config.theme?.accentColor || '#38bdf8' }}>
                  {educationConfig.highlightWordBn || 'প্রশিক্ষণ'}
                </span>
              </>
            ) : (
              <>
                {educationConfig.titleEn || 'Academic &'}{' '}
                <span style={{ color: config.theme?.accentColor || '#38bdf8' }}>
                  {educationConfig.highlightWordEn || 'Professional Track'}
                </span>
              </>
            )}
          </h2>

          <p className="text-xs xs:text-sm sm:text-base text-slate-400 max-w-2xl mx-auto px-2">
            {lang === 'bn'
              ? (educationConfig.descBn || 'প্রামাণ্য প্রাতিষ্ঠানিক শিক্ষা, অপারেশনাল অভিজ্ঞতা এবং প্রফেশনাল স্কিল ডেভেলপমেন্ট প্রশিক্ষণ।')
              : (educationConfig.descEn || 'Authentic Islamic academic background, operational experience, and professional skill training.')}
          </p>
        </EditableElement>

        {/* Work Experience Spotlight (from CV) */}
        <EditableElement
          elementId="education.experience"
          label="পেশাগত অভিজ্ঞতা (Work Experience)"
          elementType="card"
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-5 h-5 text-sky-400" />
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {lang === 'bn' ? 'পেশাগত কর্ম অভিজ্ঞতা (Work Experiences)' : 'Professional Work Experience'}
              </h3>
            </div>
            <a
              href={CV_PDF_URL}
              download="Amir-Hamza-3632-Cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                downloadCV();
              }}
              id="education-download-cv-btn"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-sky-300 hover:text-white bg-sky-500/10 hover:bg-sky-500/25 border border-sky-500/35 hover:border-sky-400 transition-all cursor-pointer w-fit shadow-sm active:scale-95"
              title={lang === 'bn' ? 'সিভি ডাউনলোড করুন' : 'Download CV'}
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>{lang === 'bn' ? 'ডাউনলোড সিভি (PDF)' : 'Download CV (PDF)'}</span>
            </a>
          </div>

          <div className={`p-4 sm:p-6 lg:p-7 ${cardRadiusClass} bg-gradient-to-br from-[#090c12]/95 to-[#0b121d]/85 border border-sky-500/30 hover:border-sky-400/60 backdrop-blur-xl shadow-xl shadow-black/60 transition-all`}>
            {/* Header / Titles */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-white/10">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-[11px] sm:text-xs font-mono font-bold uppercase">
                    {lang === 'bn' ? 'পেশাগত অভিজ্ঞতা' : 'Work Experience'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] sm:text-xs font-semibold">
                    {lang === 'bn' ? 'মার্কেটিং ও টেকনিক্যাল অপারেশনস' : 'Marketing & Operations'}
                  </span>
                </div>

                <h4 className="text-lg sm:text-2xl font-black text-white pt-0.5">
                  {lang === 'bn' ? workExperienceData[0].roleBn : workExperienceData[0].role}
                </h4>

                <div className="flex items-center gap-2 pt-0.5">
                  <a
                    href={workExperienceData[0].organizationUrl || 'https://iqraonlinemadrasa.com/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors group cursor-pointer"
                    title={lang === 'bn' ? 'ইকরা অনলাইন মাদরাসা ওয়েবসাইট দেখুন' : 'Visit IQRA ONLINE MADRASA Website'}
                  >
                    <span className="hover:underline">{lang === 'bn' ? workExperienceData[0].organizationBn : workExperienceData[0].organization}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0 self-start sm:self-center">
                <Briefcase className="w-6 h-6" />
              </div>
            </div>

            {/* Responsibilities list - Clean 2-column grid */}
            <div className="pt-4 space-y-2.5">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                {lang === 'bn' ? 'মূল দায়িত্ব ও সম্পাদনাসমূহ:' : 'Key Roles & Responsibilities:'}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(lang === 'bn' ? workExperienceData[0].responsibilitiesBn : workExperienceData[0].responsibilities).map((resp, rIdx) => {
                  const isHighlighted = rIdx === 0;
                  return (
                    <div
                      key={rIdx}
                      className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-sm leading-relaxed transition-all ${
                        isHighlighted
                          ? 'bg-emerald-500/[0.08] border-emerald-500/35 text-slate-200'
                          : 'bg-white/[0.03] border-white/10 text-slate-300'
                      }`}
                    >
                      <CircleCheck
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isHighlighted ? 'text-emerald-400' : 'text-sky-400'
                        }`}
                      />
                      <span>{resp}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </EditableElement>

        {/* 2-Column Layout: Academic Background & Professional Training */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Column 1: Academic Background */}
          <EditableElement
            elementId="education.academic"
            label="প্রাতিষ্ঠানিক শিক্ষা (Academic)"
            elementType="card"
            className="space-y-6"
          >
            <div className="flex items-center gap-2.5 pb-2">
              <GraduationCap className="w-5 h-5 text-sky-400" />
              <h3 className="text-xl font-bold text-white">
                {lang === 'bn' ? 'প্রাতিষ্ঠানিক শিক্ষাগত যোগ্যতা' : 'Educational Qualifications'}
              </h3>
            </div>

            <div className="space-y-4">
              {academics.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-6 ${cardRadiusClass} bg-[#090b0e]/85 border border-sky-500/25 hover:border-sky-400/60 backdrop-blur-xl shadow-xl shadow-black/60 transition-all duration-300 relative group overflow-hidden`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/35 text-sky-300 text-xs font-mono font-bold">
                          {item.year}
                        </span>
                        {item.result && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 text-xs font-semibold">
                            {item.result}
                          </span>
                        )}
                        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                          <CircleCheck className="w-3.5 h-3.5 text-emerald-400" />
                          {item.status}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
                        {item.degree}
                      </h4>
                      {item.institute && (
                        <p className="text-xs font-medium text-sky-400/90 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{item.institute}</span>
                        </p>
                      )}
                      <p className="text-sm text-slate-400 leading-relaxed pt-1">
                        {item.desc}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-sky-400 group-hover:scale-110 transition-transform shrink-0">
                      {item.iconName === 'sparkles' ? (
                        <Sparkles className="w-5 h-5 text-cyan-300" />
                      ) : item.iconName === 'graduation-cap' ? (
                        <GraduationCap className="w-5 h-5 text-sky-400" />
                      ) : (
                        <Award className="w-5 h-5 text-sky-400" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </EditableElement>

          {/* Column 2: Professional Training */}
          <EditableElement
            elementId="education.training"
            label="আস-সুন্নাহ SBMC ট্রেনিং"
            elementType="card"
            className="space-y-6"
          >
            <div className="flex items-center gap-2.5 pb-2">
              <Award className="w-5 h-5 text-[#2dd4bf]" />
              <h3 className="text-xl font-bold text-white">
                {lang === 'bn' ? 'প্রফেশনাল স্কিল ডেভেলপমেন্ট' : 'Professional Skill Development'}
              </h3>
            </div>

            <div className={`p-6 sm:p-7 ${cardRadiusClass} bg-[#090b0e]/85 border border-[#2dd4bf]/30 hover:border-[#2dd4bf]/70 backdrop-blur-xl shadow-xl shadow-black/60 transition-all duration-300 space-y-6`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/35 text-teal-300 text-xs font-mono font-bold uppercase">
                    {training?.batch || 'Batch 36'}
                  </span>
                  <h4 className="text-xl font-bold text-white mt-2">
                    {training?.institution || 'As-Sunnah Skill Development Institute'}
                  </h4>
                  <p className="text-sm font-semibold text-[#2dd4bf] mt-1">
                    {training?.courseName || 'SBMC (Small Business Management Course)'}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              {/* Topics Grid */}
              <div className="space-y-3 pt-2">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                  {lang === 'bn' ? 'অর্জিত মূল দক্ষতা ও মডিউলসমূহ:' : 'Covered Skills & Practical Toolsets:'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(training?.topics || []).map((t, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-colors space-y-1"
                    >
                      <span className="text-sm font-bold text-white block">
                        {t.name}
                      </span>
                      <span className="text-xs text-slate-400 block font-mono">
                        {t.tools}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </EditableElement>
        </div>
      </div>
    </section>
  );
};
