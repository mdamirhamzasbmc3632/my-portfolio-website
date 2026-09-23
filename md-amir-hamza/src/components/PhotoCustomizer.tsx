import React, { useState } from 'react';
import { Camera, Image as ImageIcon, RotateCcw, X, Upload, Check } from 'lucide-react';
import { profileData } from '../data';
import { SupportedLanguage } from '../types';

interface PhotoCustomizerProps {
  lang?: SupportedLanguage;
  avatarUrl: string;
  bgImageUrl: string;
  onUpdateAvatar: (url: string) => void;
  onUpdateBgImage: (url: string) => void;
  onReset: () => void;
}

export const PhotoCustomizer: React.FC<PhotoCustomizerProps> = ({
  lang = 'en',
  avatarUrl,
  bgImageUrl,
  onUpdateAvatar,
  onUpdateBgImage,
  onReset,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const uploadToServer = async (type: 'avatar' | 'background', dataUrl: string) => {
    try {
      await fetch(`/api/upload-photo?type=${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl }),
      });
    } catch {
      // ignore
    }
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      onUpdateAvatar(result);
      await uploadToServer('avatar', result);
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleBgFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      onUpdateBgImage(result);
      await uploadToServer('background', result);
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0d0e12]/95 hover:bg-[#161822] text-sky-400 hover:text-sky-300 border border-sky-500/40 hover:border-sky-400 shadow-[0_4px_24px_rgba(56,189,248,0.25)] hover:shadow-[0_4px_28px_rgba(56,189,248,0.4)] backdrop-blur-xl transition-all cursor-pointer group text-xs sm:text-sm font-semibold tracking-wide"
          id="photo-customizer-toggle-btn"
          title={lang === 'bn' ? 'ছবি কাস্টমাইজ করুন' : 'Customize Photos'}
        >
          <Camera className="w-4 h-4 text-sky-400 group-hover:rotate-12 transition-transform" />
          <span>{lang === 'bn' ? 'ছবি সেটিংস' : 'Photo Settings'}</span>
        </button>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg rounded-2xl bg-[#0c0d12] border border-sky-500/35 p-6 sm:p-7 shadow-[0_12px_45px_rgba(0,0,0,0.85)]"
            id="photo-customizer-dialog"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {lang === 'bn' ? 'পোর্টফোলিও ছবি সেটিংস' : 'Portfolio Photo Settings'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === 'bn'
                      ? 'হিরো অবতার ও ব্যাকগ্রাউন্ড ল্যাব ছবি কাস্টমাইজ করুন'
                      : 'Customize Hero Avatar & Background Lab Image'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success toast */}
            {copiedSuccess && (
              <div className="mb-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'bn' ? 'ছবি সফলভাবে আপডেট হয়েছে!' : 'Photo updated successfully!'}</span>
              </div>
            )}

            {/* Photo Cards */}
            <div className="space-y-4">
              {/* 1. White Punjabi Hero Avatar */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {lang === 'bn'
                      ? 'হিরো অবতার (সাদা পাঞ্জাবি পিএনজি)'
                      : 'Hero Avatar (White Punjabi PNG)'}
                  </span>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/40 text-sky-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'নতুন ফাইল দিন' : 'Select File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-14 h-16 sm:w-16 sm:h-20 rounded-lg overflow-hidden bg-black/40 border border-sky-500/25 shrink-0 flex items-center justify-center p-1">
                    <img
                      src={avatarUrl}
                      alt="Avatar Preview"
                      className="w-full h-full object-contain object-bottom"
                    />
                  </div>
                  <div className="text-xs text-slate-400 space-y-1">
                    <p className="font-mono text-[11px] text-sky-300/90 truncate max-w-[260px]">
                      {avatarUrl.startsWith('data:') ? 'Custom Uploaded Image' : avatarUrl}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {lang === 'bn'
                        ? 'সাদা পাঞ্জাবি পরা ট্রান্সপারেন্ট পিএনজি ছবির জন্য ডিজাইন করা।'
                        : 'Optimized for transparent PNG portrait with white punjabi.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Computer Lab Background Image */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {lang === 'bn'
                      ? 'ব্যাকগ্রাউন্ড ছবি (কম্পিউটার ল্যাব)'
                      : 'Background (Computer Lab)'}
                  </span>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'নতুন ফাইল দিন' : 'Select File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBgFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden bg-black/40 border border-emerald-500/25 shrink-0 flex items-center justify-center">
                    <img
                      src={bgImageUrl}
                      alt="Background Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs text-slate-400 space-y-1">
                    <p className="font-mono text-[11px] text-emerald-300/90 truncate max-w-[240px]">
                      {bgImageUrl.startsWith('data:') ? 'Custom Uploaded Image' : bgImageUrl}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {lang === 'bn'
                        ? 'ল্যাবের ছবি ব্যাকগ্রাউন্ডে সিনেমাটিক ডার্ক ভিনিয়েটসহ নিখুঁতভাবে ফিট করা।'
                        : 'Lab photo fitted with dark cinematic vignette & brand tones.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions & Reset */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
                id="reset-photos-btn"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>{lang === 'bn' ? 'ডিফল্ট রিসেট' : 'Reset to Default'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] cursor-pointer"
              >
                {lang === 'bn' ? 'ঠিক আছে' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
