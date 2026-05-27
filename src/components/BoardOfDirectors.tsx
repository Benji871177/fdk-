import { ReactNode, useState, useEffect } from 'react';
import { Language } from '../types';
import { Users, Camera, Mail, Shield, UserCheck, Award, Briefcase, Network, Radio, Maximize2, X } from 'lucide-react';

interface BoardOfDirectorsProps {
  language: Language;
}

export function BoardOfDirectors({ language }: BoardOfDirectorsProps) {
  const [activePhoto, setActivePhoto] = useState<{ name: string; url: string } | null>(null);
  const [flipped, setFlipped] = useState<boolean[]>(new Array(6).fill(false));

  interface Member {
    name: string;
    roleFr: string;
    roleEn: string;
    initials: string;
    icon: ReactNode;
    imageUrl?: string;
    imagePosition?: string;
  }

  const members: Member[] = [
    {
      name: "Mr Freddy Christian Katekesha",
      roleFr: "Fondateur & Président",
      roleEn: "Founder & President",
      initials: "FCK",
      icon: <Award className="h-5 w-5 text-brand-gold" />
    },
    {
      name: "Mr Serge Mputu Katekesha",
      roleFr: "VP & Secrétaire Général",
      roleEn: "VP & Secretary General",
      initials: "SMK",
      icon: <Shield className="h-5 w-5 text-brand-gold" />
    },
    {
      name: "Mr Valery Kashama Katekesha",
      roleFr: "Directeur des Opérations",
      roleEn: "Operations Director",
      initials: "VKK",
      icon: <Briefcase className="h-5 w-5 text-brand-gold" />
    },
    {
      name: "Md Esther Umba Katekesha",
      roleFr: "Chargée des Relations Extérieures & Actions Sociales",
      roleEn: "External Relations & Social Programs Manager",
      initials: "EUK",
      icon: <Network className="h-5 w-5 text-brand-gold" />,
      imageUrl: "https://i.postimg.cc/C1FYNR2v/Whats-App-Image-2026-05-24-at-15-06-52.jpg",
      imagePosition: "object-[center_17%]"
    },
    {
      name: "Mr Ghislain Kanku Katekesha",
      roleFr: "Facilitateur d’Affaires Internationales & Approvisionnements",
      roleEn: "International Business Facilitation & Supply Manager",
      initials: "GKK",
      icon: <UserCheck className="h-5 w-5 text-brand-gold" />,
      imageUrl: "https://i.postimg.cc/wTtz08WH/Whats-App-Image-2026-05-24-at-15-07-43.jpg",
      imagePosition: "object-[center_10%]"
    },
    {
      name: "Md Noella Adassa Katekesha",
      roleFr: "Chargée des Médias & Visibilité",
      roleEn: "Media & Visibility Manager",
      initials: "NAK",
      icon: <Radio className="h-5 w-5 text-brand-gold" />
    }
  ];

  // Auto-flip staggered effect upon mount showing photo automatically after delay
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    members.forEach((_, index) => {
      const timer = setTimeout(() => {
        setFlipped(prev => {
          const next = [...prev];
          next[index] = true; // Flips to back (displays photo)
          return next;
        });
      }, 1600 + index * 250); // Stagger start time
      timers.push(timer);
    });
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const toggleFlip = (index: number) => {
    setFlipped(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <div className="space-y-16 animate-fade-in text-slate-800 font-sans" id="board-directors-view">
      
      {/* Header section with brand-navy & gold alignment schema */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy/5 px-4 py-1.5 text-3xs font-black text-brand-navy ring-1 ring-brand-gold/20 uppercase tracking-widest font-sans animate-fade-in">
          <Users className="h-3.5 w-3.5 text-brand-gold" />
          <span>FDFK GOVERNANCE</span>
        </span>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-gold tracking-tight">
          {language === 'FR' ? "Conseil d'Administration" : "Board of Directors"}
        </h1>
        <p className="text-slate-650 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          {language === 'FR'
            ? "Découvrez l'équipe dirigeante dévouée à l'accomplissement de notre vision commune. Une synergie d'expertises réunie pour le progrès humain du Kasaï-Central."
            : "Meet the leadership team dedicated to the expansion of our shared vision. A synergy of diverse expertises joined for the sustainable development of Kasaï-Central."}
        </p>
      </div>

      {/* Custom Styles for 3D Flip Animations */}
      <style>{`
        .flip-card-container {
          perspective: 1400px;
        }
        .flip-card-inner {
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }
        .flip-card-flipped {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* Grid containing beautifully designed 3D Flip cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {members.map((member, i) => {
          const role = language === 'FR' ? member.roleFr : member.roleEn;
          const isFlipped = flipped[i];

          return (
            <div 
              key={i} 
              id={`board-member-card-${i}`}
              onClick={() => toggleFlip(i)}
              className="flip-card-container w-full h-[470px] cursor-pointer group select-none"
            >
              <div className={`flip-card-inner relative w-full h-full ${isFlipped ? 'flip-card-flipped' : ''}`}>
                
                {/* FRONT FACE: Name and Position focus with luxurious watermark */}
                <div className="flip-card-front rounded-[24px] bg-white border border-slate-200/85 hover:border-brand-gold/50 p-7 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Luxury gold dotted grid background */}
                  <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#C5A25D_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
                  
                  {/* Decorative glowing background orb */}
                  <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-brand-gold/5 blur-2xl pointer-events-none"></div>
                  
                  {/* Top Header Row of Front Face */}
                  <div className="flex justify-between items-center relative z-10 w-full">
                    <span className="text-[9px] font-mono font-black tracking-widest text-[#D29A22] bg-[#D29A22]/8 px-3 py-1 rounded-md border border-[#D29A22]/15 uppercase">
                      {language === 'FR' ? "CONSEILLER DIRECTEUR" : "BOARD DIRECTOR"}
                    </span>
                    <div className="text-brand-navy bg-brand-navy/5 p-1.5 rounded-lg border border-brand-navy/10">
                      {member.icon}
                    </div>
                  </div>

                  {/* Mid Content focused entirely on Identity, beautifully centered */}
                  <div className="space-y-4.5 text-center py-6 relative z-10 my-auto">
                    <div className="h-16 w-16 rounded-full bg-brand-gold-light border border-brand-gold/25 mx-auto flex items-center justify-center shadow-inner">
                      <span className="font-display text-lg font-black text-[#D29A22] tracking-widest uppercase font-mono">
                        {member.initials}
                      </span>
                    </div>
                    
                    <div className="space-y-2.5">
                      <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-tight tracking-tight uppercase px-2">
                        {member.name}
                      </h3>
                      <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent mx-auto"></div>
                      <p className="font-sans text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-widest max-w-[280px] mx-auto leading-relaxed">
                        {role}
                      </p>
                    </div>
                  </div>

                  {/* Elegant bottom cue with micro animations */}
                  <div className="border-t border-slate-100 pt-4.5 flex items-center justify-between text-xs text-slate-500 relative z-10">
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                      {language === 'FR' ? "CLIQUEZ POUR VOIR LA PHOTO" : "CLICK TO VIEW PHOTO"}
                    </span>
                    <div className="flex items-center gap-1 text-brand-gold bg-brand-gold/8 px-2.5 py-0.5 rounded-full border border-brand-gold/20">
                      <span className="text-[9px] font-mono font-black uppercase tracking-wider animate-pulse">FLIP</span>
                    </div>
                  </div>
                </div>

                {/* BACK FACE: Portrait focus with elegant dynamic details overlay */}
                <div className="flip-card-back rounded-[24px] overflow-hidden bg-slate-950 border border-brand-gold/45 shadow-xl flex flex-col justify-end">
                  {member.imageUrl ? (
                    <>
                      <img 
                        src={member.imageUrl}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className={`absolute inset-0 w-full h-full object-cover ${member.imagePosition || "object-center"}`}
                      />
                      {/* Premium darkening dynamic layer */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent"></div>
                    </>
                  ) : (
                    <>
                      {/* Monogram backdrop when no photo is uploaded */}
                      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy to-slate-900 flex flex-col justify-center items-center">
                        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                        <div className="h-28 w-28 rounded-full bg-brand-gold/10 flex items-center justify-center">
                          <div className="h-20 w-20 rounded-full bg-brand-navy-light/60 flex items-center justify-center border border-white/5 shadow-2xl">
                            <span className="font-display text-2xl font-black text-brand-gold tracking-widest uppercase">
                              {member.initials}
                            </span>
                          </div>
                        </div>
                        <div className="absolute bottom-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/70 border border-brand-gold/25 backdrop-blur-md">
                          <Camera className="h-3 w-3 text-brand-gold animate-pulse" />
                          <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">
                            {language === 'FR' ? "Photo à venir" : "Photo pending"}
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Standard top zoom control badge */}
                  {member.imageUrl && (
                    <div className="absolute top-4 right-4 z-20">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePhoto({ name: member.name, url: member.imageUrl! });
                        }}
                        className="bg-slate-950/80 hover:bg-slate-950 text-white p-2.5 rounded-full border border-brand-gold/35 backdrop-blur-md transition-all scale-90 hover:scale-100 flex items-center justify-center"
                        title={language === 'FR' ? "Agrandir" : "Zoom"}
                      >
                        <Maximize2 className="h-3.5 w-3.5 text-brand-gold" />
                      </button>
                    </div>
                  )}

                  {/* Dynamic absolute details parameter at bottom of photo frame */}
                  <div className="relative z-10 p-5 space-y-2.5 text-left bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pt-12">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-brand-gold/20 rounded border border-brand-gold/30">
                        {member.icon}
                      </div>
                      <span className="text-[9px] font-mono font-black text-[#C5A25D] uppercase tracking-widest leading-none">
                        {role}
                      </span>
                    </div>
                    
                    <div className="flex items-end justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-display text-base font-black text-white tracking-tight leading-tight">
                          {member.name}
                        </h3>
                        <p className="text-[8px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                          {language === 'FR' ? "CONSEILLER DIRECTEUR" : "BOARD DIRECTOR"}
                        </p>
                      </div>

                      <a 
                        href="mailto:contact@fdkngo.org" 
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#C5A25D]/20 text-slate-300 hover:text-white transition-all border border-white/5 shrink-0"
                        title={language === 'FR' ? "Contacter Secrétariat" : "Contact Secretariat"}
                      >
                        <Mail className="h-4 w-4 text-brand-gold" />
                      </a>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Quote Block echoing governance values */}
      <div className="p-8 bg-brand-navy rounded-[32px] bg-gradient-to-br from-brand-navy via-slate-950 to-slate-900 border border-white/[0.04] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl mt-4 select-none relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="space-y-2 text-left relative z-10">
          <h4 className="text-brand-gold font-mono text-3xs font-black uppercase tracking-widest">
            {language === 'FR' ? "ÉTIQUE ET TRANSPARENCE" : "ETHICAL LEADERSHIP"}
          </h4>
          <p className="font-serif italic text-base leading-relaxed text-slate-200">
            {language === 'FR'
              ? '"Notre conseil garantit une gestion transparente, collégiale et rigoureuse des ressources confiées pour mériter la confiance de la population."'
              : '"Our board guarantees a transparent, collegiate, and rigorous management of entrusted resources to deserve the community\'s absolute trust."'}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-3 relative z-10">
          <div className="text-right">
            <span className="block text-[6px] font-mono text-slate-400 uppercase tracking-widest">{language === 'FR' ? "Auteur" : "Origin"}</span>
            <span className="block text-xs font-bold text-white font-display mt-0.5">{language === 'FR' ? "Secrétariat FDFK" : "FDFK Secretariat"}</span>
          </div>
          <div className="h-10 w-10 rounded-full bg-brand-gold/15 border border-brand-gold/25 flex items-center justify-center">
            <Users className="h-4.5 w-4.5 text-brand-gold" />
          </div>
        </div>
      </div>

      {/* Full-width premium Lightbox for high-resolution photo viewing */}
      {activePhoto && (
        <div 
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-slate-900 rounded-[28px] overflow-hidden border border-white/10 shadow-2xl flex flex-col"
          >
            {/* Close button */}
            <button 
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950/85 text-white border border-white/10 hover:text-brand-gold transition-colors focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Image container */}
            <div className="flex-1 overflow-hidden flex items-center justify-center p-4 bg-slate-950/40 min-h-[55vh]">
              <img 
                src={activePhoto.url} 
                alt={activePhoto.name}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-lg" 
              />
            </div>

            {/* Modal Footer with name and guidance */}
            <div className="p-6 bg-slate-900 border-t border-white/[0.06] flex items-center justify-between text-left">
              <div>
                <h4 className="text-white font-display font-bold text-base">{activePhoto.name}</h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  {language === 'FR' ? "Fondation Dr François Katekesha • Directoire FDFK" : "Dr François Katekesha Foundation • Board Management"}
                </p>
              </div>
              <button 
                onClick={() => setActivePhoto(null)}
                className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-[10px] font-black tracking-widest uppercase border border-white/10 transition-colors"
              >
                {language === 'FR' ? "Fermer" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
