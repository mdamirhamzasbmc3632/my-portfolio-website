export interface PersonalDetails {
  fatherName: string;
  fatherNameBn: string;
  motherName: string;
  motherNameBn: string;
  dob: string;
  maritalStatus: string;
  maritalStatusBn: string;
  religion: string;
  religionBn: string;
  permanentAddress: string;
  permanentAddressBn: string;
  languages: { lang: string; langBn: string; proficiency: string; proficiencyBn: string }[];
}

export interface WorkExperienceItem {
  role: string;
  roleBn: string;
  highlightRole?: string;
  highlightRoleBn?: string;
  organization: string;
  organizationBn: string;
  organizationUrl?: string;
  period: string;
  periodBn: string;
  responsibilities: string[];
  responsibilitiesBn: string[];
}

export interface ProfileData {
  name: string;
  nameEn: string;
  bio: string;
  bioEn: string;
  careerObjective?: string;
  careerObjectiveBn?: string;
  email: string;
  whatsapp: string;
  whatsappUrl?: string;
  location: string;
  locationBn?: string;
  permanentAddress?: string;
  permanentAddressBn?: string;
  defaultAvatar: string;
  defaultBackground?: string;
  cvUrl?: string;
  socials: {
    youtube: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}

export interface VideoProject {
  id: string;
  title: string;
  titleBn: string;
  category: string;
  categoryLabel: string;
  categoryLabelBn: string;
  platform?: 'youtube' | 'vimeo';
  youtubeId?: string;
  youtubeUrl?: string;
  youtubeEmbedUrl?: string;
  vimeoId?: string;
  vimeoEmbedUrl?: string;
  thumbnail: string;
  duration: string;
  client: string;
  views: string;
  aspectRatio: string;
  description: string;
  descriptionBn: string;
  toolsUsed: string[];
  keyFeatures: string[];
  keyFeaturesBn: string[];
  videoPreviewUrl?: string;
}

export interface DesignProject {
  id: string;
  title: string;
  titleBn: string;
  category: string;
  categoryLabel: string;
  categoryLabelBn: string;
  image: string;
  client: string;
  dimensions: string;
  description: string;
  descriptionBn: string;
  toolsUsed: string[];
  keyFeatures: string[];
  keyFeaturesBn: string[];
}

export interface ExpertiseItem {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  iconName: 'video' | 'palette' | 'eye' | 'file-text' | 'mic' | 'award' | 'trending-up' | 'target' | 'shield' | 'layout' | 'cpu';
  tools?: string[];
}

export interface AcademicItem {
  degree: string;
  institute?: string;
  subject?: string;
  year: string;
  status: string;
  result?: string;
  iconName: 'graduation-cap' | 'award' | 'sparkles';
  desc: string;
}

export interface TrainingTopic {
  name: string;
  tools: string;
}

export interface TrainingInstitution {
  institution: string;
  courseName: string;
  batch: string;
  topics: TrainingTopic[];
}

export type SupportedLanguage = 'en' | 'bn';

export interface ThemeSettings {
  accentPreset: 'sky' | 'teal' | 'emerald' | 'violet' | 'amber' | 'rose' | 'custom';
  accentColor: string; // e.g. '#38bdf8'
  accentSecondary: string; // e.g. '#10b981'
  bgTone: string; // e.g. '#07080a'
  sectionPadding: 'compact' | 'normal' | 'spacious'; // compact (py-12), normal (py-20), spacious (py-28)
  containerWidth: 'standard' | 'wide' | 'ultra'; // standard (max-w-6xl), wide (max-w-7xl), ultra (max-w-[1440px])
  fontScale: 'compact' | 'normal' | 'large';
  cardRadius: 'md' | 'xl' | '2xl' | '3xl';
}

export interface SectionVisibility {
  hero: boolean;
  portfolio: boolean;
  expertise: boolean;
  education: boolean;
  contact: boolean;
}

export interface ElementStyleOverride {
  color?: string;
  fontSize?: string;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  padding?: string;
  borderRadius?: string;
  borderColor?: string;
  borderWidth?: string;
  opacity?: number;
  fontWeight?: string;
  letterSpacing?: string;
  hidden?: boolean;
}

export interface SiteConfig {
  theme: ThemeSettings;
  visibility: SectionVisibility;
  profile: ProfileData;
  elementStyles?: Record<string, ElementStyleOverride>;
  hero: {
    badgeTextEn: string;
    badgeTextBn: string;
    badgeRoleEn: string;
    badgeRoleBn: string;
    titleFirst: string;
    titleLast: string;
    subtitleEn: string;
    subtitleBn: string;
    ctaPrimaryTextEn: string;
    ctaPrimaryTextBn: string;
    ctaPrimaryLink: string;
    ctaSecondaryTextEn: string;
    ctaSecondaryTextBn: string;
    ctaSecondaryLink: string;
  };
  portfolio: {
    badgeEn: string;
    badgeBn: string;
    titleEn: string;
    titleBn: string;
    highlightWordEn: string;
    highlightWordBn: string;
    descEn: string;
    descBn: string;
    videoProjects: VideoProject[];
    designProjects: DesignProject[];
  };
  expertise: {
    badgeEn: string;
    badgeBn: string;
    titleEn: string;
    titleBn: string;
    highlightWordEn: string;
    highlightWordBn: string;
    descEn: string;
    descBn: string;
    items: ExpertiseItem[];
    toolsStack: Array<{ name: string; category: string }>;
  };
  education: {
    badgeEn: string;
    badgeBn: string;
    titleEn: string;
    titleBn: string;
    highlightWordEn: string;
    highlightWordBn: string;
    descEn: string;
    descBn: string;
    academicList: AcademicItem[];
    academicListBn: AcademicItem[];
    trainingDataEn: TrainingInstitution;
    trainingDataBn: TrainingInstitution;
  };
  contact: {
    badgeEn: string;
    badgeBn: string;
    titleEn: string;
    titleBn: string;
    highlightWordEn: string;
    highlightWordBn: string;
    descEn: string;
    descBn: string;
  };
}
