import React from 'react';
import { Language, ActiveTab } from '../types';
import { translations } from '../data/translations';
import { 
  Users, 
  MapPin, 
  Award, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  Heart, 
  GraduationCap, 
  Building2 
} from 'lucide-react';

interface HomeOverviewProps {
  language: Language;
  onNavigate: (tab: ActiveTab) => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({ language, onNavigate }) => {
  const t = translations[language];

  // Key features matching the slide axes
  const fastFeatures = [
    {
      icon: <GraduationCap className="h-6 w-6 text-brand-navy" />,
      title_fr: "Éducation & Mentorat",
      title_en: "Education & Mentorship",
      desc_fr: "Formations techniques et scientifiques inspirées par l'excellence académique.",
      desc_en: "Technical & scientific training tracks inspired by academic excellence."
    },
    {
      icon: <Users className="h-6 w-6 text-brand-navy" />,
      title_fr: "Autonomisation Féminine",
      title_en: "Women's Empowerment",
      desc_fr: "Incubateurs d'activités génératrices de revenus et soutien aux filles-mères.",
      desc_en: "Revenue-generating incubators and support networks for young mothers."
    },
    {
      icon: <Building2 className="h-6 w-6 text-brand-navy" />,
      title_fr: "Inclusion Territoriale",
      title_en: "Territorial Inclusion",
      desc_fr: "Développement socio-économique ciblé pour les populations vulnérables.",
      desc_en: "Targeted socio-economic growth programs for vulnerable rural citizens."
    }
  ];

  return (
    <div className="space-y-16 animate-fade-in">
      {/* High-End Fintech Style Hero Banner */}
      <section className="relative overflow-hidden rounded-[32px] bg-brand-navy bg-gradient-to-br from-brand-navy via-slate-950 to-slate-900 p-8 text-white shadow-2xl sm:p-14 lg:p-18 border border-white/[0.04] group hover:shadow-slate-950/20 transition-all duration-500">
        {/* Extreme Premium Gradient mesh in upper-right corner */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 h-96 w-96 rounded-full bg-gradient-to-tr from-brand-gold/15 to-transparent blur-4xl transition-all duration-700 group-hover:scale-110 pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-slate-500/5 blur-4xl transition-all duration-700 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-7 text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/65 px-4.5 py-1.5 text-3xs font-black tracking-widest text-[#C5A25D] ring-1 ring-white/10 backdrop-blur-md uppercase">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-brand-gold" />
            <span>FDK NGO PORTAL</span>
          </span>

          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white">
            {t.home.heroTitle}
          </h1>

          <p className="font-sans text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl font-light max-w-3xl">
            {t.home.heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              id="hero-cta-volunteer"
              onClick={() => onNavigate('volunteer')}
              className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-[#D97706] hover:from-[#B4843A] hover:to-[#B45309] px-7 py-4 text-xs font-black tracking-wider uppercase text-slate-950 transition-all shadow-lg hover:shadow-brand-gold/15 cursor-pointer border border-[#FFD88F]/25"
            >
              <span>{t.home.ctaVolunteerButton}</span>
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1 text-slate-950" />
            </button>

            <button
              id="hero-cta-partner"
              onClick={() => onNavigate('volunteer')}
              className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-7 py-4 text-xs font-black tracking-wider uppercase text-white transition-all backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              {t.home.ctaPartnerButton}
            </button>
          </div>
        </div>
      </section>

      {/* Quick stats grids */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-2">
        {[
          { text: t.home.quickStats.women, sub: language === 'FR' ? "Coopératives de Kananga" : "Kananga Cooperatives", badge: "UN GOAL 1 & 4" },
          { text: t.home.quickStats.students, sub: language === 'FR' ? "Fournitures et tuteurs" : "Supplies & tutoring", badge: "UN GOAL 2 & 5" },
          { text: t.home.quickStats.volunteers, sub: language === 'FR' ? "Engagés sur le terrain" : "On the field", badge: "ACTIVE STATUS" },
          { text: t.home.quickStats.location, sub: language === 'FR' ? "Capitale provinciale" : "Provincial capital", badge: "RDC DOMAIN" }
        ].map((stat, i) => (
          <div key={i} className="flex flex-col justify-between rounded-3xl bg-white hover:bg-slate-50/80 text-slate-800 p-6 shadow-md border border-slate-200/80 hover:border-brand-gold/35 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden text-left">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div className="flex justify-between items-center relative z-10">
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-brand-navy bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/55">
                {stat.badge}
              </span>
              <Heart className="h-4 w-4 text-brand-navy-light group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-6 relative z-10">
              <h3 className="font-display text-xl sm:text-2xl font-black text-brand-navy leading-tight">
                {stat.text}
              </h3>
              <p className="text-3xs font-mono tracking-widest text-brand-navy-light uppercase mt-2 font-black">
                {stat.sub}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Styled Corporate Editorial details layout */}
      <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center pt-4">
        {/* Left Side: About us biography narrative */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2">
            <div className="h-1.5 w-10 bg-brand-gold rounded-full"></div>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-600 font-black">
              {t.common.about}
            </span>
          </div>

          <h2 className="font-display text-3xl font-extrabold text-brand-gold tracking-tight sm:text-4xl lg:text-5xl lg:leading-none">
            {t.home.aboutTitle}
          </h2>

          <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed font-normal">
            {t.home.aboutIntro}
          </p>

          <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-4">
            {t.home.aboutGeology}
          </p>

          <div className="border-l-4 border-brand-gold bg-slate-100 p-5 rounded-r-2xl border-r border-y border-slate-150/50">
            <p className="text-3xs font-mono text-brand-navy font-black uppercase tracking-widest">
              {t.home.visionTitle}
            </p>
            <p className="font-serif text-slate-800 text-sm sm:text-base mt-2 leading-relaxed italic">
              "{t.home.visionText}"
            </p>
          </div>
        </div>

        {/* Right Side: Map location mockup & fastFeatures */}
        <div className="lg:col-span-5 space-y-6 bg-white border border-slate-200/80 rounded-[32px] p-6 sm:p-8 md:p-10 shadow-3xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-2xl pointer-events-none"></div>
          <h3 className="text-slate-800 font-display font-black text-lg tracking-wide flex items-center gap-2 border-b border-slate-100 pb-4">
            <MapPin className="h-5 w-5 text-brand-gold" />
            <span>Kasaï-Central • Kananga</span>
          </h3>

          <div className="space-y-4 relative z-10">
            {fastFeatures.map((feat, idx) => (
              <div key={idx} className="flex gap-4 items-start bg-slate-50/50 hover:bg-slate-50 p-4 rounded-2xl border border-slate-100 transition-all duration-300">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shrink-0 shadow-3xs">
                  {feat.icon}
                </div>
                <div>
                  <h4 className="font-display font-black text-slate-800 text-xs sm:text-sm">
                    {language === 'FR' ? feat.title_fr : feat.title_en}
                  </h4>
                  <p className="font-sans text-xs text-slate-500 mt-1 leading-relaxed">
                    {language === 'FR' ? feat.desc_fr : feat.desc_en}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Slogan highlight banner */}
          <div className="pt-2 relative z-10">
            <div className="rounded-2xl bg-brand-navy py-5 px-6 text-center shadow-md border border-white/5 bg-gradient-to-br from-brand-navy to-slate-900">
              <p className="font-serif italic font-medium text-white text-base tracking-wide leading-relaxed">
                "{t.common.slogan}"
              </p>
              <p className="text-brand-gold text-[10px] font-mono mt-2 font-black uppercase tracking-wider">
                {t.common.secondarySlogan}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Callout Quote page footer theme */}
      <section className="rounded-3xl bg-slate-100 p-8 shadow-xs text-center border border-slate-200/80 max-w-4xl mx-auto flex flex-col items-center">
        <p className="font-serif text-slate-800 text-sm sm:text-base md:text-lg italic leading-relaxed font-light">
          "{t.home.calloutText}"
        </p>
        <div className="mt-5 flex gap-2">
          <span className="h-1.5 w-6 rounded-full bg-brand-navy"></span>
          <span className="h-1.5 w-12 rounded-full bg-brand-gold"></span>
          <span className="h-1.5 w-6 rounded-full bg-brand-navy"></span>
        </div>
      </section>
    </div>
  );
};
