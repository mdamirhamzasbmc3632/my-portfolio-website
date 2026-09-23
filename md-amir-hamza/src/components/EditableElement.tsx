import React, { useState } from 'react';
import { Pencil, Sliders } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface EditableElementProps {
  elementId: string;
  label: string;
  elementType?: 'text' | 'heading' | 'button' | 'image' | 'card' | 'badge' | 'section';
  children: React.ReactNode;
  className?: string;
  inlineText?: string;
  onInlineTextChange?: (newText: string) => void;
}

export const EditableElement: React.FC<EditableElementProps> = ({
  elementId,
  label,
  elementType = 'text',
  children,
  className = '',
  inlineText,
  onInlineTextChange,
}) => {
  const {
    isEditMode,
    isPreviewMode,
    selectedElementId,
    setSelectedElementId,
    setIsElementorPanelOpen,
    config,
  } = useSiteConfig();

  const [isHovered, setIsHovered] = useState(false);
  const [isDirectEditing, setIsDirectEditing] = useState(false);
  const [draftText, setDraftText] = useState(inlineText || '');

  const isSelected = selectedElementId === elementId;
  const isBuilderActive = isEditMode && !isPreviewMode;

  const elementStyle = config.elementStyles?.[elementId];

  // If hidden via Elementor Advanced tab
  if (elementStyle?.hidden && !isBuilderActive) {
    return null;
  }

  const handleSelectElement = (e: React.MouseEvent) => {
    if (!isBuilderActive) return;
    // Don't stop propagation if it's already in direct editing mode
    if (isDirectEditing) return;
    e.preventDefault();
    e.stopPropagation();
    setSelectedElementId(elementId);
    setIsElementorPanelOpen(true);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!isBuilderActive || !onInlineTextChange || inlineText === undefined) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDirectEditing(true);
    setDraftText(inlineText);
  };

  const handleInlineBlur = () => {
    setIsDirectEditing(false);
    if (onInlineTextChange && draftText !== inlineText) {
      onInlineTextChange(draftText);
    }
  };

  const handleInlineKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleInlineBlur();
    } else if (e.key === 'Escape') {
      setIsDirectEditing(false);
      setDraftText(inlineText || '');
    }
  };

  // Compile dynamic style override object
  const customInlineStyles: React.CSSProperties = {};
  if (elementStyle?.color) customInlineStyles.color = elementStyle.color;
  if (elementStyle?.fontSize) customInlineStyles.fontSize = elementStyle.fontSize;
  if (elementStyle?.backgroundColor) customInlineStyles.backgroundColor = elementStyle.backgroundColor;
  if (elementStyle?.textAlign) customInlineStyles.textAlign = elementStyle.textAlign;
  if (elementStyle?.padding) customInlineStyles.padding = elementStyle.padding;
  if (elementStyle?.borderRadius) customInlineStyles.borderRadius = elementStyle.borderRadius;
  if (elementStyle?.opacity !== undefined) customInlineStyles.opacity = elementStyle.opacity;
  if (elementStyle?.borderColor) customInlineStyles.borderColor = elementStyle.borderColor;
  if (elementStyle?.borderWidth) customInlineStyles.borderWidth = elementStyle.borderWidth;
  if (elementStyle?.fontWeight) customInlineStyles.fontWeight = elementStyle.fontWeight;
  if (elementStyle?.letterSpacing) customInlineStyles.letterSpacing = elementStyle.letterSpacing;

  // Determine base positioning class - avoid injecting 'relative' if className already has absolute or fixed
  const hasCustomPositioning = /\b(absolute|fixed|contents)\b/.test(className);
  const positionClass = hasCustomPositioning ? '' : 'relative';

  return (
    <div
      data-elementor-id={elementId}
      className={`${positionClass} transition-all duration-150 ${className} ${
        isBuilderActive
          ? isSelected
            ? 'ring-2 ring-sky-400 ring-offset-2 ring-offset-[#07080a] bg-sky-500/[0.04] rounded-lg'
            : isHovered
            ? 'ring-1 ring-sky-400/80 ring-dashed bg-sky-500/[0.02] rounded-lg'
            : ''
          : ''
      } ${elementStyle?.hidden && isBuilderActive ? 'opacity-40 line-through' : ''}`}
      style={customInlineStyles}
      onMouseEnter={() => isBuilderActive && setIsHovered(true)}
      onMouseLeave={() => isBuilderActive && setIsHovered(false)}
      onClick={handleSelectElement}
      onDoubleClick={handleDoubleClick}
      title={isBuilderActive ? `${label} — ক্লিক করে স্টাইল ও কন্টেন্ট এডিট করুন` : undefined}
    >
      {/* Elementor Floating Handle / Badge on hover or select */}
      {isBuilderActive && (isHovered || isSelected) && (
        <div
          className={`absolute -top-3.5 left-2 z-30 flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-lg cursor-pointer transition-transform ${
            isSelected
              ? 'bg-sky-500 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.6)] scale-105'
              : 'bg-[#0b1120] text-sky-300 border border-sky-500/50 hover:bg-sky-500 hover:text-slate-950'
          }`}
          onClick={handleSelectElement}
        >
          <Pencil className="w-2.5 h-2.5" />
          <span className="whitespace-nowrap tracking-wide">{label}</span>
          <span className="text-[9px] opacity-75 font-mono">[{elementType}]</span>
        </div>
      )}

      {/* Direct inline editing input when double clicked */}
      {isDirectEditing ? (
        <div className="relative z-20 w-full" onClick={(e) => e.stopPropagation()}>
          {draftText.length > 60 ? (
            <textarea
              autoFocus
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              onBlur={handleInlineBlur}
              onKeyDown={handleInlineKeyDown}
              className="w-full bg-[#0d121f] text-white p-2 text-sm border-2 border-sky-400 rounded-lg shadow-2xl focus:outline-none resize-y"
              rows={3}
            />
          ) : (
            <input
              type="text"
              autoFocus
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              onBlur={handleInlineBlur}
              onKeyDown={handleInlineKeyDown}
              className="w-full bg-[#0d121f] text-white px-2.5 py-1 text-sm border-2 border-sky-400 rounded-lg shadow-2xl focus:outline-none"
            />
          )}
          <span className="text-[10px] text-sky-400 block mt-0.5">
            Enter চাপুন সেভ করতে, Esc চাপুন বাতিল করতে
          </span>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
