import React, { useState } from 'react';
import { Language, VolunteerForm } from '../types';
import { translations } from '../data/translations';
import { 
  Users, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft, 
  FileCheck, 
  Calendar, 
  ShieldCheck, 
  Award,
  BookOpen,
  FolderSync,
  Sparkles
} from 'lucide-react';

interface VolunteerPortalProps {
  language: Language;
}

export const VolunteerPortal: React.FC<VolunteerPortalProps> = ({ language }) => {
  const t = translations[language];

  // Steps tracking
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [formData, setFormData] = useState<VolunteerForm>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    skills: [],
    availability: 'weekends',
    primaryInterest: 'education',
    motivation: '',
    signedCharter: false,
    signatureDate: '2026-05-22'
  });

  const [hasRegistered, setHasRegistered] = useState<boolean>(false);
  const [volunteerIDCode, setVolunteerIDCode] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  const skillOptions = [
    { value: 'education', label_fr: "Soutien scolaire & Mentorat", label_en: "Academic Help & Mentoring" },
    { value: 'health', label_fr: "Sensibilisation hygiène & Santé", label_en: "Hygiene & Health Advocacy" },
    { value: 'sports', label_fr: "Entraînement sportif civique", label_en: "Civic Athletics Coaching" },
    { value: 'admin', label_fr: "Soutien administratif & Photo", label_en: "Office Support & Media" },
    { value: 'empow', label_fr: "Accompagnement de femmes", label_en: "Women's Craft Mentorship" }
  ];

  const handleInputChange = (field: keyof VolunteerForm, value: any) => {
    setFormData(m => ({
      ...m,
      [field]: value
    }));
    if (validationError) setValidationError('');
  };

  const handleToggleSkill = (skill: string) => {
    const list = [...formData.skills];
    if (list.includes(skill)) {
      handleInputChange('skills', list.filter(s => s !== skill));
    } else {
      handleInputChange('skills', [...list, skill]);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.signedCharter) {
      setValidationError(language === 'FR' 
        ? "Veuillez cocher la signature de la Charte du Bénévole ci-dessous pour continuer." 
        : "Please check the signature of the Volunteer Charter below to submit."
      );
      return;
    }
    const randCode = Math.floor(Math.random() * 89999 + 10000).toString();
    setVolunteerIDCode(randCode);
    setHasRegistered(true);
    setActiveStepIdx(4); // Advance to signed stage
  };

  return (
    <div className="space-y-16 animate-fade-in text-slate-800 font-sans">
      {/* Narrative Header */}
      <section className="text-center max-w-3xl mx-auto space-y-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy/5 px-4 py-1.5 text-3xs font-black text-brand-navy ring-1 ring-brand-gold/20 uppercase tracking-widest font-sans animate-fade-in">
          <Users className="h-4 w-4 text-brand-gold" />
          <span>FDK RECRUTEMENT SOLIDAIRE</span>
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight">
          {t.volunteer.title}
        </h1>
        <p className="text-brand-gold font-mono text-[10px] uppercase font-black tracking-widest leading-loose">
          {t.volunteer.subtitle}
        </p>
      </section>

      {/* Slide 11 Steps Tracker */}
      <section className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-[32px] space-y-6 text-left">
        <h3 className="font-display text-base sm:text-lg md:text-xl font-black text-slate-900 tracking-tight">
          {t.volunteer.howToTitle}
        </h3>

        {/* Dynamic Horizontal Chevron Stepper */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 border-b border-slate-200/50 pb-6">
          {t.volunteer.steps.map((step: string, idx: number) => {
            const isActive = idx === activeStepIdx;
            const isCompleted = idx < activeStepIdx || hasRegistered;
            return (
              <div 
                key={idx} 
                className={`p-4 rounded-2xl border transition-all duration-300 text-left space-y-3 ${
                  isActive 
                    ? 'border-brand-gold bg-brand-gold/5 shadow-3xs ring-1 ring-brand-gold/30'
                    : isCompleted 
                      ? 'border-slate-200 bg-slate-50' 
                      : 'border-slate-200/60 bg-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`font-mono text-3xs font-black leading-none h-6 w-6 rounded-md flex items-center justify-center ${
                    isActive 
                      ? 'bg-brand-navy text-white' 
                      : isCompleted 
                        ? 'bg-amber-500/10 text-brand-gold' 
                        : 'bg-slate-100 text-[#64748B]'
                  }`}>
                    {idx + 1}
                  </span>
                  {isCompleted && (
                    <CheckCircle className="h-4 w-4 text-brand-gold shrink-0" />
                  )}
                </div>
                <p className={`text-4xs font-sans font-extrabold leading-normal uppercase tracking-widest ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                  {step}
                </p>
              </div>
            );
          })}
        </div>

        {/* Short motivational callout to slide index */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <p className="text-slate-500 text-xs font-semibold leading-relaxed text-left">
            {language === 'FR' 
              ? "Naviguez à travers l'onboarding pour débloquer votre dossier d'agent de terrain FDK."
              : "Complete the steps below to print your regional FDK community volunteer card."}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveStepIdx(prev => Math.max(0, prev - 1))}
              disabled={activeStepIdx === 0}
              className="px-4 py-2 text-2xs font-mono font-black uppercase tracking-wider border border-slate-200 bg-white rounded-xl disabled:opacity-40 hover:bg-slate-50 flex items-center gap-1 transition-all cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>{t.common.back}</span>
            </button>
            <button
              onClick={() => setActiveStepIdx(prev => Math.min(4, prev + 1))}
              disabled={activeStepIdx === 4 || (!hasRegistered && activeStepIdx >= 1)}
              className="px-4 py-2 text-2xs font-mono font-black uppercase tracking-wider bg-brand-navy text-brand-gold border border-brand-gold/30 rounded-xl disabled:opacity-40 hover:bg-slate-950 flex items-center gap-1 transition-all cursor-pointer"
            >
              <span>{t.common.next}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Onboarding Wizard Portal */}
      <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start text-left">
        {/* Dynamic form / charter layout on the Left */}
        <div className="lg:col-span-12 xl:col-span-7 bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/85 space-y-6 shadow-md">
          {!hasRegistered ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-display text-lg sm:text-xl font-bold text-brand-navy flex items-center gap-2">
                  <FileCheck className="h-5.5 w-5.5 text-brand-gold" />
                  <span>{t.volunteer.formTitle}</span>
                </h3>
                <p className="font-sans text-xs text-slate-500 leading-relaxed font-semibold">
                  {t.volunteer.formDesc}
                </p>
              </div>
              {validationError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold leading-relaxed animate-fade-in text-left">
                  {validationError}
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-6">
                {/* Core details */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="font-mono text-3xs font-black uppercase tracking-widest text-brand-navy block mb-1.5">
                      {language === 'FR' ? "Nom Complet" : "Full Name"}
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs focus:border-brand-navy focus:ring-1 focus:ring-brand-navy focus:outline-hidden text-slate-800 font-semibold"
                      placeholder="Ex: David Mukenge"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-3xs font-black uppercase tracking-widest text-brand-navy block mb-1.5">
                      {language === 'FR' ? "Province / Territoire de Résidence" : "Territory of Residence"}
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs focus:border-brand-navy focus:ring-1 focus:ring-brand-navy focus:outline-hidden text-slate-800 font-semibold"
                      placeholder="Ex: Kananga, Kasaï-Central"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-3xs font-black uppercase tracking-widest text-brand-navy block mb-1.5">
                      {t.common.email}
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs focus:border-brand-navy focus:ring-1 focus:ring-brand-navy focus:outline-hidden text-slate-800 font-semibold"
                      placeholder="david.mukenge@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-3xs font-black uppercase tracking-widest text-brand-navy block mb-1.5">
                      {t.common.phone}
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs focus:border-brand-navy focus:ring-1 focus:ring-brand-navy focus:outline-hidden text-slate-800 font-semibold"
                      placeholder="+243 XXX XXX XXX"
                    />
                  </div>
                </div>

                {/* Skills tags selection */}
                <div className="space-y-2 pt-1">
                  <label className="font-mono text-3xs font-black uppercase tracking-widest text-brand-navy block">
                    {language === 'FR' ? "COCHER VOS TALENTS / COMPÉTENCES" : "FLAG YOUR SKILLS / TALENTS"}
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1 text-left">
                    {skillOptions.map(opt => {
                       const selected = formData.skills.includes(opt.value);
                       return (
                         <button
                           type="button"
                           key={opt.value}
                           onClick={() => handleToggleSkill(opt.value)}
                           className={`rounded-xl px-3 py-2 text-3xs font-mono font-black tracking-widest uppercase border transition-all cursor-pointer ${
                             selected 
                               ? 'bg-brand-navy text-white border-brand-gold/30 shadow-xs' 
                               : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                           }`}
                         >
                           {language === 'FR' ? opt.label_fr : opt.label_en}
                         </button>
                       );
                    })}
                  </div>
                </div>

                {/* Availability and Commitment */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-left">
                  <div>
                    <label className="font-mono text-3xs font-black uppercase tracking-widest text-brand-navy block mb-1.5">
                      {language === 'FR' ? "Disponibilité de Temps" : "Schedule Availabilities"}
                    </label>
                    <select
                      value={formData.availability}
                      onChange={(e) => handleInputChange('availability', e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs focus:border-brand-navy focus:outline-hidden font-semibold text-slate-800 cursor-pointer shadow-3xs"
                    >
                      <option value="weekends">{language === 'FR' ? "Fins de semaine (Samedi-Dimanche)" : "Weekends Only"}</option>
                      <option value="weekdays">{language === 'FR' ? "Jours de semaine (Lundi-Vendredi)" : "Weekdays Only"}</option>
                      <option value="flexible">{language === 'FR' ? "Flexible / En ligne d'urgence" : "Flexible Availability"}</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-3xs font-black uppercase tracking-widest text-brand-navy block mb-1.5">
                      {t.volunteer.volunteerInterest}
                    </label>
                    <select
                      value={formData.primaryInterest}
                      onChange={(e) => handleInputChange('primaryInterest', e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs focus:border-brand-navy focus:outline-hidden font-semibold text-slate-800 cursor-pointer shadow-3xs"
                    >
                      <option value="education">{language === 'FR' ? "Éducation des Jeunes & Mentorat" : "Youth Education & Training"}</option>
                      <option value="gender_equality">{language === 'FR' ? "Autonomisation Féminine" : "Women Cooperative support"}</option>
                      <option value="sports_culture">{language === 'FR' ? "Activités Sportives & Unité" : "Athletics & Cultural unity"}</option>
                      <option value="workshop_admin">{language === 'FR' ? "Ateliers & Forums Civiques" : "Civic Forums & Admin"}</option>
                    </select>
                  </div>
                </div>

                {/* Motivation phrase */}
                <div className="text-left">
                  <label className="font-mono text-3xs font-black uppercase tracking-widest text-brand-navy block mb-1.5">
                    {language === 'FR' ? "Message de motivation (Vos motivations)" : "Motivation bio"}
                  </label>
                  <textarea 
                    rows={2}
                    value={formData.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs focus:border-brand-navy focus:ring-1 focus:ring-brand-navy text-slate-800 font-semibold placeholder:text-slate-400 focus:outline-hidden resize-none"
                    placeholder={language === 'FR' ? "Ex: Je souhaite former les jeunes filles en informatique..." : "Ex: I wish to lecture high school girls in basic science..."}
                  />
                </div>

                {/* Embedded Ethical Charter to sign */}
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 space-y-4 text-left">
                  <span className="font-display font-bold text-slate-800 text-sm flex items-center gap-2">
                    <ShieldCheck className="h-4.5 w-4.5 text-brand-gold" />
                    <span>{t.volunteer.charterTitle}</span>
                  </span>
                  
                  <p className="text-3xs text-slate-600 leading-relaxed font-serif italic max-h-24 overflow-y-auto border-b border-slate-200/85 pb-3">
                    {t.volunteer.charterText}
                  </p>

                  <label className="flex gap-2.5 items-center cursor-pointer text-slate-800 text-3xs font-mono font-black uppercase select-none">
                    <input 
                      type="checkbox"
                      checked={formData.signedCharter}
                      onChange={(e) => handleInputChange('signedCharter', e.target.checked)}
                      className="h-4 w-4 rounded-md border-slate-300 text-brand-navy focus:ring-brand-navy accent-brand-gold"
                    />
                    <span>{t.volunteer.signCharter}</span>
                  </label>
                </div>

                {/* Submit Application Button */}
                <button
                  id="submit-volunteer-btn"
                  type="submit"
                  className="w-full rounded-xl bg-brand-navy hover:bg-slate-900 border border-brand-gold/30 text-white font-black py-4 text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer"
                >
                  {language === 'FR' ? "Soumettre ma Candidature" : "Submit Volunteer Profile"}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6 text-center py-8 animate-fade-in my-auto">
              <div className="p-4 bg-brand-gold/10 rounded-full text-brand-gold inline-block shadow-3xs ring-1 ring-brand-gold/20 border border-brand-gold/25">
                <CheckCircle className="h-10 w-10 text-brand-gold" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-xl sm:text-2xl font-black text-brand-navy">
                  {language === 'FR' ? "Onboarding Accompli !" : "Onboarding Successful!"}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm font-semibold max-w-sm mx-auto leading-relaxed">
                  {t.volunteer.successMsg} <strong>{volunteerIDCode}</strong>. {language === 'FR' ? "Votre dossier électronique a été transmis avec succès aux services d'orientation de Kananga." : "Your record is logged and aligned with community campaign organizers of Kasaï-Central."}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-5 mt-5">
                <button
                  onClick={() => {
                    setHasRegistered(false);
                    setFormData(p => ({ ...p, signedCharter: false }));
                  }}
                  className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-5 py-2.5 text-xs font-mono font-black uppercase tracking-wider text-slate-650 transition-all active:scale-98 cursor-pointer shadow-3xs"
                >
                  {language === 'FR' ? "Soumettre un autre dossier" : "Submit another record"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Volunteer ID Card Generator on the Right */}
        <div className="lg:col-span-12 xl:col-span-5 bg-white rounded-[32px] p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-5 text-left">
          <div className="space-y-1">
            <h4 className="font-mono text-3xs font-black uppercase tracking-widest text-brand-gold">
              {language === 'FR' ? "GÉNÉRATEUR DE CARTE DE MEMBRE" : "FDK LEADER ID CARD"}
            </h4>
            <p className="text-4xs text-slate-400 font-semibold uppercase tracking-wider block">
              {language === 'FR' ? "Aperçu de votre carte de terrain officielle FDK." : "Visual mock-up of your active field agent identifier."}
            </p>
          </div>

          <div className="relative rounded-[24px] bg-brand-navy bg-gradient-to-br from-brand-navy via-slate-950 to-slate-900 border border-white/[0.04] text-white p-6 space-y-6 shadow-md overflow-hidden ring-1 ring-brand-gold/20">
            {/* Shiny gold corner accents */}
            <div className="absolute top-0 right-0 h-16 w-16 bg-brand-gold/10 rounded-bl-3xl"></div>
            <div className="absolute bottom-0 left-0 h-12 w-12 bg-brand-gold/5 rounded-tr-3xl"></div>

            {/* FDK header stamp */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <span className="font-display font-black text-white text-sm tracking-widest">FDK</span>
                <span className="block text-4xs font-mono text-brand-gold uppercase font-bold tracking-widest mt-1">KASAÏ-CENTRAL</span>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 bg-slate-900/50 rounded-lg ring-1 ring-brand-gold/20 text-4xs font-mono text-brand-gold uppercase font-black tracking-wider">
                  VOLUNTEER
                </span>
              </div>
            </div>

            {/* Profile body with grid */}
            <div className="flex gap-4 items-center">
              {/* Profile Avatar Frame */}
              <div className="h-16 w-16 rounded-xl bg-white/5 border border-white/15 flex flex-col justify-center items-center text-center text-brand-gold shrink-0 font-display font-black tracking-tighter uppercase relative select-none">
                {formData.fullName ? (
                  <span className="text-lg text-brand-gold">
                    {formData.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                ) : (
                  <Users className="h-6 w-6 text-brand-gold/40 animate-pulse" />
                )}
                {/* Micro holographic overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-gold/15 to-transparent"></div>
              </div>

              {/* Data fields */}
              <div className="space-y-1.5 min-w-0 font-sans text-left">
                <div>
                  <span className="text-5xs text-slate-400 font-mono block uppercase tracking-wider">{language === 'FR' ? "Nom Complet / Agent" : "Full Name"}</span>
                  <p className="text-xs font-bold text-white leading-none truncate pr-2 mt-0.5 font-display">
                    {formData.fullName || 'David Mukenge'}
                  </p>
                </div>
                <div>
                  <span className="text-5xs text-slate-400 font-mono block uppercase tracking-wider">{language === 'FR' ? "Territoire d'Action" : "Sovereign Province"}</span>
                  <p className="text-xxs font-semibold text-slate-300 leading-none truncate mt-0.5">
                    {formData.location || 'Kananga, RDC'}
                  </p>
                </div>
              </div>
            </div>

            {/* Badge Footer */}
            <div className="flex justify-between items-end border-t border-white/10 pt-4 text-4xs font-mono text-slate-400 leading-none">
              <div>
                <span className="block text-[6px] text-slate-400 font-mono uppercase tracking-wider">ID CODELINK</span>
                <p className="text-3xs font-black text-white font-mono mt-1">
                  FDK-2026-{volunteerIDCode || '81604'}
                </p>
              </div>

              <div className="text-right font-sans">
                <span className="block text-[6px] text-slate-400 font-mono uppercase font-semibold tracking-wider">{language === 'FR' ? "Statut" : "Status"}</span>
                <span className={`inline-block font-sans font-black text-[9px] mt-1 ${hasRegistered ? 'text-brand-gold animate-pulse' : 'text-slate-300'}`}>
                  {hasRegistered ? 'ACTIVE / CERTIFIED' : 'PENDING SIGNATURE'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-[24px] text-left font-sans">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 font-black uppercase tracking-wider">
              <FolderSync className="h-4.5 w-4.5 text-brand-gold" />
              <span>{language === 'FR' ? "Indice d'orientation : " : "Target Scope : "}</span>
            </div>
            <p className="text-slate-500 font-sans text-xxs mt-2.5 leading-relaxed font-semibold">
              <strong className="text-slate-800">{language === 'FR' ? "Focus : " : "Specialty focus : "}</strong>
              {formData.primaryInterest.toUpperCase()} — {language === 'FR' ? "L'agent effectuera ses séances d'éducation populaire sous l'égide de la trésorerie." : "Candidate is allocated supporting community training programs."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
