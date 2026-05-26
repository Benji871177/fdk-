import { ReactNode, useState } from 'react';
import { Language } from '../types';
import { Users, Camera, Mail, Shield, UserCheck, Award, Briefcase, Network, Radio, Maximize2, X } from 'lucide-react';

interface BoardOfDirectorsProps {
  language: Language;
}

export function BoardOfDirectors({ language }: BoardOfDirectorsProps) {
  const [activePhoto, setActivePhoto] = useState<{ name: string; url: string } | null>(null);

  interface Member {
    name: string;
    roleFr: string;
    roleEn: string;
    initials: string;
    icon: ReactNode;
    descFr: string;
    descEn: string;
    imageUrl?: string;
    imagePosition?: string;
  }

  const members: Member[] = [
    {
      name: "Mr Freddy Christian Katekesha",
      roleFr: "Fondateur & Président",
      roleEn: "Founder & President",
      initials: "FCK",
      icon: <Award className="h-5 w-5 text-brand-gold" />,
      descFr: "Préside le conseil d'administration et oriente les visions stratégiques à long terme de la fondation.",
      descEn: "Chairs the board of directors and guides the long-term strategic visions of the foundation.",
      imageUrl: "https://i.postimg.cc/MT80rS0L/Whats-App-Image-2026-05-25-at-11-09-52-(1).jpg",
      imagePosition: "object-[center_12%]"
    },
    {
      name: "Mr Serge Mputu Katekesha",
      roleFr: "VP & Secrétaire Général",
      roleEn: "VP & Secretary General",
      initials: "SMK",
      icon: <Shield className="h-5 w-5 text-brand-gold" />,
      descFr: "Supervise les relations institutionnelles, la conformité réglementaire et assure la coordination administrative centrale.",
      descEn: "Oversees institutional relations, regulatory compliance, and coordinates central administrative activities.",
      imageUrl: "https://i.postimg.cc/jjB3xmH5/Untitled-design-(27).png",
      imagePosition: "object-[center_15%]"
    },
    {
      name: "Mr Valery Kashama Katekesha",
      roleFr: "Directeur des Opérations",
      roleEn: "Operations Director",
      initials: "VKK",
      icon: <Briefcase className="h-5 w-5 text-brand-gold" />,
      descFr: "Coordonne le déploiement des projets de terrain, la distribution d'aide humanitaire et les programmes d'éducation populaire.",
      descEn: "Coordinates tactical field executions, humanitarian aid distribution, and civic community programs."
    },
    {
      name: "Md Esther Umba Kate",
      roleFr: "Chargée des Relations Extérieures & Actions Sociales",
      roleEn: "External Relations & Social Programs Manager",
      initials: "EUK",
      icon: <Network className="h-5 w-5 text-brand-gold" />,
      descFr: "Gère les partenariats stratégiques extérieurs ainsi que la planification et l'exécution des campagnes de solidarité sociale.",
      descEn: "Manages external strategic alliances alongside the planning and execution of social solidarity campaigns.",
      imageUrl: "https://i.postimg.cc/C1FYNR2v/Whats-App-Image-2026-05-24-at-15-06-52.jpg",
      imagePosition: "object-[center_17%]"
    },
    {
      name: "Mr Ghislain Kanku Katekesha",
      roleFr: "Facilitateur d’Affaires Internationales & Approvisionnements",
      roleEn: "International Business Facilitation & Supply Manager",
      initials: "GKK",
      icon: <UserCheck className="h-5 w-5 text-brand-gold" />,
      descFr: "Pilote les relations d'approvisionnement mondiales et facilite l'accès aux équipements et soutiens logistiques internationaux.",
      descEn: "Leads international supply-chain procurement and facilitates access to global logistics and academic resources.",
      imageUrl: "https://i.postimg.cc/wTtz08WH/Whats-App-Image-2026-05-24-at-15-07-43.jpg",
      imagePosition: "object-[center_10%]"
    },
    {
      name: "Md Noella Adassa Katekesha",
      roleFr: "Chargée des Médias & Visibilité",
      roleEn: "Media & Visibility Manager",
      initials: "NAK",
      icon: <Radio className="h-5 w-5 text-brand-gold" />,
      descFr: "Pilote la communication publique de la fondation, la production audiovisuelle et renforce la visibilité des initiatives.",
      descEn: "Directs public relations, multimedia production, and elevates the global awareness of community-focused activities."
    }
  ];

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

      {/* Grid containing beautifully designed cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {members.map((member, i) => {
          const role = language === 'FR' ? member.roleFr : member.roleEn;
          const desc = language === 'FR' ? member.descFr : member.descEn;

          return (
            <div 
              key={i} 
              id={`board-member-card-${i}`}
              className="group bg-white rounded-[24px] border border-slate-200/80 hover:border-brand-gold/45 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden text-left hover:-translate-y-1"
            >
              
              {/* Photo Frame Container - Upgraded to portrait aspect ratio (4/5) with optional zoom modal triggers */}
              <div 
                onClick={() => member.imageUrl && setActivePhoto({ name: member.name, url: member.imageUrl })}
                className={`relative aspect-[4/5] bg-gradient-to-b from-brand-navy to-slate-900 flex flex-col justify-center items-center overflow-hidden border-b border-slate-100 select-none ${member.imageUrl ? 'cursor-pointer' : ''}`}
              >
                
                {member.imageUrl ? (
                  <>
                    <img 
                      src={member.imageUrl}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className={`absolute inset-0 w-full h-full object-cover ${member.imagePosition || "object-center"} group-hover:scale-[1.04] transition-transform duration-500`}
                    />
                    
                    {/* Hover expand indicator badge overlay */}
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none">
                      <div className="bg-slate-950/80 text-white rounded-full p-2.5 border border-brand-gold/30 shadow-xl scale-75 group-hover:scale-100 transition-all duration-300 flex items-center justify-center gap-1.5 backdrop-blur-md">
                        <Maximize2 className="h-4 w-4 text-brand-gold" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider pr-1">
                          {language === "FR" ? "Agrandir" : "Zoom"}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Micro decorative abstract grid background to indicate technical structure */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    
                    {/* Dynamic pulsing ambient circle behind the monogram */}
                    <div className="absolute h-28 w-28 rounded-full bg-brand-gold/10 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                      <div className="h-20 w-20 rounded-full bg-brand-navy-light/60 flex items-center justify-center border border-white/5 shadow-2xl">
                        <span className="font-display text-2xl font-black text-brand-gold tracking-wider uppercase">
                          {member.initials}
                        </span>
                      </div>
                    </div>

                    {/* Corner Indicator - Soft Gold Premium Badge for "Photo Incoming" */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/70 border border-brand-gold/25 backdrop-blur-md">
                      <Camera className="h-3 w-3 text-brand-gold animate-pulse" />
                      <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">
                        {language === 'FR' ? "Photo à venir" : "Photo pending"}
                      </span>
                    </div>
                  </>
                )}

                {/* Highlight Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>

              {/* Body details text parameters */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  
                  {/* Icon badge paired with label */}
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-brand-navy/5 rounded-lg border border-brand-gold/10">
                      {member.icon}
                    </div>
                    <span className="text-[10px] font-mono font-black text-brand-navy uppercase tracking-widest leading-none">
                      {role}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-brand-navy tracking-tight group-hover:text-brand-gold transition-colors pt-1">
                    {member.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {desc}
                  </p>
                </div>

                {/* Secondary card foot with functional communication info */}
                <div className="border-t border-slate-100/80 pt-4 flex items-center justify-between">
                  <span className="text-[8px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                    FDFK COUNCIL EXECUTIVE
                  </span>
                  <a 
                    href="mailto:contact@fdkngo.org" 
                    className="p-1.5 rounded-lg hover:bg-brand-navy/5 text-slate-400 hover:text-brand-gold transition-colors"
                    title={language === 'FR' ? "Contacter Secrétariat" : "Contact Secretariat"}
                  >
                    <Mail className="h-4.5 w-4.5" />
                  </a>
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
