import React, { useState } from 'react';
import { Language, SponsorPledge } from '../types';
import { translations } from '../data/translations';
import { 
  Coins, 
  Check, 
  Gift, 
  Printer, 
  Mail, 
  Copy, 
  ChevronRight, 
  Globe, 
  Sparkles, 
  Award,
  BookOpen,
  Hammer
} from 'lucide-react';

interface DonorCalculatorProps {
  language: Language;
}

export const DonorCalculator: React.FC<DonorCalculatorProps> = ({ language }) => {
  const t = translations[language];

  const financialTiers = [
    { value: 1000, label: t.donor.tierDetails[1000].label, text: t.donor.tierDetails[1000] },
    { value: 2000, label: t.donor.tierDetails[2000].label, text: t.donor.tierDetails[2000] },
    { value: 3500, label: t.donor.tierDetails[3500].label, text: t.donor.tierDetails[3500] },
    { value: 5000, label: t.donor.tierDetails[5000].label, text: t.donor.tierDetails[5000] }
  ];

  // Forms reactive state
  const [pledge, setPledge] = useState<SponsorPledge>({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    selectedTier: 2000,
    customAmount: 1500,
    materialPledges: {
      clothing: false,
      schoolKits: false,
      sportsKits: false,
      hygieneEquipment: false,
      otherGoods: ''
    },
    projectFocus: 'general',
    message: ''
  });

  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const activeFinancialValue = pledge.selectedTier === 'custom' 
    ? pledge.customAmount 
    : (pledge.selectedTier || 0);

  // Benefits description based on picked tier
  const getActiveSponsorBenefits = () => {
    if (pledge.selectedTier === 'custom') {
      return language === 'FR' 
        ? "Reconnaissance sur mesure assortie aux priorités d'engagement local définies conjointement."
        : "Tailored institutional recognition aligned closely with collaborative goals.";
    }
    if (!pledge.selectedTier) return "";
    const info = t.donor.tierDetails[pledge.selectedTier];
    return `${info.vis}\n• ${info.strat}\n• ${info.impact}`;
  };

  const handleToggleMaterial = (key: keyof typeof pledge.materialPledges) => {
    if (key === 'otherGoods') return;
    setPledge(p => ({
      ...p,
      materialPledges: {
        ...p.materialPledges,
        [key]: !p.materialPledges[key] as any
      }
    }));
  };

  const handleInputChange = (field: keyof SponsorPledge, value: any) => {
    setPledge(p => ({
      ...p,
      [field]: value
    }));
  };

  const handleNestedMaterialChange = (value: string) => {
    setPledge(p => ({
      ...p,
      materialPledges: {
        ...p.materialPledges,
        otherGoods: value
      }
    }));
  };

  const generateMailtoLink = () => {
    const spaceStr = "\n";
    const subject = `[FDFK 2026] Promesse de Partenariat - ${pledge.organizationName || 'Donateur'}`;
    const matList = [];
    if (pledge.materialPledges.clothing) matList.push(t.donor.materials.clothing);
    if (pledge.materialPledges.schoolKits) matList.push(t.donor.materials.schoolKits);
    if (pledge.materialPledges.sportsKits) matList.push(t.donor.materials.sportsKits);
    if (pledge.materialPledges.hygieneEquipment) matList.push(t.donor.materials.hygiene);
    if (pledge.materialPledges.otherGoods) matList.push(pledge.materialPledges.otherGoods);

    const body = `Bonjour Secrétariat FDFK,${spaceStr}${spaceStr}` + 
      `Je m'appelle ${pledge.contactName} de l'organisation "${pledge.organizationName}".${spaceStr}` + 
      `Nous souhaitons adresser par la présente notre soutien officiel aux actions sociales de la FDFK :${spaceStr}${spaceStr}` + 
      `- Contribution Financière : ${pledge.selectedTier === 'custom' ? `$${pledge.customAmount} (Montant Libre)` : `$${pledge.selectedTier}`} ${spaceStr}` + 
      `- Axe d'intervention ciblé : ${pledge.projectFocus.toUpperCase()}${spaceStr}` + 
      `- Dons en nature déclarés : ${matList.length > 0 ? matList.join(', ') : 'Aucun'}${spaceStr}${spaceStr}` + 
      `Message d'accompagnement : "${pledge.message || 'Soutien FDFK 2026'}"${spaceStr}${spaceStr}` + 
      `Nous souhaitons recevoir l'accusé de réception officiel au numéro de téléphone ${pledge.phone} ou par retour d'e-mail.${spaceStr}${spaceStr}` + 
      `Meilleures salutations,${spaceStr}` + 
      `${pledge.contactName}${spaceStr}` + 
      `${pledge.organizationName}`;

    return `mailto:contact@fdfk.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const copyPledgeToClipboard = () => {
    const text = `PROMESSE DE DON POUR LA FDFK 2026\n\n` +
      `Donateur : ${pledge.organizationName || 'Anonyme'}\n` +
      `Représentant : ${pledge.contactName || 'N/A'}\n` +
      `Montant financier : $${activeFinancialValue}\n` +
      `Axe Focus : ${pledge.projectFocus}\n` +
      `E-mail : ${pledge.email}\n` +
      `Téléphone : ${pledge.phone}\n` +
      `Merci pour votre générosité !`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-16 animate-fade-in text-slate-800 font-sans">
      {/* Luxury Fintech style sub-header */}
      <section className="text-center max-w-3xl mx-auto space-y-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy/5 px-4 py-1.5 text-3xs font-black text-brand-navy ring-1 ring-brand-gold/20 uppercase tracking-widest font-sans">
          <Coins className="h-4 w-4 text-brand-gold" />
          <span>FDK CO-CREATION IMPACT</span>
        </span>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy tracking-tight">
          {t.donor.title}
        </h1>
        <p className="text-brand-gold font-mono text-[10px] uppercase font-black tracking-widest leading-loose">
          {t.donor.subtitle}
        </p>
      </section>

      {/* Two cards: Material on Left, Corporate Collaboration on Right */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch pt-2 text-left">
        {/* Material donations glass-like folder */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 p-8 rounded-[32px] space-y-6 flex flex-col justify-between shadow-2xs relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-3xl group-hover:bg-brand-gold/20 transition-colors pointer-events-none"></div>
          <div className="space-y-5 relative z-10">
            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-3">
              <Gift className="h-5.5 w-5.5 text-brand-gold" />
              <span>{language === 'FR' ? "Dons en Nature" : "Material Gifts"}</span>
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
              {t.donor.materialIntro}
            </p>

            <ul className="space-y-3.5 pt-3">
              {[
                { key: 'clothing', label: t.donor.materials.clothing },
                { key: 'schoolKits', label: t.donor.materials.schoolKits },
                { key: 'sportsKits', label: t.donor.materials.sportsKits },
                { key: 'hygieneEquipment', label: t.donor.materials.hygiene },
              ].map(item => (
                <li key={item.key} className="flex gap-3 items-center">
                   <div className="h-5 w-5 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-5 mt-5">
            <p className="text-3xs font-mono text-slate-400 uppercase tracking-widest font-black">
              {language === 'FR' ? "PROTOCOLE DE TRAÇABILITÉ RDC" : "TRACK-AND-TRACE MANUAL"}
            </p>
            <p className="text-slate-500 text-3xs mt-2 leading-relaxed">
              {t.donor.materialFootnote}
            </p>
          </div>
        </div>

        {/* Corporate channels on the Right */}
        <div className="lg:col-span-7 bg-white p-8 rounded-[32px] border border-slate-200/80 shadow-2xs space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-navy/5 rounded-full blur-3xl group-hover:bg-brand-navy/10 transition-colors pointer-events-none"></div>
          <div className="space-y-3">
            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-3">
              <Award className="h-5.5 w-5.5 text-brand-gold" />
              <span>{t.donor.partnerTitle}</span>
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
              {t.donor.partnerIntro}
            </p>
          </div>

          <div className="space-y-4 pt-3 relative z-10 text-left">
            {t.donor.collaborationWays.map((way: string, idx: number) => (
              <div key={idx} className="flex gap-4 items-start bg-slate-50/50 hover:bg-slate-50 p-4.5 rounded-2xl border border-slate-150 transition-all duration-300">
                <span className="font-mono text-xs font-black text-brand-navy bg-white border border-slate-200 h-7 w-7 rounded-lg flex items-center justify-center shrink-0 shadow-3xs">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                  {way}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Calculator Slider and Generator widget */}
      <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start bg-slate-50/50 border border-slate-200 rounded-[32px] p-6 sm:p-10 shadow-3xs relative text-left">
        {/* Form panel */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="space-y-2">
            <h3 className="font-display text-brand-navy text-xl sm:text-2xl font-black tracking-tight">
              {t.donor.calculatorTitle}
            </h3>
            <p className="font-sans text-xs text-slate-500 leading-relaxed">
              {t.donor.calculatorDesc}
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setHasGenerated(true); }}>
            <div>
              <label className="font-mono text-3xs font-black uppercase tracking-widest text-slate-500 block mb-1.5">
                {t.donor.formOrg}
              </label>
              <input 
                type="text" 
                required
                value={pledge.organizationName}
                onChange={(e) => handleInputChange('organizationName', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs focus:border-brand-navy focus:ring-1 focus:ring-brand-navy focus:outline-hidden transition-all text-slate-800 shadow-3xs font-semibold placeholder:text-slate-400"
                placeholder="Ex: Entreprise Sika RDC"
              />
            </div>

            <div>
              <label className="font-mono text-3xs font-black uppercase tracking-widest text-slate-500 block mb-1.5">
                {t.donor.formContact}
              </label>
              <input 
                type="text" 
                required
                value={pledge.contactName}
                onChange={(e) => handleInputChange('contactName', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs focus:border-brand-navy focus:ring-1 focus:ring-brand-navy focus:outline-hidden transition-all text-slate-800 shadow-3xs font-semibold placeholder:text-slate-400"
                placeholder="Ex: Marie-Laure Kalubi"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-3xs font-black uppercase tracking-widest text-slate-500 block mb-1.5">
                  {t.common.email}
                </label>
                <input 
                  type="email" 
                  required
                  value={pledge.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs focus:border-brand-navy focus:ring-1 focus:ring-brand-navy focus:outline-hidden transition-all text-slate-800 shadow-3xs font-semibold placeholder:text-slate-400"
                  placeholder="contact@sika.cd"
                />
              </div>
              <div>
                <label className="font-mono text-3xs font-black uppercase tracking-widest text-slate-500 block mb-1.5">
                  {t.common.phone}
                </label>
                <input 
                  type="text" 
                  required
                  value={pledge.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs focus:border-brand-navy focus:ring-1 focus:ring-brand-navy focus:outline-hidden transition-all text-slate-800 shadow-3xs font-semibold placeholder:text-slate-400"
                  placeholder="+243 824 555 901"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-3xs font-black uppercase tracking-widest text-slate-500 block mb-2">
                {language === 'FR' ? "SÉLECTIONNER LE PACTE FINANCIER" : "FINANCIAL PLEDGE TARGET"}
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {[1000, 2000, 3500, 5000].map(val => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => handleInputChange('selectedTier', val)}
                    className={`rounded-xl py-2.5 text-xs font-mono font-black tracking-wider transition-all cursor-pointer ${
                      pledge.selectedTier === val 
                        ? 'bg-brand-navy text-white shadow-md border border-brand-gold/30' 
                        : 'bg-white hover:bg-slate-100 text-brand-navy border border-slate-200 shadow-3xs'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handleInputChange('selectedTier', 'custom')}
                  className={`rounded-xl py-2.5 text-[10px] sm:text-xs font-sans font-black uppercase tracking-wider transition-all cursor-pointer ${
                    pledge.selectedTier === 'custom' 
                      ? 'bg-brand-navy text-white shadow-md border border-brand-gold/30' 
                      : 'bg-white hover:bg-slate-100 text-brand-navy border border-slate-200 shadow-3xs'
                  }`}
                >
                  Libre
                </button>
              </div>

              {pledge.selectedTier === 'custom' && (
                <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200/80 animate-fade-in text-left">
                  <span className="font-mono text-3xs font-black text-brand-gold block uppercase mb-2">
                    {language === 'FR' ? "Définir le montant libre (USD)" : "Set custom amount (USD)"}
                  </span>
                  <div className="flex gap-4 items-center">
                    <input 
                      type="range" 
                      min="100" 
                      max="20000" 
                      step="100"
                      value={pledge.customAmount}
                      onChange={(e) => handleInputChange('customAmount', parseInt(e.target.value))}
                      className="w-full accent-brand-gold h-1.5 bg-slate-150 rounded-lg cursor-pointer"
                    />
                    <span className="font-mono text-xs font-black text-brand-navy shrink-0 bg-brand-gold/10 border border-brand-gold/20 px-3 py-1 rounded-lg">
                      ${pledge.customAmount}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Checkboxes of material donations */}
            <div className="space-y-3 pt-1 text-left">
              <label className="font-mono text-3xs font-black uppercase tracking-widest text-slate-500 block">
                {language === 'FR' ? "OPTION : JOINDRE DES DONS EN NATURE" : "OPTION : ADD MATERIAL DONATIONS"}
              </label>

              <div className="grid grid-cols-2 gap-2 text-left bg-white p-3.5 rounded-2xl border border-slate-200/80">
                {[
                  { key: 'clothing', label: t.donor.materials.clothing },
                  { key: 'schoolKits', label: t.donor.materials.schoolKits },
                  { key: 'sportsKits', label: t.donor.materials.sportsKits },
                  { key: 'hygieneEquipment', label: t.donor.materials.hygiene },
                ].map((item) => (
                  <label key={item.key} className="flex gap-2.5 items-center text-slate-700 text-xs font-semibold cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={(pledge.materialPledges as any)[item.key]}
                      onChange={() => handleToggleMaterial(item.key as any)}
                      className="h-4 w-4 rounded-md border-slate-300 text-brand-navy focus:ring-brand-navy accent-brand-gold cursor-pointer"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-3xs font-black uppercase tracking-widest text-slate-500 block mb-1.5">
                {t.donor.formFocus}
              </label>
              <select
                value={pledge.projectFocus}
                onChange={(e) => handleInputChange('projectFocus', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs focus:border-brand-navy focus:ring-1 focus:ring-brand-navy focus:outline-hidden font-semibold text-slate-800 shadow-3xs cursor-pointer"
              >
                <option value="general">{language === 'FR' ? "Trésorerie Générale FDK" : "General FDK Account"}</option>
                <option value="education">{language === 'FR' ? "Éducation Populaire & Kits" : "Popular Education & Supply Kits"}</option>
                <option value="women_empowerment">{language === 'FR' ? "Autonomisation de la Femme" : "Women Sovereign Loans"}</option>
                <option value="health">{language === 'FR' ? "Santé & Hygiène Publique" : "Health & Hygiene Projects"}</option>
              </select>
            </div>

            <button
              id="generate-pledge-slip-btn"
              type="submit"
              className="w-full rounded-xl bg-brand-navy hover:bg-slate-900 border border-brand-gold/30 text-white font-black py-4 text-xs tracking-wider uppercase shadow-md hover:shadow-brand-gold/10 active:scale-98 transition-all cursor-pointer"
            >
              {t.donor.generatePledge}
            </button>
          </form>
        </div>

        {/* Dynamic generated printable Document resembling corporate bond or certificate */}
        <div className="lg:col-span-12 xl:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md relative overflow-hidden flex flex-col justify-between self-start min-h-[500px]">
          {hasGenerated ? (
            <div className="space-y-6 animate-fade-in text-left">
              {/* Slip Layout */}
              <div className="rounded-[24px] border-2 border-dashed border-brand-gold/30 bg-brand-navy/[0.015] p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="flex flex-wrap justify-between items-start border-b border-slate-200/80 pb-5 gap-4">
                  <div>
                    <span className="font-mono text-[9px] font-black uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
                      {t.donor.pledgeLetterTitle}
                    </span>
                    <h4 className="font-display font-black text-brand-navy text-base mt-4 tracking-tight">
                      FONDATION DR FRANÇOIS KATEKESHA
                    </h4>
                    <p className="text-4xs text-slate-400 font-mono mt-1 tracking-widest uppercase">EDITION EXECUTIVE 2026 • PORTEE RDC</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-4xs font-mono text-slate-400 uppercase tracking-widest">Numéro d'Attribution</span>
                    <span className="text-xs font-black font-mono text-slate-800 block mt-1">PLEDGE_2026_{Math.floor(Math.random() * 90000 + 10000)}</span>
                  </div>
                </div>

                <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
                  <p className="text-slate-600 font-normal">
                    {language === 'FR' ? "Je soussigné(e)," : "I the undersigned,"} <strong className="text-slate-900 font-bold">{pledge.contactName || '[Votre Nom]'}</strong>, {language === 'FR' ? "agissant au nom de la structure" : "acting on behalf of"} <strong className="text-slate-900 font-bold">{pledge.organizationName || '[Votre Structure]'}</strong>, {language === 'FR' ? "déclare par la préséance mon intention ferme d'appuyer les actions de solidarité de l'ONG FDK." : "hereby declare my firm intent to sponsor FDK community programs."}
                  </p>

                  <div className="bg-white p-4.5 rounded-2xl border border-slate-150 grid grid-cols-2 gap-4 text-slate-600 shadow-3xs">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase block font-mono font-bold tracking-wider">{language === 'FR' ? "Allocation Clé" : "Monetary Allocation"}</span>
                      <span className="text-lg sm:text-xl font-black text-brand-navy font-mono mt-1 block">${activeFinancialValue}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase block font-mono font-bold tracking-wider">{language === 'FR' ? "Axe d'Intervention" : "Target Sector Focus"}</span>
                      <span className="text-3xs font-mono font-black text-slate-800 block uppercase mt-2.5 bg-slate-100 px-2 py-0.5 rounded-md inline-block">{pledge.projectFocus}</span>
                    </div>
                    <div className="col-span-2 border-t border-slate-100 pt-3 mt-1.5">
                      <span className="text-[9px] text-slate-400 uppercase block font-mono font-bold tracking-wider">{language === 'FR' ? "Dotations Ressources En Nature" : "Additional Bundled Goods"}</span>
                      <p className="text-xs font-bold text-slate-800 mt-1 leading-normal">
                        {(() => {
                           const matList = [];
                           if (pledge.materialPledges.clothing) matList.push(t.donor.materials.clothing);
                           if (pledge.materialPledges.schoolKits) matList.push(t.donor.materials.schoolKits);
                           if (pledge.materialPledges.sportsKits) matList.push(t.donor.materials.sportsKits);
                           if (pledge.materialPledges.hygieneEquipment) matList.push(t.donor.materials.hygiene);
                           return matList.length > 0 ? matList.join(' + ') : 'Aucun don matériel associé';
                        })()}
                      </p>
                    </div>
                  </div>

                  {/* Dynamic benefits terms */}
                  <div className="space-y-1.5 text-left">
                    <span className="text-3xs text-brand-gold uppercase block font-mono font-black tracking-widest leading-loose">
                      {language === 'FR' ? "ENGAGEMENTS MUTUELS DISPENSÉS" : "ACCOMPANYING BRAND RIGHTS"}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-white p-4 rounded-xl border border-slate-150 shadow-3xs">
                      {getActiveSponsorBenefits()}
                    </p>
                  </div>
                </div>

                {/* Simulated Signature */}
                <div className="border-t border-slate-200/60 pt-5 flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span className="uppercase font-bold tracking-wider">DATE: 22 MAI 2026</span>
                  <div className="text-right">
                    <span className="uppercase font-bold tracking-wider">SIGNATURE INTEGRÉE</span>
                    <span className="block italic text-xs text-brand-navy tracking-wide mt-1.5 font-serif font-bold">
                      {pledge.contactName || 'Donateur'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-4 pt-2 text-left">
                <div className="p-4 bg-brand-gold/10 border border-brand-gold/20 rounded-2xl flex gap-3.5 items-center">
                  <Sparkles className="h-5 w-5 text-brand-gold shrink-0 animate-pulse" />
                  <p className="text-slate-700 text-xs font-semibold leading-relaxed">
                    {t.donor.pledgeLetterSent}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={generateMailtoLink()}
                    className="flex justify-center items-center gap-2 rounded-xl bg-brand-navy text-brand-gold hover:bg-slate-950 border border-brand-gold/30 py-3.5 text-xs font-black uppercase tracking-wider transition-all text-center shadow-md cursor-pointer"
                  >
                    <Mail className="h-4.5 w-4.5" />
                    <span>{t.common.contactUs}</span>
                  </a>

                  <button
                    onClick={copyPledgeToClipboard}
                    className="flex justify-center items-center gap-2 rounded-xl border border-slate-200 hover:bg-slate-50 py-3.5 text-xs font-black uppercase tracking-wider text-slate-700 transition-all text-center bg-white cursor-pointer shadow-3xs"
                  >
                    <Copy className="h-4.5 w-4.5 text-slate-500" />
                    <span>{copiedLink ? t.common.success : (language === 'FR' ? "Copier le texte" : "Copy text")}</span>
                  </button>
                </div>

                <button
                  onClick={() => window.print()}
                  className="w-full flex justify-center items-center gap-2 rounded-xl border border-dashed border-slate-300 hover:bg-slate-50 text-slate-700 text-3xs font-mono font-bold py-2.5 bg-transparent uppercase tracking-widest cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>{language === 'FR' ? "Imprimer le document officiel" : "Print pledge slip PDF"}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center items-center text-center p-8 space-y-4 my-auto">
              <div className="p-5 rounded-full bg-slate-50 text-slate-400 border border-slate-100">
                <Coins className="h-10 w-10 text-brand-gold/40" />
              </div>
              <p className="text-slate-500 text-xs sm:text-sm max-w-sm leading-relaxed font-semibold">
                {language === 'FR' 
                  ? "Remplissez le formulaire de calcul de promesse sur la gauche et cliquez sur Générer pour prévisualiser votre document d'engagement social."
                  : "Fill out the pledge calculation form on the left, then click Generate to preview your customized social responsibility contract."}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
