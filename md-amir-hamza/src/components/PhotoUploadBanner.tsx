import React, { useState } from 'react';
import { Upload, Check, Sparkles, X } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface PhotoUploadBannerProps {
  lang?: SupportedLanguage;
  avatarUrl: string;
  bgImageUrl: string;
  onUpdateAvatar: (url: string) => void;
  onUpdateBgImage: (url: string) => void;
}

export const PhotoUploadBanner: React.FC<PhotoUploadBannerProps> = ({
  lang = 'en',
  avatarUrl,
  bgImageUrl,
  onUpdateAvatar,
  onUpdateBgImage,
}) => {
  const [dismissed, setDismissed] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingBg, setUploadingBg] = useState(false);
  const [avatarSuccess, setAvatarSuccess] = useState(false);
  const [bgSuccess, setBgSuccess] = useState(false);

  const isCustomAvatar =
    avatarUrl.startsWith('data:') ||
    avatarUrl.includes('Amir') ||
    avatarUrl.includes('jsdelivr.net') ||
    avatarUrl.includes('my-portfolio-images');
  const isCustomBg = bgImageUrl.startsWith('data:') || bgImageUrl.includes('IMG_20240226');

  const uploadToServer = async (type: 'avatar' | 'background', dataUrl: string) => {
    try {
      await fetch(`/api/upload-photo?type=${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl }),
      });
    } catch {
      // ignore network errors, client state already updated
    }
  };

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      onUpdateAvatar(result);
      await uploadToServer('avatar', result);
      setUploadingAvatar(false);
      setAvatarSuccess(true);
      setTimeout(() => setAvatarSuccess(false), 4000);
    };
    reader.readAsDataURL(file);
  };

  const handleBgSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingBg(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      onUpdateBgImage(result);
      await uploadToServer('background', result);
      setUploadingBg(false);
      setBgSuccess(true);
      setTimeout(() => setBgSuccess(false), 4000);
    };
    reader.readAsDataURL(file);
  };

  if (dismissed) {
    return (
      <button
        type="button"
        onClick={() => setDismissed(false)}
        className="fixed top-20 right-4 z-40 px-3 py-1.5 rounded-full bg-[#0e1017]/90 hover:bg-[#151924] border border-sky-500/40 text-sky-400 text-xs font-semibold shadow-lg backdrop-blur-md flex items-center gap-1.5 transition-all cursor-pointer"
        id="reopen-photo-banner-btn"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>{lang === 'bn' ? 'আসল ছবি সেট করুন' : 'Attach Real Photos'}</span>
      </button>
    );
  }

  return (
    <div className="relative z-30 w-full bg-gradient-to-r from-sky-950/70 via-[#0a111e]/90 to-cyan-950/70 border-b border-sky-500/30 backdrop-blur-xl px-4 py-2.5 sm:py-3 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-4">
        {/* Left message */}
        <div className="flex items-center gap-2.5 text-center md:text-left">
          <div className="p-1.5 rounded-lg bg-sky-500/20 border border-sky-400/40 text-sky-300 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs sm:text-sm text-slate-200 font-medium leading-tight">
            <span className="font-bold text-white">
              {lang === 'bn' ? 'আপনার আসল ছবি যুক্ত করুন:' : 'Set Your Real Photos:'}
            </span>{' '}
            <span className="text-slate-300">
              {lang === 'bn'
                ? 'সাদা পাঞ্জাবি ছবি এবং ল্যাব ব্যাকগ্রাউন্ড ফাইল দুটি নির্বাচন করলেই স্বয়ংক্রিয়ভাবে সেভ হয়ে যাবে।'
                : 'Upload your white punjabi avatar & computer lab background.'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
          {/* 1. Avatar Button */}
          <label
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-md ${
              avatarSuccess || isCustomAvatar
                ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-300'
                : 'bg-sky-500 hover:bg-sky-400 text-slate-950 border-sky-400/80 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
            }`}
            id="upload-avatar-banner-btn"
          >
            {avatarSuccess || isCustomAvatar ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <Upload className="w-3.5 h-3.5 shrink-0" />
            )}
            <span>
              {uploadingAvatar
                ? lang === 'bn' ? 'যুক্ত হচ্ছে...' : 'Uploading...'
                : avatarSuccess || isCustomAvatar
                ? lang === 'bn' ? 'প্রোফাইল ছবি সেট আছে ✓' : 'Profile Photo Active ✓'
                : lang === 'bn' ? '১. সাদা পাঞ্জাবি ছবি (Amir hamza png)' : '1. White Punjabi Avatar'}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarSelect}
              className="hidden"
            />
          </label>

          {/* 2. Background Button */}
          <label
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-md ${
              bgSuccess
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-sky-400'
            }`}
            id="upload-bg-banner-btn"
          >
            {bgSuccess ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <Upload className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            )}
            <span>
              {uploadingBg
                ? lang === 'bn' ? 'যুক্ত হচ্ছে...' : 'Uploading...'
                : bgSuccess
                ? lang === 'bn' ? 'ল্যাব সেভ হয়েছে!' : 'Lab Saved!'
                : lang === 'bn' ? '২. কম্পিউটার ল্যাব (IMG_20240226...)' : '2. Lab Background'}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleBgSelect}
              className="hidden"
            />
          </label>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title={lang === 'bn' ? 'লুকিয়ে রাখুন' : 'Dismiss'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
