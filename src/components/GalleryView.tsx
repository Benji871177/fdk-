import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Expand, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Tag, 
  Layers, 
  Sparkles, 
  Info,
  Users,
  GraduationCap,
  HeartHandshake,
  Heart
} from 'lucide-react';

export interface GalleryItem {
  id: string;
  src: string;
  category: 'community' | 'women' | 'education' | 'social';
  title: Record<Language, string>;
  description: Record<Language, string>;
  date: string;
  location: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // =========================================================================
  // TAB: Engagement Communautaire (5 pictures sent by the user)
  // =========================================================================
  {
    id: 'comm1',
    src: 'https://i.postimg.cc/fyXPphgS/Whats-App-Image-2026-08-15-at-16-22-48-(1).jpg',
    category: 'community',
    title: {
      FR: "Engagement Communautaire - Cadre & Dialogue",
      EN: "Community Engagement - Environment & Dialogue"
    },
    description: {
      FR: "Mobilisation et échanges de proximité avec la jeunesse et les familles dans les quartiers de Kananga.",
      EN: "Grassroots mobilization and close exchanges with youth and families across Kananga districts."
    },
    date: "2026",
    location: "Kananga, RDC"
  },
  {
    id: 'comm2',
    src: 'https://i.postimg.cc/MpzLPN0y/Whats-App-Image-2026-08-15-at-16-22-48.jpg',
    category: 'community',
    title: {
      FR: "Engagement Communautaire - Espaces de Concertation",
      EN: "Community Engagement - Discussion Spaces"
    },
    description: {
      FR: "Rencontres de concertation citoyenne et identification des priorités de terrain avec les représentants locaux.",
      EN: "Citizen consultation meetings and identification of grassroots priorities with local representatives."
    },
    date: "2026",
    location: "Kananga, RDC"
  },
  {
    id: 'comm3',
    src: 'https://i.postimg.cc/5t0R1zR6/Whats-App-Image-2026-08-15-at-16-22-47-(1).jpg',
    category: 'community',
    title: {
      FR: "Engagement Communautaire - Dialogue & Solidarité",
      EN: "Community Engagement - Solidarity & Voice"
    },
    description: {
      FR: "Écoute active des mères et des foyers locaux pour bâtir des solutions collectives durables et solidaires.",
      EN: "Active listening with local mothers and families to build lasting, solidarity-based collective solutions."
    },
    date: "2026",
    location: "Kananga, RDC"
  },
  {
    id: 'comm4',
    src: 'https://i.postimg.cc/kGr1xpXJ/Whats-App-Image-2026-08-15-at-16-22-47.jpg',
    category: 'community',
    title: {
      FR: "Engagement Communautaire - Action Jeunesse",
      EN: "Community Engagement - Youth Action"
    },
    description: {
      FR: "Sensibilisation et présence active auprès des jeunes dans leur cadre de vie quotidien au Kasaï-Central.",
      EN: "Awareness raising and active presence with youth in their everyday environment in Kasai-Central."
    },
    date: "2026",
    location: "Kananga, RDC"
  },
  {
    id: 'comm5',
    src: 'https://i.postimg.cc/X7kHCxMf/Whats-App-Image-2026-08-15-at-16-22-17.jpg',
    category: 'community',
    title: {
      FR: "Engagement Communautaire - Espaces Publics & Citoyenneté",
      EN: "Community Engagement - Public Spaces & Citizenship"
    },
    description: {
      FR: "Concertations citoyennes et préservation du cadre de vie et du vivre-ensemble dans les zones d'intervention.",
      EN: "Citizen consultations and strengthening community cohesion and living conditions across target zones."
    },
    date: "2026",
    location: "Kananga, RDC"
  },

  // =========================================================================
  // TAB: Autonomisation Féminine (Women Empowerment)
  // =========================================================================
  {
    id: 'women1',
    src: 'https://i.postimg.cc/5yDk0GdG/Whats-App-Image-2026-05-24-at-14-14-59-(1).jpg',
    category: 'women',
    title: {
      FR: "Autonomisation Féminine & Échange Solidaire",
      EN: "Women Empowerment & Solidarity Exchange"
    },
    description: {
      FR: "Sessions d'accompagnement et d'échange solidaire avec les femmes de Kananga pour stimuler les coopératives locales.",
      EN: "Support and solidarity exchange sessions with Kananga women to stimulate local cooperatives."
    },
    date: "Mai 2026",
    location: "Kananga, RDC"
  },
  {
    id: 'women2',
    src: 'https://i.postimg.cc/mDznsRKp/Whats-App-Image-2026-05-24-at-14-15-00-(7).jpg',
    category: 'women',
    title: {
      FR: "Coopératives de Solidarité Féminine",
      EN: "Women's Solidarity Cooperatives"
    },
    description: {
      FR: "Rassemblement des femmes impliquées dans le programme d'épargne et d'entraide mutuelle de la FDFK au Kasaï-Central.",
      EN: "Gathering of women participating in FDFK's mutual savings and self-help programs in Kasai-Central."
    },
    date: "Mars 2026",
    location: "Kasaï-Central, RDC"
  },

  // =========================================================================
  // TAB: Éducation & Jeunesse (Education & Youth)
  // =========================================================================
  {
    id: 'edu1',
    src: 'https://i.postimg.cc/vHWpTYTz/Whats-App-Image-2026-05-24-at-14-15-00-(5).jpg',
    category: 'education',
    title: {
      FR: "Partenariat Éducatif & Scolarisation",
      EN: "Educational Partnership & Schooling"
    },
    description: {
      FR: "Sensibilisation communautaire et distribution de cahiers et de fournitures d'apprentissage pour la rentrée scolaire.",
      EN: "Community sensitization and distribution of notebooks and learning supplies ahead of the school term."
    },
    date: "Avril 2026",
    location: "Kananga, RDC"
  },
  {
    id: 'edu2',
    src: 'https://i.postimg.cc/GhJ5rXgK/Whats-App-Image-2026-05-24-at-14-15-00-(8).jpg',
    category: 'education',
    title: {
      FR: "Promotion de l'Excellence Scolaire",
      EN: "Promotion of Educational Excellence"
    },
    description: {
      FR: "Encouragements et récompenses symboliques octroyés aux élèves méritants pour susciter l'amour des études.",
      EN: "Encouragement and symbolic awards presented to high-achieving students to foster love of learning."
    },
    date: "Avril 2026",
    location: "Kananga, RDC"
  },

  // =========================================================================
  // TAB: Assistance Sociale (Social Support)
  // =========================================================================
  {
    id: 'soc1',
    src: 'https://i.postimg.cc/VNGywKv6/Whats-App-Image-2026-05-24-at-14-14-59.jpg',
    category: 'social',
    title: {
      FR: "Remise d'Équipements & Soutien Matériel",
      EN: "Distribution of Equipment & Material Support"
    },
    description: {
      FR: "Distribution d'outils et de matériel d'accompagnement socio-économique aux bénéficiaires de la Fondation.",
      EN: "Distribution of socioeconomic support tools and equipment to foundation beneficiaries."
    },
    date: "Mai 2026",
    location: "Kananga, RDC"
  },
  {
    id: 'soc2',
    src: 'https://i.postimg.cc/9ffSLypZ/Whats-App-Image-2026-05-24-at-14-15-00-(6).jpg',
    category: 'social',
    title: {
      FR: "Rencontres de Proximité & Solidarité",
      EN: "Community Meetings & Social Solidarity"
    },
    description: {
      FR: "Séance d'interaction directe avec les familles pour apporter assistance et écoute dans les quartiers vulnérables.",
      EN: "Direct interaction sessions with local families providing assistance and active listening in vulnerable neighborhoods."
    },
    date: "Mai 2026",
    location: "Kananga, RDC"
  },
  {
    id: 'soc3',
    src: 'https://i.postimg.cc/zGzPfT9V/Whats-App-Image-2026-05-24-at-14-15-01-(4).jpg',
    category: 'social',
    title: {
      FR: "Coordination & Actions Sociales FDFK",
      EN: "Coordination & FDFK Social Initiatives"
    },
    description: {
      FR: "Rencontres de coordination des équipes de terrain pour évaluer l'impact des aides sociales apportées aux ménages.",
      EN: "Coordination meetings with field teams to evaluate the impact of social aid delivered to households."
    },
    date: "Mars 2026",
    location: "Kananga, RDC"
  },
  {
    id: 'soc4',
    src: 'https://i.postimg.cc/YSJ3QFyd/Whats-App-Image-2026-05-24-at-14-15-01-(5).jpg',
    category: 'social',
    title: {
      FR: "Campagnes d'Aide & Inclusion Sociale",
      EN: "Assistance Campaigns & Social Inclusion"
    },
    description: {
      FR: "Actions directes auprès des ménages les plus précarisés, assurant la prise en charge des besoins prioritaires.",
      EN: "Direct outreach supporting vulnerable households, ensuring assistance for high-priority needs."
    },
    date: "Mai 2026",
    location: "Kananga, RDC"
  }
];

interface GalleryViewProps {
  language: Language;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'community' | 'women' | 'education' | 'social'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // State to track flip status of gallery items using their unique IDs
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  // Auto-flip staggered effect as items enter viewport
  useEffect(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const itemId = entry.target.getAttribute('data-item-id');
              const indexStr = entry.target.getAttribute('data-item-index');
              if (itemId && indexStr) {
                const idx = parseInt(indexStr, 10);
                setTimeout(() => {
                  setFlipped(prev => ({
                    ...prev,
                    [itemId]: true // Auto-flip to show picture
                  }));
                }, 200 + (idx % 4) * 120);
                
                observer.unobserve(entry.target);
              }
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      const elements = document.querySelectorAll('.gallery-flip-card-observed');
      elements.forEach((el) => observer.observe(el));

      return () => {
        elements.forEach((el) => observer.unobserve(el));
      };
    } else {
      GALLERY_ITEMS.forEach((item, index) => {
        setTimeout(() => {
          setFlipped(prev => ({
            ...prev,
            [item.id]: true
          }));
        }, 600 + index * 100);
      });
    }
  }, [selectedCategory]);

  const toggleFlip = (itemId: string) => {
    setFlipped(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Filter items according to category
  const filteredItems = selectedCategory === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  // Key handlers for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const getCategoryLabel = (cat: 'community' | 'women' | 'education' | 'social') => {
    switch (cat) {
      case 'community': return language === 'FR' ? "Engagement Communautaire" : "Community Engagement";
      case 'women': return language === 'FR' ? "Autonomisation Féminine" : "Women Empowerment";
      case 'education': return language === 'FR' ? "Éducation & Jeunesse" : "Education & Youth";
      case 'social': return language === 'FR' ? "Assistance Sociale" : "Social Support";
    }
  };

  const getCategoryCount = (cat: 'all' | 'community' | 'women' | 'education' | 'social') => {
    if (cat === 'all') return GALLERY_ITEMS.length;
    return GALLERY_ITEMS.filter(item => item.category === cat).length;
  };

  return (
    <div id="gallery-container" className="py-4 space-y-8 text-left">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy via-brand-navy-muted to-[#125838] px-6 py-10 sm:px-12 sm:py-14 text-center shadow-xl border border-brand-gold/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent opacity-80 pointer-events-none" />
        <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-brand-gold/5 blur-3xl" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-1.5 text-[10px] sm:text-xs font-black tracking-widest text-[#C5A25D] ring-1 ring-white/10 backdrop-blur-md uppercase">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-brand-gold" />
            <span>{language === 'FR' ? "NOTRE IMPACT EN IMAGES" : "OUR IMPACT IN IMAGES"}</span>
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            {language === 'FR' ? "Galerie Photographique FDFK" : "Official FDFK Photo Gallery"}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl mx-auto font-sans">
            {language === 'FR' 
              ? "Explorez nos photos classées par domaines d'intervention au Kasaï-Central."
              : "Explore our photographs categorized by areas of intervention across Kasai-Central."
            }
          </p>
        </div>
      </div>

      {/* Category Filter Tabs with Count Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 py-2 border-b border-slate-200/70 pb-4">
        {/* ALL TAB */}
        <button
          onClick={() => { setSelectedCategory('all'); setLightboxIndex(null); }}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-brand-navy text-white border-brand-navy shadow-md scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:text-brand-navy hover:bg-slate-50'
          }`}
        >
          <Layers className="h-4 w-4 text-brand-gold" />
          <span>{language === 'FR' ? "Toutes les photos" : "All Photos"}</span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
            selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
          }`}>
            {getCategoryCount('all')}
          </span>
        </button>

        {/* ENGAGEMENT COMMUNAUTAIRE (5 pictures on its own!) */}
        <button
          onClick={() => { setSelectedCategory('community'); setLightboxIndex(null); }}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
            selectedCategory === 'community'
              ? 'bg-emerald-700 text-white border-emerald-700 shadow-md scale-105'
              : 'bg-white border-emerald-300/80 text-emerald-900 hover:bg-emerald-50'
          }`}
        >
          <Users className={`h-4 w-4 ${selectedCategory === 'community' ? 'text-brand-gold' : 'text-emerald-600'}`} />
          <span>{getCategoryLabel('community')}</span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
            selectedCategory === 'community' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
          }`}>
            {getCategoryCount('community')}
          </span>
        </button>

        {/* AUTONOMISATION FÉMININE */}
        <button
          onClick={() => { setSelectedCategory('women'); setLightboxIndex(null); }}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
            selectedCategory === 'women'
              ? 'bg-brand-navy text-white border-brand-navy shadow-md scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:text-brand-navy hover:bg-slate-50'
          }`}
        >
          <Heart className="h-4 w-4 text-pink-500" />
          <span>{getCategoryLabel('women')}</span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
            selectedCategory === 'women' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
          }`}>
            {getCategoryCount('women')}
          </span>
        </button>

        {/* ÉDUCATION & JEUNESSE */}
        <button
          onClick={() => { setSelectedCategory('education'); setLightboxIndex(null); }}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
            selectedCategory === 'education'
              ? 'bg-brand-navy text-white border-brand-navy shadow-md scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:text-brand-navy hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="h-4 w-4 text-blue-500" />
          <span>{getCategoryLabel('education')}</span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
            selectedCategory === 'education' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
          }`}>
            {getCategoryCount('education')}
          </span>
        </button>

        {/* ASSISTANCE SOCIALE */}
        <button
          onClick={() => { setSelectedCategory('social'); setLightboxIndex(null); }}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
            selectedCategory === 'social'
              ? 'bg-brand-navy text-white border-brand-navy shadow-md scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:text-brand-navy hover:bg-slate-50'
          }`}
        >
          <HeartHandshake className="h-4 w-4 text-amber-500" />
          <span>{getCategoryLabel('social')}</span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
            selectedCategory === 'social' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
          }`}>
            {getCategoryCount('social')}
          </span>
        </button>
      </div>

      {/* Custom Styles for Gallery 3D Flip Animations */}
      <style>{`
        .gallery-flip-card-container {
          perspective: 1400px;
        }
        .gallery-flip-card-inner {
          transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }
        .gallery-flip-card-flipped {
          transform: rotateY(180deg);
        }
        .gallery-flip-card-front, .gallery-flip-card-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .gallery-flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* Category Subheading and Count */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pt-1">
        <div>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
            {selectedCategory === 'community' 
              ? (language === 'FR' ? "SECTION DÉDIÉE" : "DEDICATED SECTION")
              : (language === 'FR' ? "DOMAINE D'ACTION" : "AREA OF ACTION")}
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-black text-brand-navy tracking-tight mt-0.5">
            {selectedCategory === 'all'
              ? (language === 'FR' ? "Toutes les Photos Officielles (13)" : "All Official Photos (13)")
              : `${getCategoryLabel(selectedCategory)} (${filteredItems.length})`}
          </h2>
        </div>
        <p className="text-xs text-slate-500 font-mono">
          {language === 'FR' ? "Cliquez sur une photo pour retourner ou zoomer" : "Click card to flip or zoom"}
        </p>
      </div>

      {/* Main Grid of Flip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => {
            const isFlipped = flipped[item.id] || false;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => toggleFlip(item.id)}
                className="gallery-flip-card-container w-full h-[330px] cursor-pointer group select-none gallery-flip-card-observed"
                data-item-id={item.id}
                data-item-index={idx}
              >
                <div className={`gallery-flip-card-inner relative w-full h-full ${isFlipped ? 'gallery-flip-card-flipped' : ''}`}>
                  
                  {/* FRONT FACE: Descriptive Writeup */}
                  <div className="gallery-flip-card-front rounded-2xl bg-white border border-slate-200/85 hover:border-brand-gold/45 p-5 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#C5A25D_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
                    
                    <div className="flex justify-between items-start relative z-10 w-full">
                      <span className={`inline-flex items-center gap-1 text-[8px] font-extrabold tracking-widest px-2 py-1 rounded-md uppercase ${
                        item.category === 'community'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-[#125838]/8 text-[#125838]'
                      }`}>
                        <Tag className="h-2 w-2 text-brand-gold" />
                        <span>{getCategoryLabel(item.category)}</span>
                      </span>

                      <span className="text-[9px] text-slate-400 font-mono font-bold flex items-center gap-0.5">
                        <Calendar className="h-2.5 w-2.5 text-slate-400" />
                        {item.date}
                      </span>
                    </div>

                    <div className="space-y-2 py-4 relative z-10 flex-1 flex flex-col justify-center text-left">
                      <h3 className="font-display font-black text-brand-navy text-sm leading-snug tracking-tight">
                        {item.title[language]}
                      </h3>
                      <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed font-sans font-medium">
                        {item.description[language]}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between text-[8px] text-slate-500 relative z-10">
                      <span className="font-mono tracking-wider uppercase font-extrabold">
                        {language === 'FR' ? "CLIQUEZ POUR VOIR LA PHOTO" : "CLICK TO VIEW PHOTO"}
                      </span>
                      <span className="text-brand-gold bg-brand-gold/8 px-2 py-0.5 rounded-full border border-brand-gold/15 font-mono text-[8px] font-black uppercase animate-pulse">
                        FLIP
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE: Photo Card */}
                  <div className="gallery-flip-card-back rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md hover:shadow-lg flex flex-col justify-end">
                    <img 
                      src={item.src} 
                      alt={item.title[language]} 
                      className="absolute inset-0 w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent"></div>
                    
                    {/* Zoom control button */}
                    <div className="absolute top-3 right-3 z-20">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxIndex(idx);
                        }}
                        className="bg-slate-950/80 hover:bg-slate-950 text-white p-2 rounded-xl border border-brand-gold/35 backdrop-blur-md transition-all scale-90 hover:scale-100 flex items-center justify-center cursor-pointer"
                        title={language === 'FR' ? "Agrandir" : "Zoom"}
                      >
                        <Expand className="h-3 w-3 text-brand-gold" />
                      </button>
                    </div>

                    {/* Tag badge on top-left of photo */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded-md backdrop-blur-md border bg-slate-950/80 text-brand-gold border-brand-gold/30">
                        {getCategoryLabel(item.category)}
                      </span>
                    </div>

                    {/* Back details overlay */}
                    <div className="relative z-10 p-4 space-y-1 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pt-8 text-left">
                      <h4 className="font-display text-xs font-black text-white tracking-tight line-clamp-1">
                        {item.title[language]}
                      </h4>
                      <div className="flex items-center justify-between text-[8px] text-slate-400 font-mono pt-0.5">
                        <span>{item.date} • {item.location}</span>
                        <span className="text-brand-gold font-bold uppercase tracking-wider">{language === 'FR' ? "Détails" : "Details"}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="py-20 text-center space-y-4">
          <Info className="h-12 w-12 text-slate-300 mx-auto" />
          <h3 className="font-display font-bold text-lg text-slate-700">
            {language === 'FR' ? "Aucune photo dans cette catégorie" : "No photos in this category"}
          </h3>
          <button 
            onClick={() => setSelectedCategory('all')}
            className="text-xs font-bold text-brand-gold underline uppercase tracking-wider cursor-pointer"
          >
            {language === 'FR' ? "Afficher toutes les photos" : "Show all photos"}
          </button>
        </div>
      )}

      {/* Lightbox Modal overlay slider */}
      <AnimatePresence>
        {activeLightboxItem && lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 z-[1010]"
              aria-label="Close Lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-2 sm:left-4 h-12 w-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all cursor-pointer border border-white/5 z-50 hover:scale-105"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-2 sm:right-4 h-12 w-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all cursor-pointer border border-white/5 z-50 hover:scale-105"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Modal Card Content */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
            >
              {/* Left Side: Dynamic Image */}
              <div className="relative md:flex-1 bg-slate-900 flex items-center justify-center overflow-hidden min-h-[250px] sm:min-h-[400px]">
                <img 
                  src={activeLightboxItem.src} 
                  alt={activeLightboxItem.title[language]} 
                  className="w-full h-full object-contain max-h-[50vh] md:max-h-[80vh]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Meta details label on bottom overlay over the photo */}
                <div className="absolute top-4 left-4 bg-black/65 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full animate-pulse bg-emerald-400"></span>
                  <span className="text-[10px] sm:text-xs font-black font-sans uppercase text-[#FFFCEB] tracking-widest">
                    {getCategoryLabel(activeLightboxItem.category)}
                  </span>
                </div>
              </div>

              {/* Right Side: Informative Panel */}
              <div className="w-full md:w-[350px] p-6 sm:p-8 bg-slate-50 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-200 overflow-y-auto">
                <div className="space-y-6">
                  {/* Category header */}
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-extrabold tracking-widest bg-brand-navy text-white px-3 py-1.5 rounded-full uppercase self-start">
                    <Tag className="h-2.5 w-2.5 text-brand-gold" />
                    <span>{getCategoryLabel(activeLightboxItem.category)}</span>
                  </span>

                  {/* Title */}
                  <h2 className="font-display font-black text-xl sm:text-2xl text-brand-navy leading-tight">
                    {activeLightboxItem.title[language]}
                  </h2>

                  {/* Description Paragraph */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {activeLightboxItem.description[language]}
                  </p>
                </div>

                {/* Footer section inside details view */}
                <div className="pt-6 border-t border-slate-200/80 mt-6 space-y-4 text-xs font-mono">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-brand-gold" />
                      <span className="font-bold">{language === 'FR' ? "Date / Période :" : "Date / Period:"}</span>
                    </span>
                    <span className="font-bold text-slate-800">{activeLightboxItem.date}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-500">
                    <span className="flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5 text-brand-gold" />
                      <span className="font-bold">{language === 'FR' ? "Territoire :" : "Region:"}</span>
                    </span>
                    <span className="font-bold text-slate-800">{activeLightboxItem.location}</span>
                  </div>

                  {/* Aesthetic Heart indicator / support CTA */}
                  <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center gap-3.5 mt-2 shadow-xs">
                    <div className="h-8 w-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-500 shrink-0">
                      <Heart className="h-4.5 w-4.5 fill-pink-500" />
                    </div>
                    <div className="text-[10px] leading-tight text-slate-600">
                      <span className="font-sans font-bold text-brand-navy block">{language === 'FR' ? "Ensemble nous pouvons" : "Together we can"}</span>
                      <span className="font-sans text-xs text-slate-400">{language === 'FR' ? "Soutenir notre cause" : "Support our movement"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
