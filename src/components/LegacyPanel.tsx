import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  Award, 
  Compass,
  Target,
  History,
  GraduationCap,
  Quote
} from 'lucide-react';

interface LegacyPanelProps {
  language: Language;
}

export const LegacyPanel: React.FC<LegacyPanelProps> = ({ language }) => {
  const t = translations[language];

  return (
    <div className="space-y-16 animate-fade-in font-sans">
      {/* Header section with Memorial tribute */}
      <section className="text-center max-w-3xl mx-auto space-y-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy/5 px-4 py-1.5 text-3xs font-black text-brand-navy ring-1 ring-brand-gold/20 uppercase tracking-widest font-sans">
          <Award className="h-3.5 w-3.5 text-brand-gold" />
          <span>FDK MEMORIAL TRIBUTE</span>
        </span>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-gold tracking-tight">
          {t.legacy.title}
        </h1>
        <p className="text-brand-gold font-mono text-[10px] uppercase font-black tracking-widest leading-loose">
          {t.legacy.subtitle}
        </p>
      </section>

      {/* Extended Corporate Identity & Vision - Breathtaking Bento Grid */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch pt-2">
        
        {/* Left Side: Extended Heritage Statement (8 Columns) */}
        <div id="heritage-corporate-card" className="lg:col-span-8 bg-white border border-slate-200/80 rounded-[32px] p-8 md:p-10 shadow-3xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-all group-hover:scale-110"></div>
          
          <div className="space-y-6 relative z-10 text-left">
            <div className="flex items-center gap-3">
              <span className="p-3 bg-slate-50 rounded-xl border border-slate-200 shadow-3xs">
                <Compass className="h-5.5 w-5.5 text-brand-gold" />
              </span>
              <div>
                <span className="font-mono text-[9px] font-black text-brand-gold uppercase tracking-widest block leading-none">
                  FDK IDENTITY
                </span>
                <span className="font-display text-base sm:text-lg font-black text-brand-navy tracking-tight mt-1.5 block">
                  {language === 'FR' ? "Vocations, Territoire & Actions" : "Vocation, Territory & Values"}
                </span>
              </div>
            </div>

            {/* Structured Paragraphs of Bio and Heritage Statement */}
            <div className="space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed md:text-base font-normal">
              <p className="font-serif text-slate-800 border-l-4 border-brand-gold pl-5 italic text-sm sm:text-base leading-relaxed">
                {t.legacy.extendedAbout}
              </p>
              <p className="text-slate-600">
                {t.legacy.extendedGeology}
              </p>
              <p className="text-slate-600 text-3xs sm:text-xs pt-4 border-t border-slate-100 font-mono font-bold uppercase tracking-widest text-brand-gold">
                {t.legacy.extendedInspiration}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-3 text-4xs font-mono text-slate-400 uppercase tracking-widest relative z-10 justify-start">
            <History className="h-4.5 w-4.5 text-brand-gold" />
            <span>Fondation d'Utilité Publique • Kasaï-Central</span>
          </div>
        </div>

        {/* Right Side: Elevated Vision Block - Deep signature green & gold card (4 Columns) */}
        <div id="vision-corporate-card" className="lg:col-span-4 bg-brand-navy text-white border border-white/5 rounded-[32px] p-8 shadow-md flex flex-col justify-between relative overflow-hidden group bg-gradient-to-tr from-brand-navy via-slate-950 to-slate-900">
          {/* Subtle gold grid/mesh design helper in background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-xl -mr-10 -mt-10 pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10 text-left">
            <div className="flex items-center gap-3">
              <span className="p-3 bg-white/5 rounded-xl border border-white/10 text-brand-gold shadow-md">
                <Target className="h-5.5 w-5.5" />
              </span>
              <div>
                <span className="font-mono text-[9px] font-black text-brand-gold uppercase tracking-widest block leading-none">
                  SOCIAL VISION
                </span>
                <h4 className="font-display text-lg font-black text-white tracking-tight mt-1.5">
                  {t.legacy.visionTitle}
                </h4>
              </div>
            </div>

            {/* Playfair elegance quotation for vision */}
            <div className="relative pt-6">
              <span className="absolute -top-3 -left-2 text-8xl font-serif text-brand-gold/10 leading-none select-none">“</span>
              <p className="font-serif text-sm sm:text-base leading-relaxed text-slate-300 relative z-10 tracking-wide font-normal">
                {t.legacy.visionText}
              </p>
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-white/10 flex justify-between items-center text-5xs font-mono text-slate-400 uppercase tracking-widest relative z-10">
            <span>Republique Democratique du Congo</span>
            <span className="text-brand-gold font-bold">★ INCLUSIVE</span>
          </div>
        </div>

      </section>

      {/* Split section: Historical Tribute Bio & Hero Timelines / Quote */}
      <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start pt-4">
        
        {/* Left Hand: Dr François' Personal Profile & Background Description */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2">
              <div className="h-1.5 w-10 bg-brand-gold rounded-full"></div>
              <span className="font-mono text-xs uppercase tracking-widest text-slate-600 font-black">
                {t.legacy.bioTitle}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-black text-brand-gold tracking-tight">
              {language === 'FR' ? "L'Excellence d'un Pionnier de la Géologie" : "A Pioneer in African Geological Sciences"}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {t.legacy.bioText1}
            </p>

            <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {t.legacy.bioText2}
            </p>
          </div>
        </div>

        {/* Right Hand: Quote Callout & Academic/Professional Milestones Timeline */}
        <div className="lg:col-span-5 space-y-6 text-left">
          {/* Styled Callout Box with Quote from Dr François */}
          <div className="relative rounded-[24px] border border-brand-gold/15 bg-slate-50/65 p-6 md:p-8 shadow-3xs overflow-hidden">
            <div className="absolute top-2 left-2 text-brand-gold/5 transform scale-125">
              <Quote className="h-12 w-12" />
            </div>
            
            <div className="relative z-10 space-y-4">
              <p className="font-serif text-xs md:text-sm font-medium italic text-slate-700 leading-relaxed">
                "{t.legacy.quote}"
              </p>
              
              <div className="pt-3 border-t border-slate-200/60 flex flex-col">
                <span className="text-xxs font-extrabold text-brand-navy font-sans">
                  _Docteur François WA MUSANGANA KATEKESHA
                </span>
                <span className="text-4xs text-brand-gold font-mono uppercase tracking-widest font-black mt-1">
                  1945 - 2022 • EXECUTIVE MEMORIAL TRIBUTE
                </span>
              </div>
            </div>
          </div>

          {/* Academic Timeline */}
          <div className="rounded-[24px] bg-white p-6 border border-slate-200/80 shadow-3xs">
            <div className="flex items-center gap-2 text-brand-navy font-mono font-black text-[10px] uppercase tracking-widest border-b border-slate-100 pb-4">
              <GraduationCap className="h-4.5 w-4.5 text-brand-gold" />
              <span>{language === 'FR' ? "Chronologie Universitaire" : "University Timeline"}</span>
            </div>
            
            <ul className="mt-4 space-y-4">
              <li className="flex gap-4 text-xs">
                <span className="font-mono font-black text-xs text-brand-navy bg-slate-50 h-7 w-12 rounded-lg flex items-center justify-center shrink-0 border border-brand-gold/20">1978</span>
                <p className="text-slate-600 text-xs mt-0.5 leading-normal">
                  <strong className="text-slate-900 font-bold">{language === 'FR' ? "Doctorat (PhD) de l'Université de Liège" : "PhD from University of Liège"}</strong> {language === 'FR' ? "avec grande distinction." : "graduated with high honors."}
                </p>
              </li>
              <li className="flex gap-4 text-xs">
                <span className="font-mono font-black text-xs text-brand-navy bg-slate-50 h-7 w-12 rounded-lg flex items-center justify-center shrink-0 border border-brand-gold/20">1985</span>
                <p className="text-slate-600 text-xs mt-0.5 leading-normal">
                  <strong className="text-slate-900 font-bold">{language === 'FR' ? "Cartographie Géologique" : "Geological Resource Mapping"}</strong> {language === 'FR' ? "des ressources naturelles en RDC." : "of domestic natural resources in the DRC."}
                </p>
              </li>
              <li className="flex gap-4 text-xs">
                <span className="font-mono font-black text-xs text-brand-navy bg-slate-50 h-7 w-12 rounded-lg flex items-center justify-center shrink-0 border border-brand-gold/20">22+</span>
                <p className="text-slate-600 text-xs mt-0.5 leading-normal">
                  <strong className="text-slate-900 font-bold">{language === 'FR' ? "Mentorat & Conseil" : "Mentorship & Geology Consulting"}</strong> {language === 'FR' ? "pour l'émergence des jeunes leaders et ingénieurs civils." : "shaping young scholars and mining engineers."}
                </p>
              </li>
            </ul>
          </div>
        </div>

      </section>
    </div>
  );
};
