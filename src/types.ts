export type Language = 'FR' | 'EN';

export type ActiveTab = 'home' | 'legacy' | 'impact' | 'board' | 'volunteer' | 'gallery';

export interface VolunteerForm {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  availability: 'weekends' | 'weekdays' | 'flexible' | 'specific';
  primaryInterest: 'education' | 'gender_equality' | 'sports_culture' | 'workshop_admin';
  motivation: string;
  signedCharter: boolean;
  signatureDate: string;
}

export interface SponsorPledge {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  selectedTier: 1000 | 2000 | 3500 | 5000 | 'custom' | null;
  customAmount: number;
  materialPledges: {
    clothing: boolean;
    schoolKits: boolean;
    sportsKits: boolean;
    hygieneEquipment: boolean;
    otherGoods: string;
  };
  projectFocus: 'general' | 'health' | 'education' | 'women_empowerment' | 'entrepreneurship';
  message: string;
}

export interface ProgramPillar {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  details: Record<Language, string[]>;
  metrics: Record<Language, string>;
  icon: string;
}
