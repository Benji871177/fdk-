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
  Eye,
  Heart,
  Sparkles,
  Info,
  Video,
  Upload,
  Settings,
  VolumeX,
  Volume2
} from 'lucide-react';

interface GalleryItem {
  id: string;
  src: string;
  category: 'women' | 'education' | 'social' | 'community';
  title: Record<Language, string>;
  description: Record<Language, string>;
  date: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'img1',
    src: 'https://i.postimg.cc/5yDk0GdG/Whats-App-Image-2026-05-24-at-14-14-59-(1).jpg',
    category: 'women',
    title: {
      FR: "Autonomisation & Échange Communautaire",
      EN: "Empowerment & Community Exchange"
    },
    description: {
      FR: "Sessions d'accompagnement et d'échange solidaire avec les femmes de Kananga pour stimuler les coopératives locales.",
      EN: "Support and solidarity exchange sessions with Kananga women to stimulate local cooperatives."
    },
    date: "Mai 2026"
  },
  {
    id: 'img2',
    src: 'https://i.postimg.cc/VNGywKv6/Whats-App-Image-2026-05-24-at-14-14-59.jpg',
    category: 'social',
    title: {
      FR: "Remise d'Équipements de Soutien",
      EN: "Distribution of Support Equipment"
    },
    description: {
      FR: "Distribution d'outils et de matériel d'accompagnement socio-économique aux bénéficiaires de la Fondation.",
      EN: "Distribution of socioeconomic support tools and equipment to foundation beneficiaries."
    },
    date: "Mai 2026"
  },
  {
    id: 'img3',
    src: 'https://i.postimg.cc/vHWpTYTz/Whats-App-Image-2026-05-24-at-14-15-00-(5).jpg',
    category: 'education',
    title: {
      FR: "Partenariat Éducatif & Scolarisation",
      EN: "Educational Partnership & Schooling"
    },
    description: {
      FR: "Sensibilisation communautaire et distribution de cahiers et d'autres fournitures d'apprentissage pour la rentrée des classes.",
      EN: "Community sensitization and distribution of notebooks and learning supplies ahead of the school term."
    },
    date: "Avril 2026"
  },
  {
    id: 'img4',
    src: 'https://i.postimg.cc/9ffSLypZ/Whats-App-Image-2026-05-24-at-14-15-00-(6).jpg',
    category: 'community',
    title: {
      FR: "Rencontre Citoyenne à Kananga",
      EN: "Citizenship Assembly in Kananga"
    },
    description: {
      FR: "Séance d'interaction directe avec les leaders locaux et les familles pour écouter leurs priorités concrètes.",
      EN: "Session of direct interaction with local leaders and families to address their concrete priorities."
    },
    date: "Mai 2026"
  },
  {
    id: 'img5',
    src: 'https://i.postimg.cc/mDznsRKp/Whats-App-Image-2026-05-24-at-14-15-00-(7).jpg',
    category: 'women',
    title: {
      FR: "Coopératives de Solidarité Féminine",
      EN: "Women's Solidarity Cooperatives"
    },
    description: {
      FR: "Rassemblement des femmes impliquées dans le programme d'épargne mutuelle de la FDFK au Kasaï-Central.",
      EN: "Gathering of women participating in FDFK's mutual savings plan programs in Kasai-Central."
    },
    date: "Mars 2026"
  },
  {
    id: 'img6',
    src: 'https://i.postimg.cc/GhJ5rXgK/Whats-App-Image-2026-05-24-at-14-15-00-(8).jpg',
    category: 'education',
    title: {
      FR: "Accompagnement et Promotion de l'Excellence",
      EN: "Promotion of Educational Excellence"
    },
    description: {
      FR: "Récompenses symboliques octroyées aux meilleurs écoliers pour susciter l'amour des études et de l'avancement scientifique.",
      EN: "Symbolic rewards given to top-scoring elementary students to foster academic and scientific passion."
    },
    date: "Avril 2026"
  },
  {
    id: 'img7',
    src: 'https://i.postimg.cc/zGzPfT9V/Whats-App-Image-2026-05-24-at-14-15-01-(4).jpg',
    category: 'community',
    title: {
      FR: "Rendez-vous Officiel de la Fondation",
      EN: "Official Gathering of the Foundation"
    },
    description: {
      FR: "Rencontres régulières pour dresser le bilan des réalisations et planifier les interventions futures.",
      EN: "Regular meetings assessing progress and milestones to plan upcoming local interventions."
    },
    date: "Mars 2026"
  },
  {
    id: 'img8',
    src: 'https://i.postimg.cc/YSJ3QFyd/Whats-App-Image-2026-05-24-at-14-15-01-(5).jpg',
    category: 'social',
    title: {
      FR: "Campagnes d'Aide & Inclusion Sociale",
      EN: "Campaigns for Aids & Social Inclusion"
    },
    description: {
      FR: "Actions directes auprès des ménages les plus précarisés, assurant la prise en charge de besoins cruciaux.",
      EN: "Direct operations supporting highly vulnerable households, ensuring assistance for critical needs."
    },
    date: "Mai 2026"
  }
];

interface GalleryViewProps {
  language: Language;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'women' | 'education' | 'social' | 'community'>('all');
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
                }, 300 + (idx % 4) * 150); // Stagger rotation
                
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
      // Fallback: immediate staggered flip
      GALLERY_ITEMS.forEach((item, index) => {
        setTimeout(() => {
          setFlipped(prev => ({
            ...prev,
            [item.id]: true
          }));
        }, 1000 + index * 150);
      });
    }
  }, [selectedCategory]);

  const toggleFlip = (itemId: string) => {
    setFlipped(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Filter items
  const filteredItems = selectedCategory === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  // Active item in lightbox
  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

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

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'women': return language === 'FR' ? "Autonomisation Féminine" : "Women Empowerment";
      case 'education': return language === 'FR' ? "Éducation & Jeunesse" : "Education & Youth";
      case 'social': return language === 'FR' ? "Assistance Sociale" : "Social Support";
      case 'community': return language === 'FR' ? "Engagement Communautaire" : "Community Engagement";
      default: return "";
    }
  };

  return (
    <div id="gallery-container" className="py-4 space-y-12">
      {/* Header Banner - Sleek Dark Emerald/Navy Premium Slate Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy via-brand-navy-muted to-[#125838] px-6 py-12 sm:px-12 sm:py-16 text-center shadow-xl border border-brand-gold/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent opacity-80 pointer-events-none" />
        <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-brand-gold/5 blur-3xl" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-1.5 text-[10px] sm:text-xs font-black tracking-widest text-[#C5A25D] ring-1 ring-white/10 backdrop-blur-md uppercase">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-brand-gold" />
            <span>{language === 'FR' ? "NOTRE IMPACT EN IMAGES" : "OUR IMPACT IN IMAGES"}</span>
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            {language === 'FR' ? "Galerie Officielle FDFK" : "Official FDFK Gallery"}
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto font-sans">
            {language === 'FR' 
              ? "Découvrez l'action concrète de la Fondation sur le terrain à Kananga, dans la province du Kasaï-Central, portée par la vision d'un avenir meilleur."
              : "Discover the concrete field action of the Foundation in Kananga, Kasai-Central province, driven by the vision of a brighter future."
            }
          </p>
        </div>
      </div>



      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2 border-b border-slate-200/60">
        <button
          onClick={() => { setSelectedCategory('all'); setLightboxIndex(null); }}
          className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-1.5 border ${
            selectedCategory === 'all'
              ? 'bg-brand-navy text-white border-brand-navy shadow-sm'
              : 'bg-white border-slate-200 text-slate-600 hover:text-brand-navy hover:bg-slate-50'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>{language === 'FR' ? "Toutes les images" : "All Images"}</span>
        </button>

        {(['women', 'education', 'social', 'community'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => { setSelectedCategory(cat); setLightboxIndex(null); }}
            className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-1.5 border ${
              selectedCategory === cat
                ? 'bg-brand-navy text-white border-brand-navy shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:text-brand-navy hover:bg-slate-50'
            }`}
          >
            <span>{getCategoryLabel(cat)}</span>
          </button>
        ))}
      </div>

      {/* Custom Styles for Gallery 3D Flip Animations */}
      <style>{`
        .gallery-flip-card-container {
          perspective: 1400px;
        }
        .gallery-flip-card-inner {
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
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

      {/* Visual Image Grid with scroll-adaptive 3D flip card dynamics */}
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
                transition={{ duration: 0.35 }}
                key={item.id}
                onClick={() => toggleFlip(item.id)}
                className="gallery-flip-card-container w-full h-[330px] cursor-pointer group select-none gallery-flip-card-observed"
                data-item-id={item.id}
                data-item-index={idx}
              >
                <div className={`gallery-flip-card-inner relative w-full h-full ${isFlipped ? 'gallery-flip-card-flipped' : ''}`}>
                  
                  {/* FRONT FACE: Writeup Focus Card (Pure elegant white/emerald detail aspect) */}
                  <div className="gallery-flip-card-front rounded-2xl bg-white border border-slate-200/85 hover:border-brand-gold/45 p-5 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#C5A25D_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
                    
                    <div className="flex justify-between items-start relative z-10 w-full">
                      <span className="inline-flex items-center gap-1 text-[8px] font-extrabold tracking-widest bg-[#125838]/8 text-[#125838] px-2 py-1 rounded-md uppercase">
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

                  {/* BACK FACE: Portrait Photo focus card */}
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
                          e.stopPropagation(); // Avoid turning card back on click zoom
                          setLightboxIndex(idx);
                        }}
                        className="bg-slate-950/80 hover:bg-slate-950 text-white p-2 rounded-xl border border-brand-gold/35 backdrop-blur-md transition-all scale-90 hover:scale-100 flex items-center justify-center cursor-pointer"
                        title={language === 'FR' ? "Agrandir" : "Zoom"}
                      >
                        <Expand className="h-3 w-3 text-brand-gold" />
                      </button>
                    </div>

                    {/* Back details list overlay block */}
                    <div className="relative z-10 p-4 space-y-1 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pt-8 text-left">
                      <span className="text-[8px] font-mono font-bold text-brand-gold uppercase tracking-widest block">
                        {getCategoryLabel(item.category)}
                      </span>
                      <h4 className="font-display text-xs font-black text-white tracking-tight line-clamp-1">
                        {item.title[language]}
                      </h4>
                      <div className="flex items-center justify-between text-[8px] text-slate-400 font-mono pt-0.5">
                        <span>{item.date} • Kananga</span>
                        <span className="text-slate-400 font-bold uppercase tracking-wider">{language === 'FR' ? "Détails" : "Details"}</span>
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
            {language === 'FR' ? "Aucun élément disponible" : "No items available"}
          </h3>
          <p className="text-sm text-slate-500">
            {language === 'FR' ? "Veuillez sélectionner un autre filtre d'impact." : "Please select another impact filter."}
          </p>
        </div>
      )}

      {/* Premium Lightbox Modal overlay slider */}
      <AnimatePresence>
        {activeItem && lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button on Top Right of Overlay */}
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 z-[1010]"
              aria-label="Close Lightbox"
            >
              <X className="h-5 sm:h-6 sm:w-6" />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-2 sm:left-4 h-12 w-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all cursor-pointer border border-white/5 z-50 hover:scale-105"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Main Lightbox Content frame */}
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
            >
              {/* Left Side: Dynamic Image */}
              <div className="relative md:flex-1 bg-slate-900 flex items-center justify-center overflow-hidden min-h-[250px] sm:min-h-[400px]">
                <img 
                  src={activeItem.src} 
                  alt={activeItem.title[language]} 
                  className="w-full h-full object-contain max-h-[50vh] md:max-h-[80vh]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Meta details label on bottom overlay over the photo */}
                <div className="absolute top-4 left-4 bg-black/65 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#D29A22] animate-pulse"></span>
                  <span className="text-[10px] sm:text-xs font-black font-sans uppercase text-[#FFFCEB] tracking-widest">
                    FDFK FIELDWORK
                  </span>
                </div>
              </div>

              {/* Right Side: Informative Panel */}
              <div className="w-full md:w-[350px] p-6 sm:p-8 bg-slate-50 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-200 overflow-y-auto">
                <div className="space-y-6">
                  {/* Category header */}
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-extrabold tracking-widest bg-brand-navy text-white px-3 py-1.5 rounded-full uppercase self-start">
                    <Tag className="h-2.5 w-2.5 text-brand-gold" />
                    <span>{getCategoryLabel(activeItem.category)}</span>
                  </span>

                  {/* Title */}
                  <h2 className="font-display font-black text-xl sm:text-2xl text-brand-navy leading-tight">
                    {activeItem.title[language]}
                  </h2>

                  {/* Description Paragraph */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {activeItem.description[language]}
                  </p>
                </div>

                {/* Footer section inside details view */}
                <div className="pt-6 border-t border-slate-200/80 mt-6 space-y-4 text-xs font-mono">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-brand-gold" />
                      <span className="font-bold">{language === 'FR' ? "Date d'activité :" : "Capture Date:"}</span>
                    </span>
                    <span className="font-bold text-slate-800">{activeItem.date}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-500">
                    <span className="flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5 text-brand-gold" />
                      <span className="font-bold">{language === 'FR' ? "Territoire :" : "Region:"}</span>
                    </span>
                    <span className="font-bold text-slate-800">Kananga, RDC</span>
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

            {/* Right Nav Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-2 sm:right-4 h-12 w-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all cursor-pointer border border-white/5 z-50 hover:scale-105"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
