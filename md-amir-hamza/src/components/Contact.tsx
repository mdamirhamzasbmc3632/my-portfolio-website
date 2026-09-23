import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import {
  Mail,
  MessageCircle,
  Facebook,
  Copy,
  Check,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles,
  Send,
  Phone,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { SectionEditButton } from './SectionEditButton';
import { EditableElement } from './EditableElement';
import {
  getSectionPaddingClass,
  getContainerWidthClass,
  getCardRadiusClass,
} from '../utils/themeStyles';

interface ContactProps {
  lang?: SupportedLanguage;
}

export const Contact: React.FC<ContactProps> = ({ lang = 'en' }) => {
  const { config, updateSection } = useSiteConfig();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const paddingClass = getSectionPaddingClass(config.theme.sectionPadding);
  const containerWidthClass = getContainerWidthClass(config.theme.containerWidth);
  const cardRadiusClass = getCardRadiusClass(config.theme.cardRadius);

  const profile = config.profile;
  const contactConfig = config.contact;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(profile.whatsapp);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const contactCards = [
    {
      id: 'email',
      title: lang === 'bn' ? 'অফিসিয়াল ইমেইল' : 'Email Address',
      value: profile.email,
      href: `mailto:${profile.email}`,
      actionLabel: lang === 'bn' ? 'ইমেইল পাঠান' : 'Send Email',
      icon: <Mail className="w-6 h-6 text-sky-400" />,
      accentColor: 'border-sky-500/40 hover:border-sky-400',
      badge: lang === 'bn' ? 'প্রধান চ্যানেল' : 'Primary Contact',
      copyable: true,
      onCopy: handleCopyEmail,
      isCopied: copiedEmail,
    },
    {
      id: 'whatsapp',
      title: lang === 'bn' ? 'ফোন ও হোয়াটসঅ্যাপ' : 'Phone & WhatsApp',
      value: profile.whatsapp,
      href: profile.whatsappUrl || 'https://wa.me/8801716689667',
      actionLabel: lang === 'bn' ? 'হোয়াটসঅ্যাপ চ্যাট' : 'WhatsApp Chat',
      icon: <MessageCircle className="w-6 h-6 text-emerald-400" />,
      accentColor: 'border-emerald-500/40 hover:border-emerald-400',
      badge: lang === 'bn' ? 'সরাসরি যোগাযোগ' : 'Direct Call / Chat',
      copyable: true,
      onCopy: handleCopyPhone,
      isCopied: copiedPhone,
      telHref: `tel:${profile.whatsapp.replace(/[^0-9+]/g, '')}`,
    },
    {
      id: 'facebook',
      title: lang === 'bn' ? 'ফেসবুক প্রোফাইল' : 'Facebook Profile',
      value: 'facebook.com/amirhamzasbmc3632',
      href: profile.socials.facebook || 'https://www.facebook.com/amirhamzasbmc3632',
      actionLabel: lang === 'bn' ? 'ফেসবুকে যুক্ত হন' : 'Connect on Facebook',
      icon: <Facebook className="w-6 h-6 text-blue-400" />,
      accentColor: 'border-blue-500/40 hover:border-blue-400',
      badge: lang === 'bn' ? 'অফিশিয়াল প্রোফাইল' : 'Official Profile',
      copyable: false,
    },
  ];

  return (
    <section id="contact" className={`${paddingClass} relative overflow-hidden bg-[#050608]/80`}>
      <SectionEditButton sectionKey="contact" labelBn="যোগাযোগ এডিট করুন" labelEn="Edit Contact" />

      {/* Background radial accent */}
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[350px] rounded-full blur-[120px] pointer-events-none -z-10 opacity-15"
        style={{ backgroundColor: config.theme.accentColor }}
      />

      <div className={`${containerWidthClass} mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12`}>
        {/* Section Header */}
        <EditableElement
          elementId="contact.header"
          label="কন্টাক্ট সেকশন হেডার"
          elementType="heading"
          inlineText={
            lang === 'bn'
              ? `${contactConfig.titleBn} ${contactConfig.highlightWordBn}`
              : `${contactConfig.titleEn} ${contactConfig.highlightWordEn}`
          }
          onInlineTextChange={(val) => {
            updateSection('contact', lang === 'bn' ? { titleBn: val } : { titleEn: val });
          }}
          className="text-center space-y-2.5 sm:space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/35 text-sky-300 text-[11px] sm:text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <Send className="w-3.5 h-3.5 text-sky-400" />
            <span>{lang === 'bn' ? contactConfig.badgeBn : contactConfig.badgeEn}</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            {lang === 'bn' ? (
              <>
                {contactConfig.titleBn}{' '}
                <span style={{ color: config.theme.accentColor }}>
                  {contactConfig.highlightWordBn}
                </span>
              </>
            ) : (
              <>
                {contactConfig.titleEn}{' '}
                <span style={{ color: config.theme.accentColor }}>
                  {contactConfig.highlightWordEn}
                </span>
              </>
            )}
          </h2>

          <p className="text-xs xs:text-sm sm:text-base text-slate-400 max-w-2xl mx-auto px-2">
            {lang === 'bn' ? contactConfig.descBn : contactConfig.descEn}
          </p>
        </EditableElement>

        {/* 3 Contact Channels */}
        <EditableElement
          elementId="contact.channels"
          label="যোগাযোগ চ্যানেলসমূহ"
          elementType="card"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {contactCards.map((card) => (
            <div
              key={card.id}
              className={`p-4.5 sm:p-6 ${cardRadiusClass} bg-[#090b0e]/90 border ${card.accentColor} backdrop-blur-xl shadow-xl shadow-black/70 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1`}
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {card.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-sky-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-mono break-all line-clamp-1 select-all">
                    {card.value}
                  </p>
                </div>
              </div>

              <div className="pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-white/5 flex items-center gap-2">
                <a
                  href={card.href}
                  target={card.id === 'email' ? '_self' : '_blank'}
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 hover:bg-sky-500 text-xs font-semibold text-white transition-all cursor-pointer shadow-sm border border-white/10 group-hover:border-transparent active:scale-95"
                >
                  <span>{card.actionLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {card.telHref && (
                  <a
                    href={card.telHref}
                    className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors cursor-pointer active:scale-95"
                    title={lang === 'bn' ? 'সরাসরি কল করুন' : 'Direct Call'}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                )}

                {card.copyable && card.onCopy && (
                  <button
                    type="button"
                    onClick={card.onCopy}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer relative active:scale-95"
                    title={lang === 'bn' ? 'কপি করুন' : 'Copy'}
                  >
                    {card.isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </EditableElement>

        {/* Current Location & Availability Banner */}
        <EditableElement
          elementId="contact.location"
          label="ঠিকানা ও যোগাযোগ ব্যানার"
          elementType="card"
          className={`p-4.5 sm:p-6 lg:p-8 ${cardRadiusClass} bg-[#090b0e]/95 border border-sky-500/35 backdrop-blur-xl shadow-2xl`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 shrink-0">
                <MapPin className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-sky-300">
                    {lang === 'bn' ? 'ঠিকানা ও যোগাযোগ' : 'Address & Contact'}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium">
                    {lang === 'bn' ? 'কাজের জন্য প্রস্তুত' : 'Available for Projects'}
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white flex flex-wrap items-center gap-2">
                  <span>{lang === 'bn' ? (profile.locationBn || 'কাজী বাড়ি, সাঁতারকুল, উত্তর বাড্ডা, ঢাকা') : (profile.location || 'Kazibari, Satarkul, Uttar Badda, Dhaka')}</span>
                  <span className="text-sm font-semibold text-emerald-400">• {profile.whatsapp}</span>
                </h4>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>
                    {lang === 'bn'
                      ? 'স্থায়ী ঠিকানা: ধর্মপাশা, সুনামগঞ্জ | যেকোনো প্রয়োজনে সরাসরি কল বা হোয়াটসঅ্যাপে নক দিন।'
                      : 'Permanent Address: Dharmapasha, Sunamganj | Available for direct calls and WhatsApp consultation.'}
                  </span>
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-wrap items-center justify-start lg:justify-end gap-2.5">
              <a
                href={profile.whatsappUrl || 'https://wa.me/8801716689667'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}</span>
              </a>

              <a
                href={`tel:${profile.whatsapp.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>{lang === 'bn' ? 'কল দিন' : 'Call'}</span>
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-slate-950 font-black text-xs shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${config.theme.accentSecondary}, ${config.theme.accentColor})`,
                }}
              >
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'bn' ? 'ইমেইল পাঠান' : 'Direct Email'}</span>
              </a>
            </div>
          </div>
        </EditableElement>
      </div>
    </section>
  );
};
