import { useState, useEffect } from 'react';
import { Language, ActiveTab } from './types';
import { translations } from './data/translations';
import { HomeOverview } from './components/HomeOverview';
import { LegacyPanel } from './components/LegacyPanel';
import { ImpactDirectory } from './components/ImpactDirectory';
import { VolunteerPortal } from './components/VolunteerPortal';
import { BoardOfDirectors } from './components/BoardOfDirectors';
import { GalleryView } from './components/GalleryView';
import { 
  Heart, 
  Globe, 
  MapPin, 
  Mail, 
  Phone, 
  Facebook, 
  Instagram, 
  Award,
  Sparkles,
  Menu,
  X 
} from 'lucide-react';

function TypewriterSlogan() {
  const text = "Ensemble nous pouvons";
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, 40); // very fast typing speed
      return () => clearTimeout(timeout);
    } else {
      // Pause then restart typing
      const timeout = setTimeout(() => {
        setDisplayText('');
        setIndex(0);
      }, 4000); // Hold for 4 seconds
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <span className="font-sans text-white font-black tracking-widest border-r-2 border-white/80 animate-pulse pr-1 whitespace-nowrap text-[10px] sm:text-xs uppercase">
      {displayText}
    </span>
  );
}

function TiktokIcon(props: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>('FR');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const t = translations[language];

  // Tab definitions
  const navTabs: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: t.common.about },
    { id: 'legacy', label: t.common.legacy },
    { id: 'impact', label: t.common.impact },
    { id: 'gallery', label: language === 'FR' ? "Galerie" : "Gallery" },
    { id: 'board', label: t.common.board },
    { id: 'volunteer', label: t.common.volunteer }
  ];

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

      {/* Top Premium Brand Bar - Aligned to max-w-7xl like the rest of the site */}
      <div className="bg-gradient-to-r from-brand-navy via-brand-navy-muted to-[#104e35] border-b border-brand-gold/25 relative z-50 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-2 flex flex-col md:flex-row md:items-center justify-between text-white gap-2">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse"></span>
            <span className="font-bold tracking-wider font-sans text-white/90 uppercase text-[10px] sm:text-xs text-center md:text-left">
              {language === 'FR' ? "FONDATION DR FRANÇOIS KATEKESHA" : "DR FRANÇOIS KATEKESHA FOUNDATION"}
            </span>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-3 text-[10px] sm:text-xs">
            <div className="inline-flex items-center gap-2 bg-[#125838] px-3 py-1 rounded-md border border-brand-gold/30 shadow-inner text-white">
              <TypewriterSlogan />
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-brand-gold font-mono text-[9px] font-black uppercase tracking-widest pl-2 border-l border-white/10">
              <span>KANANGA • RDC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Header - Pure White Premium Background */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between">
          
          {/* Logo Brand Frame with actual Logo Image */}
          <div onClick={() => handleNavigate('home')} className="flex items-center gap-3 sm:gap-4 cursor-pointer group select-none shrink-0">
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl bg-white p-1 flex items-center justify-center relative shadow-md group-hover:scale-[1.05] transition-all duration-300 border border-slate-200/80 ring-1 ring-brand-gold/15 shrink-0">
              <img 
                src="https://i.postimg.cc/7YT6b2rB/Whats-App-Image-2026-05-24-at-13-17-26.jpg"
                alt="FDFK Logo"
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-black tracking-tight text-brand-navy text-lg sm:text-2xl block leading-none">
                FDFK
              </span>
              <span className="font-sans font-extrabold text-[7.5px] sm:text-[9.5px]/none tracking-widest text-brand-gold uppercase mt-1.5 block leading-none">
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
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle Widget */}
            <button
              id="lang-toggle-btn"
              onClick={toggleLanguage}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl border border-slate-200 hover:bg-slate-50 text-[10px] sm:text-xs font-black text-slate-700 hover:text-brand-gold transition-all font-mono tracking-wider cursor-pointer bg-slate-50/50 shadow-3xs"
            >
              <Globe className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-brand-gold" />
              <span>{language}</span>
            </button>

            {/* Volunteer Quick Link */}
            <button
              onClick={() => handleNavigate('volunteer')}
              className="hidden sm:inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-navy-light text-white rounded-xl px-4.5 py-2 text-xs font-black tracking-wider uppercase shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all cursor-pointer border border-brand-gold/20"
            >
              <Heart className="h-3.5 w-3.5 fill-current text-brand-gold animate-pulse" />
              <span>{language === 'FR' ? "S'engager (FDFK)" : "Join Us"}</span>
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
            onClick={() => handleNavigate('volunteer')}
            className="w-full text-center flex items-center justify-center gap-2 rounded-xl bg-brand-navy py-3 text-xs font-black uppercase tracking-widest text-white shadow-xs border border-brand-gold/20"
          >
            <Heart className="h-4 w-4 fill-current text-brand-gold" />
            <span>{language === 'FR' ? "S'engager (FDFK)" : "Join Us"}</span>
          </button>
        </div>
      )}

      {/* Main Content Space */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {activeTab === 'home' && <HomeOverview language={language} onNavigate={handleNavigate} />}
        {activeTab === 'legacy' && <LegacyPanel language={language} />}
        {activeTab === 'impact' && <ImpactDirectory language={language} />}
        {activeTab === 'gallery' && <GalleryView language={language} />}
        {activeTab === 'board' && <BoardOfDirectors language={language} />}
        {activeTab === 'volunteer' && <VolunteerPortal language={language} />}
      </main>

      {/* Sticky Quick-Access Contact Form Drawer for users to click in Kasaï */}
      <section className="bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 gap-10 md:grid-cols-12 text-slate-600">
          
          {/* Logo brand card */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-sans font-black tracking-tight text-brand-navy text-2xl">
                FDFK
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
              <a href="https://www.facebook.com/share/1cxfeZq7MP/" target="_blank" rel="noreferrer" title="Facebook - FDFK" className="h-9 w-9 rounded-xl bg-white hover:bg-[#1877F2]/10 text-slate-400 hover:text-[#1877F2] hover:border-[#1877F2]/40 flex items-center justify-center transition-all border border-slate-200/60 shadow-xs">
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a href="https://www.tiktok.com/@fondationdocteurfra?_r=1&_t=ZS-96dLdllomlp" target="_blank" rel="noreferrer" title="TikTok - FDFK" className="h-9 w-9 rounded-xl bg-white hover:bg-slate-900/10 text-slate-400 hover:text-black hover:border-black/40 flex items-center justify-center transition-all border border-slate-200/60 shadow-xs">
                <TiktokIcon className="h-4.5 w-4.5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram - FDFK" className="h-9 w-9 rounded-xl bg-white hover:bg-pink-50 text-slate-400 hover:text-pink-600 hover:border-pink-300 flex items-center justify-center transition-all border border-slate-200/60 shadow-xs">
                <Instagram className="h-4.5 w-4.5" />
              </a>
            </div>

            <p className="text-xs text-slate-400 font-sans leading-relaxed pt-2">
              {language === 'FR' 
                ? "Dossier d'agrément officiel enregistré auprès du secrétariat général de Kananga RDC. © 2026 FDFK." 
                : "Registered with municipal authorities of Kasaï-Central, Kananga DRC. © 2026 FDFK."}
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
