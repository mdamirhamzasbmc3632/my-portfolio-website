import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DesignProject, SupportedLanguage } from '../types';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface DesignCarouselProps {
  projects: DesignProject[];
  lang?: SupportedLanguage;
  onOpenDesign: (project: DesignProject) => void;
}

export const DesignCarousel: React.FC<DesignCarouselProps> = ({
  projects,
  lang = 'en',
  onOpenDesign,
}) => {
  const count = projects.length;
  const items = [...projects, ...projects, ...projects];
  const [currentIndex, setCurrentIndex] = useState(count);
  const [withTransition, setWithTransition] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
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

  const handleNext = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
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
    if (isHovered) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, 1300);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };
  }, [isHovered, handleNext]);

  const handleDotClick = (idx: number) => {
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
          id="design-carousel-side-prev-btn"
          className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/90 hover:bg-teal-500 text-white hover:text-slate-950 border border-teal-500/50 hover:border-teal-400 flex items-center justify-center transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(45,212,191,0.6)] active:scale-95 cursor-pointer backdrop-blur-md"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          id="design-carousel-side-next-btn"
          className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/90 hover:bg-teal-500 text-white hover:text-slate-950 border border-teal-500/50 hover:border-teal-400 flex items-center justify-center transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(45,212,191,0.6)] active:scale-95 cursor-pointer backdrop-blur-md"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Carousel Slider */}
        <div
          className={`flex gpu-layer ${withTransition ? 'transition-transform duration-500 ease-out' : ''}`}
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {items.map((project, idx) => {
            const isCenter = idx % count === activeProjectIndex;

            return (
              <div
                key={`${project.id}-ext-${idx}`}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-3"
              >
                <div
                  id={`design-carousel-card-${project.id}-${idx}`}
                  className={`group h-full rounded-2xl sm:rounded-3xl bg-black/85 border overflow-hidden transition-all duration-300 flex flex-col justify-between backdrop-blur-xl shadow-xl shadow-black/80 ${
                    isCenter
                      ? 'border-teal-400 shadow-[0_0_25px_rgba(45,212,191,0.35)] ring-1 ring-teal-400/50'
                      : 'border-teal-500/30 hover:border-teal-400/80 hover:shadow-[0_0_20px_rgba(45,212,191,0.2)]'
                  }`}
                >
                  <div>
                    <div
                      onClick={() => onOpenDesign(project)}
                      className="relative h-[280px] xs:h-[340px] sm:h-[420px] w-full overflow-hidden cursor-pointer bg-[radial-gradient(ellipse_at_center,_rgba(45,212,191,0.08)_0%,_rgba(0,0,0,0.95)_70%)] flex items-center justify-center p-2.5 sm:p-3 group"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="relative z-10 max-h-full max-w-full object-contain rounded-xl shadow-2xl shadow-black/80 group-hover:scale-[1.03] transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDesign(project);
                        }}
                        className="absolute top-2.5 right-2.5 z-20 p-1.5 sm:p-2 rounded-xl bg-black/80 hover:bg-teal-500 text-white hover:text-slate-950 text-xs backdrop-blur-md transition-all shadow-md border border-white/20 opacity-90 hover:opacity-100 cursor-pointer"
                        title={lang === 'bn' ? 'বড় পর্দায় দেখুন' : 'Preview'}
                      >
                        <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    <div className="p-3 sm:p-5 border-t border-teal-500/20 bg-black/50">
                      <h4
                        onClick={() => onOpenDesign(project)}
                        className="text-xs sm:text-base font-bold text-white group-hover:text-teal-300 transition-colors cursor-pointer line-clamp-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] text-center leading-snug"
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

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-2 flex-wrap px-2">
        {projects.map((project, idx) => {
          const isActive = idx === activeProjectIndex;
          return (
            <button
              key={`design-dot-${project.id}-${idx}`}
              type="button"
              onClick={() => handleDotClick(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center ${
                isActive
                  ? 'w-7 h-2.5 bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.8)]'
                  : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
              }`}
              title={lang === 'bn' ? project.titleBn : project.title}
            >
              <span className="sr-only">Design {idx + 1}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
