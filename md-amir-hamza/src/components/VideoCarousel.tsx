import React, { useState, useEffect, useCallback, useRef } from 'react';
import { VideoProject, SupportedLanguage } from '../types';
import { ChevronLeft, ChevronRight, Play, Maximize2 } from 'lucide-react';

interface VideoCarouselProps {
  projects: VideoProject[];
  lang?: SupportedLanguage;
  onOpenVideo: (project: VideoProject) => void;
}

export const VideoCarousel: React.FC<VideoCarouselProps> = ({
  projects,
  lang = 'en',
  onOpenVideo,
}) => {
  const count = projects.length;
  const items = [...projects, ...projects, ...projects];
  const [currentIndex, setCurrentIndex] = useState(count);
  const [withTransition, setWithTransition] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const [activeEmbedId, setActiveEmbedId] = useState<string | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Listen for iframe Vimeo messages to pause other videos
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (!data) return;
        if (data.event === 'play') {
          const playerId = data.player_id;
          document.querySelectorAll('iframe[data-vimeo-player]').forEach((iframe) => {
            const ifr = iframe as HTMLIFrameElement;
            if (ifr.id !== playerId && ifr.contentWindow) {
              ifr.contentWindow.postMessage(JSON.stringify({ method: 'pause' }), '*');
            }
          });
        } else if (data.event === 'pause' || data.event === 'finish') {
          setActiveEmbedId(null);
        }
      } catch {
        // ignore parse error
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleNext = useCallback(() => {
    setActiveEmbedId(null);
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveEmbedId(null);
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const handleTransitionEnd = () => {
    if (currentIndex >= count * 2) {
      setWithTransition(false);
      setCurrentIndex(currentIndex - count);
    } else if (currentIndex < count) {
      setWithTransition(false);
      setCurrentIndex(currentIndex + count);
    }
  };

  useEffect(() => {
    if (isHovered || activeEmbedId !== null) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, 2800);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };
  }, [isHovered, activeEmbedId, handleNext]);

  const handleDotClick = (idx: number) => {
    setActiveEmbedId(null);
    setWithTransition(true);
    setCurrentIndex(count + idx);
  };

  const activeProjectIndex = ((currentIndex % count) + count) % count;

  // Touch swipe support for mobile & tablet
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null) {
      if (touchDeltaX.current < -45) {
        handleNext();
      } else if (touchDeltaX.current > 45) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <div
      className="space-y-4 select-none touch-pan-y"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative overflow-hidden px-0.5 sm:px-1 py-1 sm:py-2">
        {/* Navigation Buttons */}
        <button
          type="button"
          onClick={handlePrev}
          id="video-carousel-side-prev-btn"
          className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/90 hover:bg-sky-500 text-white border border-sky-500/50 hover:border-sky-400 flex items-center justify-center transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] active:scale-95 cursor-pointer backdrop-blur-md"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          id="video-carousel-side-next-btn"
          className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/90 hover:bg-sky-500 text-white border border-sky-500/50 hover:border-sky-400 flex items-center justify-center transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] active:scale-95 cursor-pointer backdrop-blur-md"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Slides Track */}
        <div
          className={`flex gpu-layer ${withTransition ? 'transition-transform duration-500 ease-out' : ''}`}
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {items.map((project, idx) => {
            const isCenter = idx % count === activeProjectIndex;
            const embedKey = `${project.id}-ext-${idx}`;
            const isPlayingThis = activeEmbedId === embedKey;

            return (
              <div
                key={`${project.id}-ext-${idx}`}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-3"
              >
                <div
                  id={`carousel-card-${project.id}-${idx}`}
                  className={`group h-full rounded-2xl sm:rounded-3xl bg-black/85 border overflow-hidden transition-all duration-300 flex flex-col justify-between backdrop-blur-xl shadow-xl shadow-black/80 ${
                    isCenter
                      ? 'border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.3)] ring-1 ring-sky-400/50'
                      : 'border-sky-500/30 hover:border-sky-400/70 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                  }`}
                >
                  <div>
                    {/* Media Display */}
                    <div className="relative aspect-video overflow-hidden bg-black group/video">
                      {isPlayingThis && project.youtubeId ? (
                        <iframe
                          id={`youtube-player-${project.id}-${idx}`}
                          src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&rel=0&enablejsapi=1`}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          referrerPolicy="strict-origin-when-cross-origin"
                          title={lang === 'bn' ? project.titleBn : project.title}
                          loading="lazy"
                        />
                      ) : isPlayingThis && project.vimeoId ? (
                        <iframe
                          id={`vimeo-player-${project.id}-${idx}`}
                          data-vimeo-player="true"
                          src={`https://player.vimeo.com/video/${project.vimeoId}?badge=0&autopause=1&api=1&autoplay=1&player_id=vimeo-player-${project.id}-${idx}&app_id=58479`}
                          className="w-full h-full border-0"
                          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                          allowFullScreen
                          referrerPolicy="strict-origin-when-cross-origin"
                          title={lang === 'bn' ? project.titleBn : project.title}
                          loading="lazy"
                        />
                      ) : (
                        <div
                          onClick={() => setActiveEmbedId(embedKey)}
                          className="relative w-full h-full cursor-pointer group/poster"
                        >
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/poster:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#10b981] to-[#38bdf8] text-slate-950 flex items-center justify-center shadow-[0_0_24px_rgba(6,182,212,0.7)] group-hover/poster:scale-110 transition-all duration-300">
                              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-slate-950 text-slate-950 ml-0.5" />
                            </div>
                          </div>
                          {project.duration && (
                            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] sm:text-[11px] font-semibold tracking-wide border border-white/10 backdrop-blur-md">
                              {project.duration}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Modal Expand Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenVideo(project);
                        }}
                        className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-black/80 hover:bg-sky-500 text-white text-xs backdrop-blur-md transition-all shadow-md border border-white/20 opacity-85 hover:opacity-100 cursor-pointer"
                        title={lang === 'bn' ? 'বড় পর্দায় দেখুন' : 'Full Screen'}
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-sky-300" />
                      </button>
                    </div>

                    {/* Card Title */}
                    <div className="p-3 sm:p-5">
                      <h4
                        onClick={() => onOpenVideo(project)}
                        className="text-xs sm:text-base font-bold text-white group-hover:text-sky-400 transition-colors cursor-pointer line-clamp-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] leading-snug"
                        title={lang === 'bn' ? project.titleBn : project.title}
                      >
                        {lang === 'bn' ? project.titleBn : project.title}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicator Dots */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {projects.map((project, idx) => {
          const isActive = idx === activeProjectIndex;
          return (
            <button
              key={`dot-${project.id}-${idx}`}
              type="button"
              onClick={() => handleDotClick(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center ${
                isActive
                  ? 'w-8 h-3 bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]'
                  : 'w-3 h-3 bg-white/20 hover:bg-white/40'
              }`}
              title={lang === 'bn' ? project.titleBn : project.title}
            >
              <span className="sr-only">Project {idx + 1}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
