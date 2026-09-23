import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, ThemeSettings, ElementStyleOverride } from '../types';
import { defaultSiteConfig } from '../siteDefaults';

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (updater: (prev: SiteConfig) => SiteConfig) => void;
  updateTheme: (themeUpdate: Partial<ThemeSettings>) => void;
  updateProfile: (profileUpdate: Partial<SiteConfig['profile']>) => void;
  updateSection: <K extends keyof SiteConfig>(section: K, data: Partial<SiteConfig[K]>) => void;
  updateElementStyle: (elementId: string, styleUpdate: Partial<ElementStyleOverride>) => void;
  resetElementStyle: (elementId: string) => void;
  resetConfig: () => void;
  exportConfig: () => void;
  importConfig: (jsonString: string) => boolean;
  // Edit & Admin mode
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  activeEditSection: string | null;
  setActiveEditSection: (section: string | null) => void;
  // Elementor Inspector Panel
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  isElementorPanelOpen: boolean;
  setIsElementorPanelOpen: (open: boolean) => void;
  isPreviewMode: boolean;
  setIsPreviewMode: (preview: boolean) => void;
  dockPosition: 'left' | 'right';
  setDockPosition: (pos: 'left' | 'right') => void;
}

const STORAGE_KEY = 'hamza_site_config_v9';

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      // Clean previous versions if present
      ['hamza_site_config_v1', 'hamza_site_config_v2', 'hamza_site_config_v3', 'hamza_site_config_v4', 'hamza_site_config_v5', 'hamza_site_config_v6', 'hamza_site_config_v7', 'hamza_site_config_v8'].forEach((k) => {
        try { localStorage.removeItem(k); } catch (_) {}
      });

      // Clear legacy localStorage avatar item if it was the local placeholder
      try {
        const legacyAvatar = localStorage.getItem('hamza_avatar_url');
        if (legacyAvatar === '/amir-hamza.png' || legacyAvatar === '/Amir hamza png.png') {
          localStorage.removeItem('hamza_avatar_url');
        }
      } catch (_) {}

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to ensure all fields exist cleanly
        return {
          ...defaultSiteConfig,
          ...parsed,
          theme: { ...defaultSiteConfig.theme, ...(parsed.theme || {}) },
          visibility: { ...defaultSiteConfig.visibility, ...(parsed.visibility || {}) },
          profile: {
            ...defaultSiteConfig.profile,
            ...(parsed.profile || {}),
            whatsapp:
              parsed.profile?.whatsapp &&
              !parsed.profile.whatsapp.includes('1813094191') &&
              parsed.profile.whatsapp.trim() !== ''
                ? parsed.profile.whatsapp
                : defaultSiteConfig.profile.whatsapp,
            whatsappUrl: 'https://wa.me/8801716689667',
            location: defaultSiteConfig.profile.location,
            locationBn: defaultSiteConfig.profile.locationBn,
            permanentAddress: defaultSiteConfig.profile.permanentAddress,
            permanentAddressBn: defaultSiteConfig.profile.permanentAddressBn,
            socials: {
              ...defaultSiteConfig.profile.socials,
              ...(parsed.profile?.socials || {}),
              facebook:
                parsed.profile?.socials?.facebook &&
                parsed.profile.socials.facebook !== 'https://facebook.com' &&
                parsed.profile.socials.facebook.includes('facebook.com/')
                  ? parsed.profile.socials.facebook
                  : defaultSiteConfig.profile.socials.facebook,
              instagram: '',
            },
            defaultAvatar:
              parsed.profile?.defaultAvatar &&
              !parsed.profile.defaultAvatar.includes('farabi') &&
              !parsed.profile.defaultAvatar.includes('placeholder') &&
              parsed.profile.defaultAvatar !== '/amir-hamza.png'
                ? parsed.profile.defaultAvatar
                : defaultSiteConfig.profile.defaultAvatar,
            defaultBackground:
              parsed.profile?.defaultBackground &&
              !parsed.profile.defaultBackground.includes('unsplash') &&
              !parsed.profile.defaultBackground.includes('placeholder')
                ? parsed.profile.defaultBackground
                : defaultSiteConfig.profile.defaultBackground,
          },
          elementStyles: { ...(defaultSiteConfig.elementStyles || {}), ...(parsed.elementStyles || {}) },
          hero: { ...defaultSiteConfig.hero, ...(parsed.hero || {}) },
          portfolio: {
            ...defaultSiteConfig.portfolio,
            ...(parsed.portfolio || {}),
            videoProjects:
              Array.isArray(parsed.portfolio?.videoProjects) &&
              parsed.portfolio.videoProjects.some((v: any) => v.youtubeId === '8eIfQb4pf-k') &&
              !parsed.portfolio.videoProjects.some((v: any) => v.youtubeId === 'hAi_ywHkoBA')
                ? parsed.portfolio.videoProjects
                : defaultSiteConfig.portfolio.videoProjects,
          },
          expertise: {
            ...defaultSiteConfig.expertise,
            ...(parsed.expertise || {}),
            items: defaultSiteConfig.expertise.items,
            toolsStack: defaultSiteConfig.expertise.toolsStack,
          },
          education: {
            ...defaultSiteConfig.education,
            ...(parsed.education || {}),
            academicList:
              Array.isArray(parsed.education?.academicList) && parsed.education.academicList.length > 0
                ? parsed.education.academicList
                : defaultSiteConfig.education.academicList,
            academicListBn:
              Array.isArray(parsed.education?.academicListBn) && parsed.education.academicListBn.length > 0
                ? parsed.education.academicListBn
                : defaultSiteConfig.education.academicListBn,
            trainingDataEn: {
              ...defaultSiteConfig.education.trainingDataEn,
              ...(parsed.education?.trainingDataEn || {}),
              topics:
                Array.isArray(parsed.education?.trainingDataEn?.topics) && parsed.education.trainingDataEn.topics.length > 0
                  ? parsed.education.trainingDataEn.topics
                  : defaultSiteConfig.education.trainingDataEn.topics,
            },
            trainingDataBn: {
              ...defaultSiteConfig.education.trainingDataBn,
              ...(parsed.education?.trainingDataBn || {}),
              topics:
                Array.isArray(parsed.education?.trainingDataBn?.topics) && parsed.education.trainingDataBn.topics.length > 0
                  ? parsed.education.trainingDataBn.topics
                  : defaultSiteConfig.education.trainingDataBn.topics,
            },
          },
          contact: { ...defaultSiteConfig.contact, ...(parsed.contact || {}) },
        };
      }
    } catch (e) {
      console.error('Error loading stored config:', e);
    }
    return defaultSiteConfig;
  });

  // Edit mode is disabled by default for public visitors so no one can edit like Elementor.
  // Can only be activated by admin via explicit query parameter ?edit=true or ?admin=true
  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        const search = new URLSearchParams(window.location.search);
        return search.get('edit') === 'true' || search.get('admin') === 'true';
      }
    } catch {
      // ignore
    }
    return false;
  });
  const [activeEditSection, setActiveEditSection] = useState<string | null>(null);

  // Elementor specific controls
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isElementorPanelOpen, setIsElementorPanelOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [dockPosition, setDockPosition] = useState<'left' | 'right'>('left');

  // Synchronize CSS custom properties & local storage on config change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Error persisting config:', e);
    }

    // Apply root CSS variables for dynamic live theme coloring
    const root = document.documentElement;
    root.style.setProperty('--accent-primary', config.theme.accentColor);
    root.style.setProperty('--accent-secondary', config.theme.accentSecondary);
    root.style.setProperty('--bg-tone', config.theme.bgTone);
  }, [config]);

  const updateConfig = (updater: (prev: SiteConfig) => SiteConfig) => {
    setConfig((prev) => updater(prev));
  };

  const updateTheme = (themeUpdate: Partial<ThemeSettings>) => {
    setConfig((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        ...themeUpdate,
      },
    }));
  };

  const updateProfile = (profileUpdate: Partial<SiteConfig['profile']>) => {
    setConfig((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...profileUpdate,
      },
    }));
  };

  const updateSection = <K extends keyof SiteConfig>(section: K, data: Partial<SiteConfig[K]>) => {
    setConfig((prev) => ({
      ...prev,
      [section]:
        typeof prev[section] === 'object' && !Array.isArray(prev[section])
          ? { ...prev[section], ...data }
          : data,
    }));
  };

  const updateElementStyle = (elementId: string, styleUpdate: Partial<ElementStyleOverride>) => {
    setConfig((prev) => {
      const prevStyles = prev.elementStyles || {};
      const currentElementStyle = prevStyles[elementId] || {};
      return {
        ...prev,
        elementStyles: {
          ...prevStyles,
          [elementId]: {
            ...currentElementStyle,
            ...styleUpdate,
          },
        },
      };
    });
  };

  const resetElementStyle = (elementId: string) => {
    setConfig((prev) => {
      const prevStyles = { ...(prev.elementStyles || {}) };
      delete prevStyles[elementId];
      return {
        ...prev,
        elementStyles: prevStyles,
      };
    });
  };

  const resetConfig = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig(defaultSiteConfig);
    setSelectedElementId(null);
  };

  const exportConfig = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `amir-hamza-portfolio-config-${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importConfig = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        const merged: SiteConfig = {
          ...defaultSiteConfig,
          ...parsed,
          theme: { ...defaultSiteConfig.theme, ...(parsed.theme || {}) },
          visibility: { ...defaultSiteConfig.visibility, ...(parsed.visibility || {}) },
          profile: { ...defaultSiteConfig.profile, ...(parsed.profile || {}) },
          elementStyles: { ...(defaultSiteConfig.elementStyles || {}), ...(parsed.elementStyles || {}) },
          hero: { ...defaultSiteConfig.hero, ...(parsed.hero || {}) },
          portfolio: { ...defaultSiteConfig.portfolio, ...(parsed.portfolio || {}) },
          expertise: { ...defaultSiteConfig.expertise, ...(parsed.expertise || {}) },
          education: {
            ...defaultSiteConfig.education,
            ...(parsed.education || {}),
            academicList:
              Array.isArray(parsed.education?.academicList) && parsed.education.academicList.length > 0
                ? parsed.education.academicList
                : defaultSiteConfig.education.academicList,
            academicListBn:
              Array.isArray(parsed.education?.academicListBn) && parsed.education.academicListBn.length > 0
                ? parsed.education.academicListBn
                : defaultSiteConfig.education.academicListBn,
            trainingDataEn: {
              ...defaultSiteConfig.education.trainingDataEn,
              ...(parsed.education?.trainingDataEn || {}),
              topics:
                Array.isArray(parsed.education?.trainingDataEn?.topics) && parsed.education.trainingDataEn.topics.length > 0
                  ? parsed.education.trainingDataEn.topics
                  : defaultSiteConfig.education.trainingDataEn.topics,
            },
            trainingDataBn: {
              ...defaultSiteConfig.education.trainingDataBn,
              ...(parsed.education?.trainingDataBn || {}),
              topics:
                Array.isArray(parsed.education?.trainingDataBn?.topics) && parsed.education.trainingDataBn.topics.length > 0
                  ? parsed.education.trainingDataBn.topics
                  : defaultSiteConfig.education.trainingDataBn.topics,
            },
          },
          contact: { ...defaultSiteConfig.contact, ...(parsed.contact || {}) },
        };
        setConfig(merged);
        return true;
      }
    } catch (e) {
      console.error('Import failed:', e);
    }
    return false;
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        updateConfig,
        updateTheme,
        updateProfile,
        updateSection,
        updateElementStyle,
        resetElementStyle,
        resetConfig,
        exportConfig,
        importConfig,
        isEditMode,
        setIsEditMode,
        activeEditSection,
        setActiveEditSection,
        selectedElementId,
        setSelectedElementId,
        isElementorPanelOpen,
        setIsElementorPanelOpen,
        isPreviewMode,
        setIsPreviewMode,
        dockPosition,
        setDockPosition,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};
