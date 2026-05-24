import { useState } from 'react';
import { Language, ActiveTab } from './types';
import { translations } from './data/translations';
import { HomeOverview } from './components/HomeOverview';
import { LegacyPanel } from './components/LegacyPanel';
import { ImpactDirectory } from './components/ImpactDirectory';
import { DonorCalculator } from './components/DonorCalculator';
import { VolunteerPortal } from './components/VolunteerPortal';
import { 
  Heart, 
  Globe, 
  MapPin, 
  Mail, 
  Phone, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Award,
  Sparkles,
  Menu,
  X 
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('FR');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const t = translations[language];

  // Tab definitions
  const navTabs = [
    { id: 'home', label: t.common.about },
    { id: 'legacy', label: t.common.legacy },
    { id: 'impact', label: t.common.impact },
    { id: 'donor', label: t.common.donor },
    { id: 'volunteer', label: t.common.volunteer }
  ] as const;

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'FR' ? 'EN' : 'FR');
  };

  const handleNavigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="fdfk-portal-root" className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-brand-navy selection:text-white relative overflow-hidden">
      
      {/* Decorative Floating Glowing Orbs in the background */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] rounded-full ambient-orb-emerald -z-10 pointer-events-none"></div>
      <div className="absolute top-2/3 right-1/12 w-[450px] h-[450px] rounded-full ambient-orb-gold -z-10 pointer-events-none"></div>



      {/* Main Glassmorphic Header - Pure White Premium Background */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          {/* Logo Brand Frame with custom blue dove and gold star mockup replicating Slide 1 logo perfectly */}
          <div onClick={() => handleNavigate('home')} className="flex items-center gap-3.5 cursor-pointer group select-none">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-navy via-slate-800 to-brand-gold flex items-center justify-center relative shadow-lg group-hover:scale-[1.05] group-hover:rotate-1 transition-all duration-300 ring-1 ring-brand-gold/25">
              {/* Custom vector silhouette of blue dove using styled icon */}
              <svg className="h-5.5 w-5.5 text-amber-100 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.75 12.83l-2.04.68c-.46.15-.96-.1-1.11-.56-.15-.46.1-.96.56-1.11l2.04-.68c.46-.15.96.1 1.11.56.15.46-.1.96-.56 1.11zm1.48-2.61l-1.46.49c-.46.15-.96-.1-1.11-.56-.15-.46.1-.96.56-1.11l1.46-.49c.46-.15.96.1 1.11.56.15.46-.1.97-.56 1.11zM12 4c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1s-1-.45-1-1V5c0-.55.45-1 1-1zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
              </svg>
              {/* Gold star accent in logo corner */}
              <span className="absolute -top-1.5 -right-1.5 h-4.5 w-4.5 rounded-full bg-gradient-to-r from-brand-gold to-[#D97706] flex items-center justify-center text-[10px] text-white font-bold border border-white shadow-md">★</span>
            </div>
            <div>
              <span className="font-display font-black tracking-tight text-brand-gold text-xl sm:text-2xl block leading-none">
                FDK <span className="text-brand-navy font-serif">NGO</span>
              </span>
              <span className="font-sans font-extrabold text-[8px] tracking-widest text-slate-500 uppercase mt-1 block">
                {language === 'FR' ? "Fondation Dr François" : "Dr François Foundation"}
              </span>
            </div>
          </div>

          {/* Nav Links - Desktop with premium hover indicators - Pure White with orange and green */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50/90 p-1 rounded-2xl border border-slate-200/50 shadow-inner">
            {navTabs.map(tab => (
              <button
                key={tab.id}
                id={`nav-${tab.id}`}
                onClick={() => handleNavigate(tab.id)}
                className={`rounded-xl px-3 py-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-brand-gold/15 text-brand-gold shadow-xs border border-brand-gold/25 scale-[1.02]'
                    : 'text-slate-600 hover:text-brand-gold hover:bg-slate-100/65'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-brand-gold rounded-full animate-pulse"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-3">
            {/* Language Toggle Widget */}
            <button
              id="lang-toggle-btn"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-black text-slate-700 hover:text-brand-gold transition-all font-mono tracking-wider cursor-pointer bg-slate-50/50 shadow-3xs"
            >
              <Globe className="h-3.5 w-3.5 text-brand-gold" />
              <span>{language}</span>
            </button>

            {/* Donation Quick Link */}
            <button
              onClick={() => handleNavigate('donor')}
              className="hidden sm:inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-navy-light text-white rounded-xl px-4.5 py-2 text-xs font-black tracking-wider uppercase shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all cursor-pointer border border-brand-gold/20"
            >
              <Heart className="h-3.5 w-3.5 fill-current text-brand-gold animate-pulse" />
              <span>{language === 'FR' ? "Propulser FDK" : "Empower Now"}</span>
            </button>

            {/* Mobile navigation toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="inline-flex lg:hidden p-2.5 rounded-xl text-slate-800 hover:bg-slate-50 transition-all border border-slate-200"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 py-3.5 px-4 space-y-2 animate-fadeIn shadow-lg text-left">
          {navTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleNavigate(tab.id)}
              className={`w-full text-left rounded-xl px-4 py-2 text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand-gold/15 text-brand-gold border border-brand-gold/20 shadow-3xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={() => handleNavigate('donor')}
            className="w-full text-center flex items-center justify-center gap-2 rounded-xl bg-brand-navy py-3 text-xs font-black uppercase tracking-widest text-white shadow-xs border border-brand-gold/20"
          >
            <Heart className="h-4 w-4 fill-current text-brand-gold" />
            <span>{language === 'FR' ? "Faire un Don" : "Give Now"}</span>
          </button>
        </div>
      )}

      {/* Main Content Space */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {activeTab === 'home' && <HomeOverview language={language} onNavigate={handleNavigate} />}
        {activeTab === 'legacy' && <LegacyPanel language={language} />}
        {activeTab === 'impact' && <ImpactDirectory language={language} />}
        {activeTab === 'donor' && <DonorCalculator language={language} />}
        {activeTab === 'volunteer' && <VolunteerPortal language={language} />}
      </main>

      {/* Sticky Quick-Access Contact Form Drawer for users to click in Kasaï */}
      <section className="bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 gap-10 md:grid-cols-12 text-slate-600">
          
          {/* Logo brand card */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-sans font-black tracking-tight text-brand-navy text-2xl">
                FDK <span className="text-brand-gold font-serif text-xl font-normal">NGO</span>
              </span>
              <span className="text-brand-gold text-[10px] font-sans font-bold tracking-wider uppercase bg-amber-50 border border-brand-gold/20 px-2.5 py-0.5 rounded-full">
                PREMIUM ALLIANCE
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs font-sans">
              {language === 'FR' 
                ? "Fondation pour le renouvellement social, la formation scientifique et la justice d'inclusion en République Démocratique du Congo." 
                : "Foundation for civil upskilling, geological heritage, and rural inclusion throughout Kasaï-Central, DRC."}
            </p>
            <p className="text-slate-500 text-sm italic font-serif">
              "{t.common.slogan}"
            </p>
          </div>

          {/* Contact Details from Slide 6 */}
          <div className="md:col-span-5 space-y-5">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-brand-gold">
              {t.common.contactUs}
            </h4>
            
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center shrink-0 border border-slate-200 mt-1">
                  <MapPin className="h-4 w-4 text-brand-gold" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-sans block uppercase font-semibold tracking-wider">{t.common.address}</span>
                  <p className="text-sm font-medium text-slate-700 leading-snug">{t.common.addressValue}</p>
                </div>
              </li>

              <li className="flex gap-3 items-center">
                <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center shrink-0 border border-slate-200">
                  <Mail className="h-4 w-4 text-brand-gold" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-sans block uppercase font-semibold tracking-wider">{t.common.email}</span>
                  <a href="mailto:contact@fdkngo.org" className="text-sm font-bold text-brand-navy hover:text-brand-gold hover:underline">contact@fdkngo.org</a>
                </div>
              </li>

              <li className="flex gap-3 items-center">
                <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center shrink-0 border border-slate-200">
                  <Phone className="h-4 w-4 text-brand-gold" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-sans block uppercase font-semibold tracking-wider">{t.common.phone}</span>
                  <p className="text-sm font-bold text-slate-700">+243 824 555 901</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social connections links */}
          <div className="md:col-span-3 space-y-5">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-brand-gold">
              {language === 'FR' ? "RÉSEAUX SOCIAUX" : "SOCIAL NETWORKS"}
            </h4>
            
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="h-9 w-9 rounded-xl bg-white hover:bg-slate-50 text-slate-400 hover:text-brand-gold hover:border-brand-gold/40 flex items-center justify-center transition-all border border-slate-200/60 shadow-xs">
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="h-9 w-9 rounded-xl bg-white hover:bg-slate-50 text-slate-400 hover:text-brand-gold hover:border-brand-gold/40 flex items-center justify-center transition-all border border-slate-200/60 shadow-xs">
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="h-9 w-9 rounded-xl bg-white hover:bg-slate-50 text-slate-400 hover:text-brand-gold hover:border-brand-gold/40 flex items-center justify-center transition-all border border-slate-200/60 shadow-xs">
                <Linkedin className="h-4.5 w-4.5" />
              </a>
            </div>

            <p className="text-xs text-slate-400 font-sans leading-relaxed pt-2">
              {language === 'FR' 
                ? "Dossier d'agrément officiel enregistré auprès du secrétariat général de Kananga RDC. © 2026 FDK NGO." 
                : "Registered with municipal authorities of Kasaï-Central, Kananga DRC. © 2026 FDK NGO."}
            </p>
          </div>
        </div>
      </section>

      {/* Sub-footer banner */}
      <footer className="bg-brand-navy text-slate-400 text-center py-6 text-xs font-sans tracking-wide border-t border-slate-900 select-none font-light">
        <span>Fondation Dr François Kabamba • "{t.common.thanks}" • Designed with Premium Deep Navy & Soft Gold Accents</span>
      </footer>

    </div>
  );
}
