import React, { useState, useEffect, useRef } from 'react';
import { VideoProject, SupportedLanguage } from '../types';
import { X, Clock, Play, Pause, Volume2, VolumeX, Maximize2, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  project: VideoProject | null;
  isOpen: boolean;
  onClose: () => void;
  lang?: SupportedLanguage;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  project,
  isOpen,
  onClose,
  lang = 'en',
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      setProgress(0);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
      // Pause any existing playing iframes
      document.querySelectorAll('iframe[data-vimeo-player]').forEach((iframe) => {
        (iframe as HTMLIFrameElement).contentWindow?.postMessage(
          JSON.stringify({ method: 'pause' }),
          '*'
        );
      });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, project, onClose]);

  if (!isOpen || !project) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekPercentage = parseFloat(e.target.value);
    const time = (seekPercentage / 100) * (videoRef.current.duration || 1);
    videoRef.current.currentTime = time;
    setProgress(seekPercentage);
  };

  const toggleSpeed = () => {
    if (!videoRef.current) return;
    const nextSpeed = playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1;
    videoRef.current.playbackRate = nextSpeed;
    setPlaybackSpeed(nextSpeed);
  };

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="video-player-modal"
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${
          project.aspectRatio === '9:16' ? 'max-w-xl' : 'max-w-4xl'
        } bg-[#0d0e12] border border-sky-500/40 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(56,189,248,0.2)] my-auto animate-in fade-in zoom-in-95 duration-200`}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-3 sm:py-4 border-b border-sky-500/25 bg-black/90">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-sky-500/15 border border-sky-400/35 text-sky-300 text-[11px] sm:text-xs font-semibold">
              {lang === 'bn' ? project.categoryLabelBn : project.categoryLabel}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              {project.duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {project.youtubeUrl && (
              <a
                href={project.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-rose-300 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/35 transition-colors cursor-pointer"
                title={lang === 'bn' ? 'ইউটিউবে সরাসরি দেখুন' : 'Watch on YouTube'}
              >
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <button
              onClick={onClose}
              id="close-video-modal-btn"
              className="p-1.5 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-sky-500/20 border border-sky-500/30 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Display */}
        {project.youtubeId ? (
          <div
            className={`relative w-full ${
              project.aspectRatio === '9:16'
                ? 'aspect-[9/16] max-h-[70vh] mx-auto bg-black'
                : 'aspect-video bg-black'
            } flex items-center justify-center overflow-hidden`}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&rel=0`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              title={lang === 'bn' ? project.titleBn : project.title}
            />
          </div>
        ) : project.vimeoEmbedUrl || project.vimeoId ? (
          <div
            className={`relative w-full ${
              project.aspectRatio === '9:16'
                ? 'aspect-[9/16] max-h-[70vh] mx-auto bg-black'
                : 'aspect-video bg-black'
            } flex items-center justify-center overflow-hidden`}
          >
            <iframe
              src={project.vimeoEmbedUrl || `https://player.vimeo.com/video/${project.vimeoId}?badge=0&autopause=1&player_id=vimeo-modal-player&app_id=58479&autoplay=1`}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              title={lang === 'bn' ? project.titleBn : project.title}
            />
          </div>
        ) : (
          <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
            <video
              ref={videoRef}
              src={project.videoPreviewUrl}
              poster={project.thumbnail}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              playsInline
              autoPlay
              muted={isMuted}
              className="w-full h-full object-contain cursor-pointer"
              onClick={togglePlay}
            />

            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-gradient-to-tr from-[#10b981] to-[#38bdf8] text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/50 hover:scale-110 transition-transform cursor-pointer"
                aria-label="Play video"
              >
                <Play className="w-7 h-7 fill-slate-950 text-slate-950 ml-0.5" />
              </button>
            )}

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 bg-white/20 accent-sky-400 rounded-full cursor-pointer"
              />
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay} className="hover:text-sky-400 transition-colors">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button onClick={toggleMute} className="hover:text-sky-400 transition-colors">
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button onClick={toggleSpeed} className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono">
                    {playbackSpeed}x
                  </button>
                </div>
                <button onClick={handleFullscreen} className="hover:text-sky-400 transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Info Description Footer */}
        <div className="p-6 space-y-5 max-h-[40vh] overflow-y-auto">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {lang === 'bn' ? project.titleBn : project.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === 'bn' ? project.descriptionBn : project.description}
            </p>
          </div>

          {/* Tools Used */}
          {project.toolsUsed && project.toolsUsed.length > 0 && (
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                {lang === 'bn' ? 'ব্যবহৃত সফটওয়্যার ও টুলস:' : 'Tools & Software Stack:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {project.toolsUsed.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-sky-500/15 border border-sky-500/40 text-sky-200 text-xs font-mono font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          {project.keyFeatures && (
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                {lang === 'bn' ? 'মূল বৈশিষ্ট্যসমূহ:' : 'Key Creative Deliverables:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {(lang === 'bn' ? project.keyFeaturesBn : project.keyFeatures).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
