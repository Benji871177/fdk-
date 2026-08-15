import React, { useState, useEffect } from 'react';
import { Language, ActiveTab } from '../types';
import { translations } from '../data/translations';
import { motion } from 'motion/react';
import { 
  Users, 
  MapPin, 
  Award, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  Heart, 
  GraduationCap, 
  Building2,
  Handshake,
  Camera,
  ArrowLeftRight,
  Layers,
  Image as ImageIcon
} from 'lucide-react';

const parseAndRenderStat = (statText: string) => {
  const match = statText.match(/^(\d+)(\+)?\s*(.*)$/);
  if (match) {
    const num = parseInt(match[1], 10);
    const hasPlus = !!match[2];
    const rest = match[3];
    return { num, hasPlus, rest };
  }
  return null;
};

const PremiumCounter: React.FC<{ statText: string }> = ({ statText }) => {
  const parsed = parseAndRenderStat(statText);
  if (!parsed) {
    return (
      <div className="flex flex-col text-left">
        <div className="font-display text-lg sm:text-xl font-bold text-brand-navy tracking-tight leading-tight min-h-[36px] sm:min-h-[48px] flex items-end">
          {statText}
        </div>
      </div>
    );
  }

  const { num, hasPlus, rest } = parsed;
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2400; // slower, premium, highly visible count-up

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(easedProgress * num));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(num);
      }
    };

    window.requestAnimationFrame(step);
  }, [num]);

  return (
    <div className="flex flex-col text-left">
      <div className="font-display text-4xl sm:text-5xl font-extrabold text-[#D29A22] tracking-tight leading-none drop-shadow-sm">
        <span>{count}</span>
        {hasPlus && <span className="text-[#D29A22]/90 ml-0.5">{"+"}</span>}
      </div>
      <p className="text-[10px] sm:text-xs font-bold text-slate-700 tracking-wide mt-3.5 block leading-tight uppercase min-h-[28px]">
        {rest}
      </p>
    </div>
  );
};

interface HomeOverviewProps {
  language: Language;
  onNavigate: (tab: ActiveTab) => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({ language, onNavigate }) => {
  const t = translations[language];

  // Split long hero title elegantly for perfect typography and neat mobile responsive layout
  const fullTitle = t.home.heroTitle;
  let part1 = fullTitle;
  let part2 = "";

  if (language === 'FR') {
    const idx = fullTitle.indexOf(" dans ");
    if (idx !== -1) {
      part1 = fullTitle.slice(0, idx);
      part2 = fullTitle.slice(idx);
    }
  } else {
    const idx = fullTitle.indexOf(" in ");
    if (idx !== -1) {
      part1 = fullTitle.slice(0, idx);
      part2 = fullTitle.slice(idx);
    }
  }

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

        <div className="relative z-10 max-w-4xl space-y-7 text-left lg:text-center lg:mx-auto lg:flex lg:flex-col lg:items-center">

          {part2 ? (
            <h1 className="font-display tracking-tight leading-[1.12] text-white flex flex-col gap-3.5 sm:gap-4.5 lg:items-center">
              {/* Primary action statement - Bold, gradient, highly polished */}
              <motion.span 
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-200 block max-w-4xl leading-tight"
              >
                {part1}
              </motion.span>
              {/* Scope statement - Lighter, clean, gold branding accent highlighting territories */}
              <motion.span 
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-slate-300 block leading-relaxed max-w-4xl lg:mx-auto"
              >
                {part2.trim().startsWith("dans") ? "dans " : "in "}
                <span className="text-[#C5A25D] font-black underline decoration-[#C5A25D]/35 decoration-2 underline-offset-4">
                  {part2.trim().startsWith("dans") 
                    ? part2.trim().slice(5) 
                    : part2.trim().slice(3)}
                </span>
              </motion.span>
            </h1>
          ) : (
            <motion.h1 
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white"
            >
              {fullTitle}
            </motion.h1>
          )}

          <motion.p 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
            className="font-sans text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl font-light max-w-3xl lg:mx-auto"
          >
            {t.home.heroSubtitle}
          </motion.p>

          <motion.div 
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
            className="flex flex-wrap gap-3.5 pt-4 lg:justify-center"
          >
            <button
              id="hero-cta-volunteer"
              onClick={() => onNavigate('volunteer')}
              className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-[#D97706] hover:from-[#B4843A] hover:to-[#B45309] px-6 sm:px-7 py-3.5 sm:py-4 text-xs font-black tracking-wider uppercase text-slate-950 transition-all shadow-lg hover:shadow-brand-gold/15 cursor-pointer border border-[#FFD88F]/25"
            >
              <span>{t.home.ctaVolunteerButton}</span>
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1 text-slate-950" />
            </button>

            <button
              id="hero-cta-gallery"
              onClick={() => onNavigate('gallery')}
              className="group flex items-center gap-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 px-6 sm:px-7 py-3.5 sm:py-4 text-xs font-black tracking-wider uppercase text-white transition-all shadow-lg hover:shadow-emerald-900/30 cursor-pointer border border-emerald-400/30 backdrop-blur-md"
            >
              <Camera className="h-4 w-4 text-brand-gold" />
              <span>{language === 'FR' ? "Galerie Photos (13)" : "Photo Gallery (13)"}</span>
            </button>

            <button
              id="hero-cta-partner"
              onClick={() => onNavigate('volunteer')}
              className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-6 sm:px-7 py-3.5 sm:py-4 text-xs font-black tracking-wider uppercase text-white transition-all backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              {t.home.ctaPartnerButton}
            </button>
          </motion.div>
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
              <PremiumCounter statText={stat.text} />
              <p className="text-3xs font-mono tracking-widest text-brand-navy-light uppercase mt-2.5 font-black">
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

      {/* Visual Impact & Fieldwork Photos Teaser Section */}
      <section className="bg-gradient-to-br from-brand-navy via-slate-900 to-brand-navy rounded-[32px] p-6 sm:p-10 text-white shadow-xl border border-white/10 relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
                <Camera className="h-3.5 w-3.5 text-brand-gold" />
                <span>{language === 'FR' ? "MÉMOIRE VISUELLE & TERRAIN" : "VISUAL FIELD REPOSITORY"}</span>
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                {language === 'FR' ? "Photos d'Impact & Transformations Avant / Après" : "Impact Photos & Before / After Transformations"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
                {language === 'FR'
                  ? "Explorez plus de 13 photographies officielles documentant la métamorphose des sites, les distributions de kits scolaires et l'autonomisation des femmes à Kananga."
                  : "Explore 13+ official field photos documenting site transformations, school supplies distributions, and women's empowerment initiatives across Kananga."}
              </p>
            </div>

            <button
              onClick={() => onNavigate('gallery')}
              className="inline-flex items-center gap-2 bg-brand-gold hover:bg-amber-400 text-brand-navy px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer shrink-0"
            >
              <ArrowLeftRight className="h-4 w-4" />
              <span>{language === 'FR' ? "Voir la Galerie Complète (13+)" : "View Full Gallery (13+)"}</span>
            </button>
          </div>

          {/* Quick interactive teaser cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
            {[
              {
                title: language === 'FR' ? "Cadre Scolaire & Kits" : "School Kits & Learning",
                sub: language === 'FR' ? "Transformation Avant / Après" : "Before / After Transformation",
                img: "https://i.postimg.cc/vHWpTYTz/Whats-App-Image-2026-05-24-at-14-15-00-(5).jpg",
                tag: language === 'FR' ? "ÉDUCATION" : "EDUCATION"
              },
              {
                title: language === 'FR' ? "Autonomie des Femmes" : "Women's Empowerment",
                sub: language === 'FR' ? "Coopératives Solidaires" : "Solidarity Networks",
                img: "https://i.postimg.cc/5yDk0GdG/Whats-App-Image-2026-05-24-at-14-14-59-(1).jpg",
                tag: language === 'FR' ? "AUTONOMIE" : "WOMEN"
              },
              {
                title: language === 'FR' ? "Locaux Communautaires" : "Community Halls",
                sub: language === 'FR' ? "Équipements Sociaux" : "Social Equipment",
                img: "https://i.postimg.cc/VNGywKv6/Whats-App-Image-2026-05-24-at-14-14-59.jpg",
                tag: language === 'FR' ? "SOCIAL" : "SOCIAL"
              },
              {
                title: language === 'FR' ? "Mobilisation Citoyenne" : "Civic Mobilization",
                sub: language === 'FR' ? "Concertations Kananga" : "Community Assemblies",
                img: "https://i.postimg.cc/9ffSLypZ/Whats-App-Image-2026-05-24-at-14-15-00-(6).jpg",
                tag: language === 'FR' ? "CITOYENNETÉ" : "CIVIC"
              }
            ].map((card, i) => (
              <div
                key={i}
                onClick={() => onNavigate('gallery')}
                className="group relative h-44 sm:h-52 rounded-2xl overflow-hidden cursor-pointer border border-white/15 hover:border-brand-gold transition-all duration-300 shadow-md hover:shadow-xl"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[8px] font-mono font-black text-brand-gold bg-black/70 px-2 py-0.5 rounded backdrop-blur-md uppercase border border-white/10">
                    {card.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 space-y-0.5 text-left">
                  <h4 className="font-display font-black text-xs text-white leading-tight line-clamp-1 group-hover:text-brand-gold transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-[9px] text-slate-300 font-sans line-clamp-1">
                    {card.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="space-y-10 pt-4" id="partners-section">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 rounded-full border border-brand-gold/20">
            <Handshake className="h-4 w-4 text-[#D29A22]" />
            <span className="font-mono text-[10px] text-brand-gold font-black uppercase tracking-widest leading-none">
              {language === 'FR' ? "COLLABORATION & SYNERGIE" : "COLLABORATION & SYNERGY"}
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
            {language === 'FR' ? "Nos Partenaires de Confiance" : "Our Trusted Partners"}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
            {language === 'FR'
              ? "Ensemble, nous unissons nos forces avec des organisations locales et internationales de premier plan pour maximiser l'impact à Kananga et à travers la province du Kasaï-Central."
              : "Together, we join forces with leading local and international organisations to deliver direct, sustainable value across Kananga and the Kasaï-Central province."}
          </p>
        </div>

        {/* CSS For Seamless Infinite Horizontal Scrolling Marquee */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes home-partners-marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .home-partners-marquee-track {
            display: flex;
            width: max-content;
            animation: home-partners-marquee 25s linear infinite;
          }
          .home-partners-marquee-track:hover {
            animation-play-state: paused;
          }
        `}} />

        {/* Infinite Scrolling Ticker Container */}
        <div className="relative w-full overflow-hidden py-8 bg-slate-50/80 border border-slate-200/60 rounded-[32px] shadow-xs">
          {/* Soft Left and Right Gradient Fades to mask entrance/exit */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50/90 to-transparent z-10 pointer-events-none" />

          <div className="home-partners-marquee-track gap-6 sm:gap-8 flex items-center pr-6 sm:pr-8">
            {/* Duplicated for smooth loop translation */}
            {[
              {
                id: 'im-visuals',
                name: 'IM',
                logo: 'https://i.postimg.cc/zv1cryDq/Whats-App-Image-2026-05-29-at-19-54-17.jpg',
                category: language === 'FR' ? "Visuels, Publicité & Affichage" : "Visuals, Advertising & Billboards",
                badgeColor: "bg-blue-50 text-blue-800 border-blue-200/50"
              },
              {
                id: 'prima-group',
                name: 'Prima Group',
                logo: 'https://i.postimg.cc/hjV2pK8f/Whats-App-Image-2026-06-01-at-11-32-15.jpg',
                category: language === 'FR' ? "BTP, Logistique & Exploitation" : "Construction, Supply Chain & Mining",
                badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200/50"
              },
              {
                id: 'akili-tech',
                name: 'Akili',
                logo: 'https://i.postimg.cc/ncH83vZz/Akili-logo-Transp-(1).png',
                category: language === 'FR' ? "Technologies, Éducation & Innovation" : "Tech, Digital Literacy & Innovation",
                badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200/50"
              }
            ].reduce((acc, current) => [...acc, current, current], [] as any[]).map((partner, index) => (
              <div 
                key={`${partner.id}-${index}`}
                className="group relative bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex items-center gap-5 sm:gap-6 shadow-xs hover:shadow-md transition-all duration-300 hover:border-brand-gold/30 shrink-0 w-[280px] sm:w-[350px] overflow-hidden select-none"
              >
                {/* Decorative background visual icon indicator overlay */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-brand-gold/5 rounded-bl-full pointer-events-none" />
                
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-white border border-slate-150 p-1.5 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`} 
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain rounded select-none"
                  />
                </div>

                <div className="flex-1 min-w-0 text-left space-y-1.5">
                  <span className={`inline-flex items-center text-[8px] sm:text-[9px] font-extrabold tracking-wider px-2.5 py-0.5 rounded uppercase border ${partner.badgeColor} leading-none`}>
                    {partner.category}
                  </span>
                  <h3 className="font-display font-black text-brand-navy text-sm sm:text-base tracking-tight leading-none truncate">
                    {partner.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none">
                    <Sparkles className="h-2.5 w-2.5 text-brand-gold shrink-0" />
                    <span>{language === 'FR' ? "Partenaire Officiel" : "Official Partner"}</span>
                  </div>
                </div>
              </div>
            ))}
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
