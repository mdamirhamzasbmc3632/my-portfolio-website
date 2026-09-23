import { ThemeSettings } from '../types';

export const getSectionPaddingClass = (padding?: ThemeSettings['sectionPadding']) => {
  switch (padding) {
    case 'compact':
      return 'py-12 sm:py-16';
    case 'spacious':
      return 'py-28 sm:py-36';
    case 'normal':
    default:
      return 'py-20 sm:py-24';
  }
};

export const getContainerWidthClass = (width?: ThemeSettings['containerWidth']) => {
  switch (width) {
    case 'standard':
      return 'max-w-6xl';
    case 'ultra':
      return 'max-w-[1440px]';
    case 'wide':
    default:
      return 'max-w-7xl';
  }
};

export const getFontScaleClass = (scale?: ThemeSettings['fontScale']) => {
  switch (scale) {
    case 'compact':
      return 'text-sm';
    case 'large':
      return 'text-lg';
    case 'normal':
    default:
      return 'text-base';
  }
};

export const getCardRadiusClass = (radius?: ThemeSettings['cardRadius']) => {
  switch (radius) {
    case 'md':
      return 'rounded-md';
    case 'xl':
      return 'rounded-xl';
    case '3xl':
      return 'rounded-3xl';
    case '2xl':
    default:
      return 'rounded-2xl';
  }
};
