import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  Network, 
  Target, 
  Map, 
  Users, 
  Calendar, 
  HeartHandshake, 
  Clock, 
  TrendingUp, 
  Award,
  BookOpen,
  Activity,
  Dribbble,
  Megaphone
} from 'lucide-react';

interface ImpactDirectoryProps {
  language: Language;
}

interface KasaïDistrict {
  id: string;
  name: string;
  typicalNeed: Record<Language, string>;
  vulnerabilityIndex: string; // high / critical / medium
}

export const ImpactDirectory: React.FC<ImpactDirectoryProps> = ({ language }) => {
  const t = translations[language];

  const districts: KasaïDistrict[] = [
    { id: 'kananga', name: "Kananga (Ville)", typicalNeed: { FR: "Chômage des jeunes, réinsertion des filles-mères.", EN: "Youth unemployment, single mother upskilling." }, vulnerabilityIndex: "Élevé / High" },
    { id: 'demba', name: "Demba (Territoire)", typicalNeed: { FR: "Soutien aux coopératives agricoles féminines.", EN: "Sponsorship for female farming cooperatives." }, vulnerabilityIndex: "Critique / Critical" },
    { id: 'dibaya', name: "Dibaya (Territoire)", typicalNeed: { FR: "Kits scolaires et formation civique populaire.", EN: "School kits delivery & popular civic lectures." }, vulnerabilityIndex: "Élevé / High" },
    { id: 'kazumba', name: "Kazumba (Territoire)", typicalNeed: { FR: "Infrastructures d'hygiène et sensibilisation santé.", EN: "Hygiene systems & health awareness." }, vulnerabilityIndex: "Critique / Critical" },
    { id: 'luiza', name: "Luiza (Territoire)", typicalNeed: { FR: "Formations professionnelles et auto-emploi.", EN: "Vocational courses & self-employment mentoring." }, vulnerabilityIndex: "Élevé / High" }
  ];

  const coreActionsList = [
    {
      idx: 0,
      icon: <BookOpen className="h-5 w-5 text-brand-gold" />,
      title: t.impact.actions[0].title,
      desc: t.impact.actions[0].desc,
      simBudget: 2400,
      simDays: 45,
      simAudience: { FR: "Jeunes déscolarisés / Teen girls", EN: "School dropouts / Teen girls" }
    },
    {
      idx: 1,
      icon: <Megaphone className="h-5 w-5 text-brand-navy" />,
      title: t.impact.actions[1].title,
      desc: t.impact.actions[1].desc,
      simBudget: 1200,
      simDays: 20,
      simAudience: { FR: "Chefs coutumiers & Jeunes", EN: "Tribal leaders & Youths" }
    },
    {
      idx: 2,
      icon: <Activity className="h-5 w-5 text-brand-gold" />,
      title: t.impact.actions[2].title,
      desc: t.impact.actions[2].desc,
      simBudget: 1500,
      simDays: 30,
      simAudience: { FR: "Mamans & filles de Kananga", EN: "Mothers & daughters of Kananga" }
    },
    {
      idx: 3,
      icon: <Dribbble className="h-5 w-5 text-brand-navy" />,
      title: t.impact.actions[3].title,
      desc: t.impact.actions[3].desc,
      simBudget: 900,
      simDays: 14,
      simAudience: { FR: "Clubs sportifs scolaires", EN: "School athletics associations" }
    },
    {
      idx: 4,
      icon: <Network className="h-5 w-5 text-brand-gold" />,
      title: t.impact.actions[4].title,
      desc: t.impact.actions[4].desc,
      simBudget: 3200,
      simDays: 60,
      simAudience: { FR: "Cadres associatifs émergents", EN: "Emerging association leaders" }
    }
  ];

  // State for Simulator Selector
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('kananga');
  const [selectedActionIndex, setSelectedActionIndex] = useState<number>(0);

  const activeDistrict = districts.find(d => d.id === selectedDistrictId) || districts[0];
  const activeAction = coreActionsList.find(a => a.idx === selectedActionIndex) || coreActionsList[0];

  // Simulation metrics calculation based on indices to give a real, computed feel
  const computedReach = Math.round((activeAction.simBudget / 10) * (selectedDistrictId === 'kananga' ? 1.4 : 0.95));
  const estimatedVolunteersRequired = Math.ceil(activeAction.simBudget / 400);

  return (
    <div className="space-y-16 animate-fade-in text-slate-800">
      {/* Narrative header */}
      <section className="text-center max-w-3xl mx-auto space-y-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy/5 px-4 py-1.5 text-3xs font-black text-brand-navy ring-1 ring-brand-gold/20 uppercase tracking-widest font-sans">
          <Target className="h-4 w-4 text-brand-gold animate-pulse" />
          <span>FDFK STRATEGIC HORIZON</span>
        </span>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-gold tracking-tight">
          {t.impact.title}
        </h1>
        <p className="text-brand-gold font-mono text-[10px] uppercase font-black tracking-widest leading-loose">
          {t.impact.subtitle}
        </p>
      </section>

      {/* Intro overview of strategic axes */}
      <section className="bg-brand-navy bg-gradient-to-br from-brand-navy via-slate-950 to-slate-900 border border-white/[0.04] rounded-[32px] p-8 sm:p-12 text-white relative overflow-hidden shadow-md">
        <div className="absolute bottom-[-100px] right-[-100px] h-60 w-60 rounded-full bg-brand-gold/10 blur-2xl"></div>
        <div className="max-w-2xl space-y-4 relative z-10 text-left">
          <h2 className="text-[10px] font-black font-mono text-brand-gold uppercase tracking-widest">
            {language === 'FR' ? "NOTRE ENGAGEMENT DE DÉVELOPPEMENT" : "OUR DEVELOPMENT CHARTER"}
          </h2>
          <p className="font-display text-base sm:text-lg md:text-xl font-medium text-slate-300 leading-relaxed tracking-tight">
            {language === 'FR' ? "La FDFK est investie dans une approche scientifique et pragmatique du développement du Kasaï-Central, maximisant l'autonomie et les retombées réelles pour les femmes et les jeunes ruraux." : t.impact.axesIntro}
          </p>
        </div>
      </section>

      {/* Grid of the 5 priorities layout */}
      <section className="space-y-6 text-left">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-10 bg-brand-gold rounded-full"></div>
          <h2 className="font-display text-xl sm:text-2xl font-black text-brand-gold tracking-tight">
            {t.impact.prioritiesTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 pt-2">
          {t.impact.priorities.map((prio: { num: string; text: string }) => (
            <div key={prio.num} className="rounded-2xl border border-slate-200/80 hover:border-slate-300 bg-white p-6 shadow-3xs hover:shadow-2xs transition-all duration-300 relative pt-12 group">
              <span className="absolute top-4 left-6 text-3xl font-black text-slate-200/90 font-mono select-none group-hover:text-brand-gold/20 transition-colors">
                #0{prio.num}
              </span>
              <p className="text-slate-700 text-xs leading-relaxed relative z-10 font-semibold">
                {prio.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Left-Right side: Ground activities on Left, Interactive Planner Simulator on Right */}
      <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start pt-6">
        {/* Ground activities lists */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6 text-left">
          <div className="inline-flex items-center gap-2">
            <div className="h-1.5 w-8 bg-brand-gold rounded-full"></div>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-600 font-black">
              {t.common.activities}
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-black text-brand-gold tracking-tight">
            {t.impact.actionsTitle}
          </h3>

          <div className="space-y-4">
            {coreActionsList.map((action) => (
              <div 
                key={action.idx} 
                onClick={() => setSelectedActionIndex(action.idx)}
                className={`flex gap-4 items-start p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  selectedActionIndex === action.idx
                    ? 'bg-amber-500/10 border-brand-gold/30 shadow-3xs'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <div className={`p-3 rounded-xl shrink-0 ${selectedActionIndex === action.idx ? 'bg-brand-gold text-white shadow-sm' : 'bg-slate-50 text-brand-navy'}`}>
                  {action.icon}
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900 text-sm">
                    {action.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-semibold">
                    {action.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Planner Simulator */}
        <div className="lg:col-span-12 xl:col-span-7 bg-white rounded-[32px] border border-slate-200/80 p-6 sm:p-8 shadow-md space-y-6 text-left">
          <div className="space-y-2">
            <h3 className="font-display text-lg sm:text-xl font-bold text-brand-navy flex items-center gap-2">
              <Map className="h-5.5 w-5.5 text-brand-gold" />
              <span>{t.impact.interactiveSimulatorTitle}</span>
            </h3>
            <p className="font-sans text-xs text-slate-500 leading-relaxed font-semibold">
              {t.impact.interactiveSimulatorDesc}
            </p>
          </div>

          {/* District selector */}
          <div className="space-y-3 pt-1">
            <label className="font-mono text-3xs uppercase tracking-widest text-slate-400 block font-black">
              {language === 'FR' ? "1. CHOISIR LE SECTEUR DU KASAÏ-CENTRAL" : "1. SELECT THE COOPERATIVE DISTRICT"}
            </label>
            <div className="flex flex-wrap gap-2">
              {districts.map(dist => (
                <button
                  key={dist.id}
                  onClick={() => setSelectedDistrictId(dist.id)}
                  className={`rounded-xl py-2.5 px-3.5 text-xs font-mono font-black transition-all cursor-pointer ${
                    selectedDistrictId === dist.id
                      ? 'bg-brand-navy text-white shadow-sm border border-brand-gold/30'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60'
                  }`}
                >
                  {dist.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick simulator summary box */}
          <div className="rounded-[24px] border border-slate-200 bg-slate-50/50 p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-200/80 pb-4">
              <div>
                <span className="font-mono text-3xs font-black uppercase tracking-widest text-brand-navy bg-brand-gold/15 px-3 py-1 rounded-full">
                  {language === 'FR' ? "TERRITOIRE ACTIF" : "PLANNING SCOPE"}
                </span>
                <p className="font-display font-black text-brand-navy text-lg mt-3 uppercase tracking-tight">
                  {activeDistrict.name}
                </p>
              </div>
              <div>
                <span className="text-3xs font-mono text-slate-400 font-extrabold block uppercase tracking-wider">INDICE DE VULNÉRABILITÉ</span>
                <span className="text-xs font-black text-red-700 font-sans block mt-1">{activeDistrict.vulnerabilityIndex}</span>
              </div>
            </div>

            <div className="space-y-2 text-slate-700 text-xs sm:text-sm">
              <p className="font-sans">
                <strong className="text-slate-900 font-bold">{language === 'FR' ? "Indice de besoin prioritaire : " : "Primary urgent need : "}</strong>
                {activeDistrict.typicalNeed[language]}
              </p>
              <p className="font-sans">
                <strong className="text-slate-900 font-bold">{language === 'FR' ? "Action projetée : " : "Scheduled campaign : "}</strong>
                {activeAction.title}
              </p>
            </div>

            {/* Dynamic Simulated Outcome Scorecard */}
            <div className="bg-white rounded-[20px] p-5 border border-slate-200/80 grid grid-cols-2 gap-6 shadow-3xs">
              <div>
                <span className="text-3xs font-mono text-slate-400 block uppercase font-black tracking-widest">{language === 'FR' ? "Budget Estimé" : "Projected Cost"}</span>
                <span className="text-base sm:text-lg font-black text-slate-900 font-mono block mt-1">${activeAction.simBudget}</span>
              </div>
              <div>
                <span className="text-3xs font-mono text-slate-400 block uppercase font-black tracking-widest">{language === 'FR' ? "Bénéficiaires Directs" : "Beneficiaries Target"}</span>
                <span className="text-base sm:text-lg font-black text-brand-navy font-mono block mt-1">+{computedReach} {language === 'FR' ? "personnes" : "citizens"}</span>
              </div>
              <div>
                <span className="text-3xs font-mono text-slate-400 block uppercase font-black tracking-widest">{language === 'FR' ? "Bénévoles Requis" : "Volunteers Required"}</span>
                <span className="text-base sm:text-lg font-black text-slate-900 font-mono block mt-1">{estimatedVolunteersRequired} {language === 'FR' ? "agents" : "leads"}</span>
              </div>
              <div>
                <span className="text-3xs font-mono text-slate-400 block uppercase font-black tracking-widest">{language === 'FR' ? "Durée de Déploiement" : "Execution Window"}</span>
                <span className="text-base sm:text-lg font-black text-slate-900 font-mono block mt-1">{activeAction.simDays} {language === 'FR' ? "jours" : "days"}</span>
              </div>
            </div>

            <div className="p-4 bg-white/80 rounded-2xl border border-slate-150 flex items-center gap-3 shadow-3xs">
              <Clock className="h-5 w-5 text-brand-gold shrink-0" />
              <p className="text-slate-700 text-3xs font-mono font-bold leading-relaxed uppercase tracking-wider text-left">
                {language === 'FR' 
                  ? `Simulation validée pour les cohortes 2026. Priorité d'engagement : ${activeAction.simAudience.FR}.` 
                  : `Validated for 2026 cycles. Core engagement focus: ${activeAction.simAudience.EN}.`}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
